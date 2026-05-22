import os
import sys
import time
import json
import subprocess
import urllib.request
import base64
from websocket import create_connection

def take_screenshot_at_angle(flavor, angle_deg, output_path):
    chrome_path = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    user_data_dir = os.path.join(os.environ['TEMP'], f"chrome_dev_profile_{flavor}_{angle_deg}")
    
    angle_rad = angle_deg * 3.141592653589793 / 180.0
    url = f"http://localhost:5173/?flavor={flavor}&angle={angle_rad:.4f}"
    
    print(f"Capturing {flavor} at {angle_deg} degrees...", flush=True)
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
    
    time.sleep(1.5)
    
    ws = None
    try:
        req = urllib.request.Request("http://localhost:9222/json/list")
        with urllib.request.urlopen(req) as response:
            targets = json.loads(response.read().decode())
        
        if not targets:
            return
            
        target = targets[0]
        ws_url = target['webSocketDebuggerUrl']
        
        ws = create_connection(ws_url, timeout=5.0)
        ws.send(json.dumps({
            "id": 1,
            "method": "Page.navigate",
            "params": {"url": url}
        }))
        
        # Wait for navigate response
        for _ in range(5):
            msg = json.loads(ws.recv())
            if msg.get('id') == 1:
                break
                
        time.sleep(2.0)  # Wait for rendering
        
        ws.send(json.dumps({
            "id": 2,
            "method": "Page.captureScreenshot",
            "params": {"format": "png"}
        }))
        
        # Wait for screenshot response
        while True:
            msg = json.loads(ws.recv())
            if msg.get('id') == 2:
                img_data = base64.b64decode(msg['result']['data'])
                with open(output_path, "wb") as f:
                    f.write(img_data)
                break
    except Exception as e:
        print(f"Error for {angle_deg} deg: {e}", file=sys.stderr, flush=True)
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
    out_dir = "c:\\Users\\prave\\Desktop\\fantome"
    
    # Sweep 0 to 315 in steps of 45
    angles = [0, 45, 90, 135, 180, 225, 270, 315]
    
    print("STARTING ORIGINAL FLAVOR SWEEP...", flush=True)
    for angle in angles:
        out_path = os.path.join(out_dir, f"scan_Original_{angle}.png")
        take_screenshot_at_angle("Original", angle, out_path)
        
    print("STARTING SUGAR FREE FLAVOR SWEEP...", flush=True)
    for angle in angles:
        out_path = os.path.join(out_dir, f"scan_Sugar_Free_{angle}.png")
        take_screenshot_at_angle("Sugar Free", angle, out_path)
        
    print("SWEEP COMPLETE!", flush=True)
