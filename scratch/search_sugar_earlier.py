import json
import os

def main():
    transcript_path = "C:/Users/prave/.gemini/antigravity/brain/2b36321b-11f4-4633-b325-a7f9bc07f059/.system_generated/logs/transcript.jsonl"
    if not os.path.exists(transcript_path):
        print("Transcript not found")
        return
        
    with open(transcript_path, 'r', encoding='utf-8') as f:
        for line in f:
            data = json.loads(line)
            idx = data.get("step_index")
            if 300 <= idx < 403:
                content = str(data)
                if "sugar" in content.lower() or "177943" in content or "1779428" in content:
                    print(f"Step {idx} ({data.get('source')} - {data.get('type')}):")
                    if data.get("content"):
                        print(f"  Content: {data.get('content')[:300]}")
                    if "tool_calls" in data:
                        print(f"  Tool calls: {data['tool_calls']}")
                    print("-" * 50)

if __name__ == "__main__":
    main()
