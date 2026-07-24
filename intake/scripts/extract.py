import sys
import os

try:
    import fitz  # PyMuPDF
except ImportError:
    fitz = None

def extract_pdf(pdf_path):
    if not os.path.exists(pdf_path):
        print(f"Error: File {pdf_path} not found")
        sys.exit(1)
        
    if fitz is None:
        print("Error: PyMuPDF (fitz) module not installed")
        sys.exit(1)

    doc = fitz.open(pdf_path)
    text_content = []
    
    asset_dir = r"D:\AryokPunya\Magang\sitegen\assets"
    os.makedirs(asset_dir, exist_ok=True)
    
    img_count = 0
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        text_content.append(page.get_text())
        
        # Extract images
        image_list = page.get_images(full=True)
        for img_index, img in enumerate(image_list):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            img_count += 1
            image_filename = os.path.join(asset_dir, f"extracted_img_{page_num}_{img_count}.{image_ext}")
            with open(image_filename, "wb") as image_file:
                image_file.write(image_bytes)
                
    print("=== EXTRACTED TEXT ===")
    print("\n".join(text_content))
    print("=== ASSETS SAVED ===")
    print(f"Saved {img_count} images to {asset_dir}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract.py <pdf_path>")
        sys.exit(1)
    extract_pdf(sys.argv[1])
