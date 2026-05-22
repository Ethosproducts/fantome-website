import json
import os
import sys

def main():
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except AttributeError:
        pass

    transcript_path = "C:/Users/prave/.gemini/antigravity/brain/54a3ace7-00b8-4622-ab3c-dafcc9e0d695/.system_generated/logs/transcript.jsonl"
    if not os.path.exists(transcript_path):
        print("Transcript not found")
        return
        
    with open(transcript_path, 'r', encoding='utf-8') as f:
        for line in f:
            data = json.loads(line)
            idx = data.get('step_index', 0)
            if idx < 300:
                content = data.get('content', '')
                found = '1779463379400' in content or ('tool_calls' in data and any('1779463379400' in str(tc) for tc in data['tool_calls']))
                if found:
                    print(f"--- STEP {idx} ({data.get('source')}) ---")
                    if content:
                        print(f"Content: {content[:800].encode('ascii', errors='replace').decode('ascii')}")
                    if data.get('tool_calls'):
                        for tc in data['tool_calls']:
                            print(f"Tool Call: {tc.get('name')} with args: {str(tc.get('args'))[:800].encode('ascii', errors='replace').decode('ascii')}")
                    print("-" * 40)
                
if __name__ == "__main__":
    main()
