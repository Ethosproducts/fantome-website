async function run() {
  console.log("Fetching Chrome pages list...");
  const res = await fetch('http://127.0.0.1:9222/json/list');
  const pages = await res.json();
  const page = pages.find(p => p.type === 'page');
  if (!page) {
    console.error("No active page found in Chrome!");
    return;
  }
  const wsUrl = page.webSocketDebuggerUrl;
  console.log(`Connecting to CDP at: ${wsUrl}`);
  
  const ws = new WebSocket(wsUrl);
  
  ws.onopen = () => {
    console.log("Connected to CDP!");
    // Enable Runtime and Console domains
    ws.send(JSON.stringify({ id: 1, method: "Runtime.enable" }));
    ws.send(JSON.stringify({ id: 2, method: "Console.enable" }));
    ws.send(JSON.stringify({ id: 3, method: "Page.enable" }));
    // Navigate to local dev server
    ws.send(JSON.stringify({
      id: 4,
      method: "Page.navigate",
      params: { url: "http://localhost:5173/" }
    }));
  };
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    if (data.method === 'Runtime.exceptionThrown') {
      console.error("EXCEPTION DETECTED:", JSON.stringify(data.params.exceptionDetails, null, 2));
    }
    
    if (data.method === 'Console.messageAdded') {
      const msg = data.params.message;
      console.log(`BROWSER CONSOLE [${msg.level}]: ${msg.text}`);
    }
  };
  
  ws.onerror = (err) => {
    console.error("WebSocket error:", err);
  };
  
  // Keep script running for 8 seconds, then close
  setTimeout(() => {
    console.log("Done checking console. Closing WebSocket.");
    ws.close();
    process.exit(0);
  }, 8000);
}

run().catch(console.error);
