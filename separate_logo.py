from PIL import Image
import numpy as np

def crop_bottom_text(input_path, output_path):
    print(f"Processing {input_path}...")
    try:
        img = Image.open(input_path).convert("RGBA")
        
        # Convert to numpy array to analyze alpha channel
        arr = np.array(img)
        alpha = arr[:, :, 3]
        
        # Check for horizontal rows that contain non-transparent pixels
        # 0 means fully transparent, >0 means some content
        row_has_content = np.any(alpha > 0, axis=1)
        
        # Find the last block of content
        # We assume the layout is: Top Content (Icon) -> Gap -> Bottom Content (Text)
        # We want to keep only the Top Content
        
        # Find indices where rows have content
        content_rows = np.where(row_has_content)[0]
        
        if len(content_rows) == 0:
            print("Error: Image is empty.")
            return

        # Look for a significant gap starting from the bottom up
        # This is a simple heuristic: the text is at the bottom. 
        # So we look for the largest gap in the bottom half or just separate components.
        
        # Let's try to detect the gap between the main body and the text line.
        # We iterate through the content_rows to find a break
        
        gap_threshold = 5 # Minimum pixels to consider a gap
        last_row = content_rows[0]
        split_point = -1
        
        # We actually experienced a single block in the previous crop (23, 249, 1262, 762).
        # Let's look for a gap of empty rows.
        
        gaps = []
        for i in range(1, len(content_rows)):
            if content_rows[i] > content_rows[i-1] + gap_threshold:
                # Found a gap
                gap_start = content_rows[i-1]
                gap_end = content_rows[i]
                gaps.append((gap_start, gap_end))
                print(f"Found gap between row {gap_start} and {gap_end}")

        if gaps:
            # The last significant gap is likely separating the text from the icon
            # or the text is the last block.
            # If we assume the text is the bottom-most element separated by a gap:
            split_row = gaps[-1][0] + 1 # Crop just after the icon ends (before the gap starts)
            
            # Additional safety: ensure we aren't cropping off a tiny piece. 
            # The text is usually smaller than the icon.
            
            print(f"Cropping at row {split_row}")
            
            # Crop the image: (left, top, right, bottom)
            # We keep the original width, just change height
            width, height = img.size
            cropped_img = img.crop((0, 0, width, split_row))
            
            # Re-crop bounding box to trim any bottom whitespace we just made
            bbox = cropped_img.getbbox()
            if bbox:
                cropped_img = cropped_img.crop(bbox)
            
            cropped_img.save(output_path, "PNG")
            print(f"Success! Saved icon-only logo to {output_path}")
            
        else:
            print("No clear gap found between elements. The text might be too close to the icon.")
            # Fallback: If no gap, maybe just crop the bottom 25%? No, that's risky.
            # Let's inspect the height.
            print(f"Image height: {img.height}")

    except Exception as e:
        print(f"Failed to process image: {e}")

if __name__ == "__main__":
    input_img = "assets/VES_Logo_Cropped.png"
    output_img = "assets/VES_Logo_Icon_Only.png"
    crop_bottom_text(input_img, output_img)
