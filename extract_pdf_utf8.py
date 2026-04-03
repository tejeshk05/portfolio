import sys

try:
    import fitz  # PyMuPDF
    doc = fitz.open(sys.argv[1])
    text = ""
    for page in doc:
        text += page.get_text()
    with open("new_resume_extracted.txt", "w", encoding="utf-8") as f:
        f.write(text)
except ImportError:
    try:
        from PyPDF2 import PdfReader
        reader = PdfReader(sys.argv[1])
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        with open("new_resume_extracted.txt", "w", encoding="utf-8") as f:
            f.write(text)
    except ImportError:
        print("Need PyMuPDF or PyPDF2")
