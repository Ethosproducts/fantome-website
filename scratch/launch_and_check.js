import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\Users\\prave\\AppData\\Local\\Temp\\chrome-debug-profile-' + Math.random().toString(36).substring(2);

console.log(`Spawning Chrome with profile: ${userDataDir}`);
const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--disable-gpu',
  `--user-data-dir=${userDataDir}`,
  'about:blank'
]);

chrome.stdout.on('data', (data) => console.log(`[Chrome STDOUT]: ${data}`));
chrome.stderr.on('data', (data) => console.error(`[Chrome STDERR]: ${data}`));

chrome.on('error', (err) => {
  console.error("Failed to start Chrome:", err);
});

async function main() {
  // Wait 3 seconds for Chrome to start
  await new Promise(r => setTimeout(r, 3000));
  
  console.log("Fetching pages list...");
  let pages;
  try {
    const res = await fetch('http://127.0.0.1:9222/json/list');
    pages = await res.json();
  } catch (e) {
    console.error("Failed to fetch page list from Chrome. Chrome might not have started correctly.", e);
    chrome.kill();
    process.exit(1);
  }
  
  const page = pages.find(p => p.type === 'page');
  if (!page) {
    console.error("No active page found in Chrome!", pages);
    chrome.kill();
    process.exit(1);
  }
  
  const wsUrl = page.webSocketDebuggerUrl;
  console.log(`Connecting to CDP at: ${wsUrl}`);
  
  const ws = new WebSocket(wsUrl);
  
  ws.onopen = () => {
    console.log("Connected to CDP! Enabling Console, Runtime, and Page...");
    ws.send(JSON.stringify({ id: 1, method: "Runtime.enable" }));
    ws.send(JSON.stringify({ id: 2, method: "Console.enable" }));
    ws.send(JSON.stringify({ id: 3, method: "Page.enable" }));
    ws.send(JSON.stringify({ id: 5, method: "Network.enable" }));
    
    // Navigate to preview server
    console.log("Navigating to http://localhost:4173/...");
    ws.send(JSON.stringify({
      id: 4,
      method: "Page.navigate",
      params: { url: "http://localhost:4173/" }
    }));
  };
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    if (data.method === 'Runtime.exceptionThrown') {
      console.error("\n*** BROWSER EXCEPTION DETECTED ***");
      console.error(JSON.stringify(data.params.exceptionDetails, null, 2));
      console.error("*********************************\n");
    }
    
    if (data.method === 'Runtime.consoleAPICalled') {
      const msg = data.params.args.map(a => a.value || a.description || '').join(' ');
      console.log(`BROWSER CONSOLE [${data.params.type}]: ${msg}`);
    }

    if (data.method === 'Network.loadingFailed') {
      console.error(`NETWORK FAILED: ${data.params.requestId} - Error: ${data.params.errorText}`);
    }

    if (data.method === 'Network.responseReceived') {
      const resp = data.params.response;
      if (resp.status >= 400) {
        console.error(`HTTP ERROR ${resp.status}: ${resp.url}`);
      } else {
        console.log(`HTTP ${resp.status}: ${resp.url} (${resp.mimeType})`);
      }
    }
  };
  
  ws.onerror = (err) => {
    console.error("WebSocket error:", err);
  };
  
  // Wait 8 seconds to capture logs, then clean up
  setTimeout(() => {
    console.log("Done checking console. Closing connections and killing Chrome...");
    ws.close();
    chrome.kill();
    process.exit(0);
  }, 10000);
}

main().catch((err) => {
  console.error("Main error:", err);
  chrome.kill();
  process.exit(1);
});
