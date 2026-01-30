from PIL import Image
import os

def crop_image(input_path, output_path):
    print(f"Processing {input_path}...")
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        
        # Get the bounding box of the non-transparent content
        bbox = img.getbbox()
        
        if bbox:
            # Crop to the bounding box
            cropped_img = img.crop(bbox)
            cropped_img.save(output_path, "PNG")
            print(f"Success! Cropped to {bbox}. Saved to {output_path}")
        else:
            print("Error: Image appears to be fully transparent.")

    except Exception as e:
        print(f"Failed to process image: {e}")

if __name__ == "__main__":
    # We will process the original upload to ensure quality
    input_img = "assets/V.E.S Clear.png"
    output_img = "assets/VES_Logo_Cropped.png"
    
    if os.path.exists(input_img):
        crop_image(input_img, output_img)
    else:
        print(f"Input file not found: {input_img}")
