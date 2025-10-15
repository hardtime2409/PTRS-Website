import os
from bs4 import BeautifulSoup
from clean_html_format import clean_html_format  # ⬅ import function

SRC_DIR = "src"
ASSETS_DIR = os.path.join(SRC_DIR, "assets")

os.makedirs(ASSETS_DIR, exist_ok=True)

def extract_svgs_from_html(html_path):
    with open(html_path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    modified = False

    # tìm tất cả các div có thuộc tính data-svg
    for div in soup.find_all("div", attrs={"data-svg": True}):
        svg_tag = div.find("svg")
        if not svg_tag:
            continue

        svg_name = div["data-svg"].strip()
        svg_filename = f"{svg_name}.svg"
        svg_path = os.path.join(ASSETS_DIR, svg_filename)

        # nếu file svg chưa tồn tại thì lưu lại
        if not os.path.exists(svg_path):
            with open(svg_path, "w", encoding="utf-8") as svg_file:
                svg_file.write(str(svg_tag))
            print(f"✅ Saved: {svg_filename}")
        else:
            print(f"⚠️  Skipped existing: {svg_filename}")

        # xóa svg trong file html
        svg_tag.decompose()
        modified = True

    # nếu file có thay đổi, ghi lại
    if modified:
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(str(soup))
        print(f"💾 Updated: {os.path.basename(html_path)}")

        # 🧹 Gọi hàm clean_html_format sau khi update
        clean_html_format(html_path)
    else:
        print(f"— No SVG found in: {os.path.basename(html_path)}")

def main():
    for root, _, files in os.walk(SRC_DIR):
        for file in files:
            if file.endswith(".html"):
                html_path = os.path.join(root, file)
                extract_svgs_from_html(html_path)

if __name__ == "__main__":
    main()
