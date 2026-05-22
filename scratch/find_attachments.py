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
            # Find steps that are USER_INPUT
            if data.get('type') == 'USER_INPUT':
                print(f"Step {data.get('step_index')}:")
                # Look for attachments or links in the input data
                # Let's inspect the keys of data
                for key, val in data.items():
                    if key not in ['content', 'type', 'source', 'step_index', 'status']:
                        print(f"  {key}: {str(val)[:200]}")
                # Check for image files in the content
                content = data.get('content', '')
                if 'media__' in content:
                    print("  Found media reference in content!")
                print("-" * 80)

if __name__ == "__main__":
    main()
