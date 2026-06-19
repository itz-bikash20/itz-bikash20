from fastapi import APIRouter
from pydantic import BaseModel

from app.services.rag_service import (
    rag_answer
)

router = APIRouter()

class Question(BaseModel):
    question: str

@router.post("/ask")
def ask(data: Question):

    answer = rag_answer(
        data.question
    )

    return {
        "answer": answer
    }