from fastapi import APIRouter, UploadFile, File
import shutil
import os
from app.services.pdf_service import (
    extract_pdf_text
)

from app.services.rag_service import (
    store_document
)
from sqlalchemy.orm import Session
from fastapi import Depends

from app.database import get_db

from app.auth.dependencies import (
    get_current_user
)

from app.models.document import Document

router = APIRouter()

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)
@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    document = Document(
        user_id=current_user.id,
        filename=file.filename,
        filepath=file_path
    )

    db.add(document)
    db.commit()

    # -------- RAG PART --------

    text = extract_pdf_text(file_path)

    print("\nPDF CONTENT:")
    print(text)


    store_document(
        text=text,
        user_id=current_user.id
    )

    return {
        "message": "Uploaded Successfully"
    }
@router.get("/")
def get_documents(
    db: Session = Depends(get_db),
    current_user = Depends(
        get_current_user
    )
):

    docs = db.query(
        Document
    ).filter(
        Document.user_id ==
        current_user.id
    ).all()

    return docs