import os
import sys
import time
import json
import subprocess
import urllib.request
import base64
from websocket import create_connection

def take_screenshot(url, output_path):
    chrome_path = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    user_data_dir = os.path.join(os.environ['TEMP'], "chrome_dev_profile_3d")
    
    print(f"Starting Chrome... URL: {url}", flush=True)
    chrome_proc = subprocess.Popen([
        chrome_path,
        "--headless=new",
        "--remote-debugging-port=9222",
        "--remote-allow-origins=*",
        "--disable-gpu",
        "--no-sandbox",
        f"--user-data-dir={user_data_dir}",
        "--window-size=800,800"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    time.sleep(2)
    
    ws = None
    try:
        req = urllib.request.Request("http://localhost:9222/json/list")
        with urllib.request.urlopen(req) as response:
            targets = json.loads(response.read().decode())
        
        if not targets:
            raise Exception("No targets found in Chrome DevTools Protocol")
            
        target = targets[0]
        ws_url = target['webSocketDebuggerUrl']
        print(f"Connecting to: {ws_url}", flush=True)
        
        ws = create_connection(ws_url, timeout=10.0)
        
        # Navigate to the page
        print(f"Navigating to {url}", flush=True)
        ws.send(json.dumps({
            "id": 1,
            "method": "Page.navigate",
            "params": {"url": url}
        }))
        
        # Wait for navigate response (id=1)
        navigated = False
        start_time = time.time()
        while time.time() - start_time < 5.0:
            msg = json.loads(ws.recv())
            if msg.get('id') == 1:
                navigated = True
                print("Navigation started successfully", flush=True)
                break
        
        if not navigated:
            print("Warning: Navigation response (id=1) not received in 5s, proceeding anyway...", flush=True)
            
        # Wait 4 seconds for React / WebGL / Three.js loading & rendering
        print("Waiting 4 seconds for canvas render...", flush=True)
        time.sleep(4)
        
        # Capture screenshot
        print("Sending Page.captureScreenshot command...", flush=True)
        ws.send(json.dumps({
            "id": 2,
            "method": "Page.captureScreenshot",
            "params": {"format": "png"}
        }))
        
        # Wait for screenshot response (id=2)
        screenshot_saved = False
        start_time = time.time()
        while time.time() - start_time < 10.0:
            msg = json.loads(ws.recv())
            if msg.get('id') == 2:
                if 'error' in msg:
                    raise Exception(f"CDP captureScreenshot error: {msg['error']}")
                
                img_data_base64 = msg['result']['data']
                img_data = base64.b64decode(img_data_base64)
                with open(output_path, "wb") as f:
                    f.write(img_data)
                print(f"Screenshot successfully saved to {output_path}", flush=True)
                screenshot_saved = True
                break
                
        if not screenshot_saved:
            raise Exception("Screenshot response (id=2) not received within 10 seconds")
            
    except Exception as e:
        print(f"ERROR: {e}", file=sys.stderr, flush=True)
    finally:
        if ws:
            try:
                ws.close()
            except Exception:
                pass
        print("Stopping Chrome...", flush=True)
        chrome_proc.terminate()
        try:
            chrome_proc.wait(timeout=3)
        except subprocess.TimeoutExpired:
            chrome_proc.kill()

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python capture_3d_can.py <url> <output_path>")
        sys.exit(1)
    take_screenshot(sys.argv[1], sys.argv[2])
