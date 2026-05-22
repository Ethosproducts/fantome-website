import json
import os

def main():
    transcript_path = "C:/Users/prave/.gemini/antigravity/brain/54a3ace7-00b8-4622-ab3c-dafcc9e0d695/.system_generated/logs/transcript.jsonl"
    if not os.path.exists(transcript_path):
        print("Transcript not found")
        return
        
    with open(transcript_path, 'r', encoding='utf-8') as f:
        for line in f:
            data = json.loads(line)
            if data.get('source') == 'USER_EXPLICIT' or data.get('type') == 'USER_INPUT':
                print(f"Step {data.get('step_index')}:")
                print(f"  Content: {data.get('content')}")
                if 'tool_calls' in data:
                    print(f"  Tool Calls: {data['tool_calls']}")
                print("-" * 80)

if __name__ == "__main__":
    main()
