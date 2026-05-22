import urllib.request, json
req = urllib.request.Request('https://api.github.com/repos/Ethosproducts/fantome-website/actions/runs')
try:
    response = urllib.request.urlopen(req)
    data = json.loads(response.read().decode('utf-8'))
    print(f'Latest run status: {data["workflow_runs"][0]["conclusion"]} ({data["workflow_runs"][0]["status"]})')
except Exception as e:
    print(f"Error: {e}")
