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
            content = str(data)
            if "sugarfree_center.png" in content:
                print(f"Step {data.get('step_index')} mentions sugarfree_center.png:")
                if data.get("content"):
                    print(f"  Content: {data.get('content')[:500]}")
                print("-" * 50)

if __name__ == "__main__":
    main()
