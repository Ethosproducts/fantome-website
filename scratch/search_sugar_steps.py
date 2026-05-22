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
            # Look for step where the user query contains "sugar"
            if data.get("source") == "USER_EXPLICIT":
                content = data.get("content", "")
                if "sugar" in content.lower():
                    print(f"User Query (Step {data.get('step_index')}): {content}")
            
            # Let's also check for file creation or commands related to sugar free in model steps
            if data.get("source") == "MODEL":
                tool_calls = data.get("tool_calls", [])
                for tc in tool_calls:
                    args_str = str(tc.get("args", ""))
                    if "sugar" in args_str.lower():
                        print(f"Model Step {data.get('step_index')} called {tc.get('name')} with args containing 'sugar':")
                        print(f"  {args_str[:400]}")

if __name__ == "__main__":
    main()
