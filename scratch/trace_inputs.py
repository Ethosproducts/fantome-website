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
            if data.get('type') == 'USER_INPUT':
                print(f"Step {data.get('step_index')}: Source={data.get('source')}")
                content = data.get('content', '')
                print(f"  Content: {content.strip()}")
                
                # Check for attachments or screenshots in the metadata or raw fields
                # Let's print any other fields that are present
                for k, v in data.items():
                    if k not in ['type', 'source', 'step_index', 'status', 'content']:
                        print(f"  {k}: {v}")
                print("-" * 60)

if __name__ == "__main__":
    main()
