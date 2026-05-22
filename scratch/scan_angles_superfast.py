import os
import sys
import time
import json
import subprocess
import urllib.request
import base64
from websocket import create_connection

def run_superfast_sweep():
    chrome_path = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    user_data_dir = os.path.join(os.environ['TEMP'], "chrome_dev_profile_superfast")
    out_dir = "c:\\Users\\prave\\Desktop\\fantome"
    
    print("Launching Chrome...", flush=True)
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
    
    time.sleep(2.0)
    
    ws = None
    try:
        req = urllib.request.Request("http://localhost:9222/json/list")
        with urllib.request.urlopen(req) as response:
            targets = json.loads(response.read().decode())
        
        if not targets:
            print("No Chrome targets found!", file=sys.stderr, flush=True)
            return
            
        target = targets[0]
        ws_url = target['webSocketDebuggerUrl']
        
        ws = create_connection(ws_url, timeout=10.0)
        
        # Original fine angles
        orig_angles = [45, 50, 55, 60, 65, 70, 75, 80]
        # Sugar Free fine angles
        sf_angles = [180, 195, 210, 225, 240, 255, 270]
        
        print("Starting Original sweep...", flush=True)
        for angle in orig_angles:
            angle_rad = angle * 3.141592653589793 / 180.0
            url = f"http://localhost:5173/?flavor=Original&angle={angle_rad:.4f}"
            out_path = os.path.join(out_dir, f"fine_Original_{angle}.png")
            
            print(f"Navigating to {url}...", flush=True)
            ws.send(json.dumps({
                "id": angle + 1000,
                "method": "Page.navigate",
                "params": {"url": url}
            }))
            
            # Wait for response
            while True:
                msg = json.loads(ws.recv())
                if msg.get('id') == angle + 1000:
                    break
            
            time.sleep(1.0)  # Wait for render
            
            print(f"Capturing screenshot for Original at {angle}...", flush=True)
            ws.send(json.dumps({
                "id": angle + 2000,
                "method": "Page.captureScreenshot",
                "params": {"format": "png"}
            }))
            
            while True:
                msg = json.loads(ws.recv())
                if msg.get('id') == angle + 2000:
                    img_data = base64.b64decode(msg['result']['data'])
                    with open(out_path, "wb") as f:
                        f.write(img_data)
                    break
                    
        print("Starting Sugar Free sweep...", flush=True)
        for angle in sf_angles:
            angle_rad = angle * 3.141592653589793 / 180.0
            url = f"http://localhost:5173/?flavor=Sugar Free&angle={angle_rad:.4f}"
            out_path = os.path.join(out_dir, f"fine_Sugar_Free_{angle}.png")
            
            print(f"Navigating to {url}...", flush=True)
            ws.send(json.dumps({
                "id": angle + 3000,
                "method": "Page.navigate",
                "params": {"url": url}
            }))
            
            # Wait for response
            while True:
                msg = json.loads(ws.recv())
                if msg.get('id') == angle + 3000:
                    break
            
            time.sleep(1.0)  # Wait for render
            
            print(f"Capturing screenshot for Sugar Free at {angle}...", flush=True)
            ws.send(json.dumps({
                "id": angle + 4000,
                "method": "Page.captureScreenshot",
                "params": {"format": "png"}
            }))
            
            while True:
                msg = json.loads(ws.recv())
                if msg.get('id') == angle + 4000:
                    img_data = base64.b64decode(msg['result']['data'])
                    with open(out_path, "wb") as f:
                        f.write(img_data)
                    break
                    
        print("SWEEP COMPLETE!", flush=True)
        
    except Exception as e:
        print(f"Error during sweep: {e}", file=sys.stderr, flush=True)
    finally:
        if ws:
            try:
                ws.close()
            except Exception:
                pass
        chrome_proc.terminate()
        try:
            chrome_proc.wait(timeout=2)
        except subprocess.TimeoutExpired:
            chrome_proc.kill()

if __name__ == "__main__":
    run_superfast_sweep()
