import sys

try:
    import fitz  # PyMuPDF
    doc = fitz.open(sys.argv[1])
    text = ""
    for page in doc:
        text += page.get_text()
    print(text)
except ImportError:
    try:
        from PyPDF2 import PdfReader
        reader = PdfReader(sys.argv[1])
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        print(text)
    except ImportError:
        print("Need PyMuPDF or PyPDF2")
