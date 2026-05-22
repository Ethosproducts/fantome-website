import os
import sys
import time
import json
import subprocess
import urllib.request
import base64
from websocket import create_connection

def capture_sections(url, output_dir):
    chrome_path = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    user_data_dir = os.path.join(os.environ['TEMP'], "chrome_dev_profile_scroll")
    
    print(f"Starting Chrome... URL: {url}", flush=True)
    chrome_proc = subprocess.Popen([
        chrome_path,
        "--headless=new",
        "--remote-debugging-port=9222",
        "--remote-allow-origins=*",
        "--disable-gpu",
        "--no-sandbox",
        f"--user-data-dir={user_data_dir}",
        "--window-size=1280,850"
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
        
        ws = create_connection(ws_url, timeout=15.0)
        
        # Navigate to the page
        print(f"Navigating to {url}", flush=True)
        ws.send(json.dumps({
            "id": 1,
            "method": "Page.navigate",
            "params": {"url": url}
        }))
        
        # Wait for navigation
        navigated = False
        start_time = time.time()
        while time.time() - start_time < 5.0:
            msg = json.loads(ws.recv())
            if msg.get('id') == 1:
                navigated = True
                print("Navigation started successfully", flush=True)
                break
        
        print("Waiting 4 seconds for initial render...", flush=True)
        time.sleep(4)
        
        # Scroll positions to capture
        scroll_offsets = [
            ("hero", 0),
            ("story_flavors", 900),
            ("shop", 1950),
            ("campaigns_footer", 3100)
        ]
        
        os.makedirs(output_dir, exist_ok=True)
        
        for name, offset in scroll_offsets:
            print(f"Scrolling to y={offset} for section '{name}'...", flush=True)
            # Evaluate scrollTo in browser
            ws.send(json.dumps({
                "id": 100 + offset,
                "method": "Runtime.evaluate",
                "params": {"expression": f"window.scrollTo(0, {offset});"}
            }))
            
            # Wait for scroll to register and dynamic effects to settle
            time.sleep(1.5)
            
            # Capture screenshot
            print(f"Capturing screenshot for '{name}'...", flush=True)
            ws.send(json.dumps({
                "id": 200 + offset,
                "method": "Page.captureScreenshot",
                "params": {"format": "png"}
            }))
            
            # Read response
            screenshot_saved = False
            start_time = time.time()
            while time.time() - start_time < 10.0:
                msg = json.loads(ws.recv())
                if msg.get('id') == 200 + offset:
                    if 'error' in msg:
                        raise Exception(f"CDP captureScreenshot error: {msg['error']}")
                    
                    img_data_base64 = msg['result']['data']
                    img_data = base64.b64decode(img_data_base64)
                    output_path = os.path.join(output_dir, f"section_{name}.png")
                    with open(output_path, "wb") as f:
                        f.write(img_data)
                    print(f"Saved section to {output_path}", flush=True)
                    screenshot_saved = True
                    break
            
            if not screenshot_saved:
                raise Exception(f"Failed to capture screenshot for '{name}'")
                
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
        print("Usage: python capture_sections.py <url> <output_dir>")
        sys.exit(1)
    capture_sections(sys.argv[1], sys.argv[2])
