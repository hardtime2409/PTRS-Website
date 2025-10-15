import re
from pathlib import Path

def clean_html_format(file_path):
    """
    Chuẩn hóa định dạng HTML:
    - <div> trống -> đưa về 1 dòng.
    - <span>, <p>, <h2>, <h4> (chỉ chứa text) -> đưa về 1 dòng.
    """
    html = Path(file_path).read_text(encoding="utf-8")

    # 1️⃣ <div> trống
    html = re.sub(
        r'<div([^>]*)>\s*</div>',
        lambda m: f'<div{m.group(1)}></div>',
        html,
        flags=re.MULTILINE,
    )

    # 2️⃣ <span>...</span> (chỉ text)
    html = re.sub(
        r'<span([^>]*)>\s*([^<]*?)\s*</span>',
        lambda m: f'<span{m.group(1)}>{m.group(2).strip()}</span>',
        html,
        flags=re.MULTILINE,
    )
    
    # 2️⃣ <label>...</label> (chỉ text)
    html = re.sub(
        r'<label([^>]*)>\s*([^<]*?)\s*</label>',
        lambda m: f'<label{m.group(1)}>{m.group(2).strip()}</label>',
        html,
        flags=re.MULTILINE,
    )

    # 3️⃣ <p>...</p> (chỉ text)
    html = re.sub(
        r'<p([^>]*)>\s*([^<>]+?)\s*</p>',
        lambda m: f'<p{m.group(1)}>{m.group(2).strip()}</p>',
        html,
        flags=re.MULTILINE,
    )

    # 4️⃣ <h2>...</h2> (chỉ text)
    html = re.sub(
        r'<h2([^>]*)>\s*([^<>]+?)\s*</h2>',
        lambda m: f'<h2{m.group(1)}>{m.group(2).strip()}</h2>',
        html,
        flags=re.MULTILINE,
    )

    # 5️⃣ <h4>...</h4> (chỉ text)
    html = re.sub(
        r'<h4([^>]*)>\s*([^<>]+?)\s*</h4>',
        lambda m: f'<h4{m.group(1)}>{m.group(2).strip()}</h4>',
        html,
        flags=re.MULTILINE,
    )

    # 6️⃣ Xóa dòng trống dư
    html = re.sub(r'\n\s*\n', '\n', html)

    Path(file_path).write_text(html, encoding="utf-8")
    print(f"✨ Cleaned formatting: {Path(file_path).name}")
