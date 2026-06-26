from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.services.rag_service import (
    rag_answer
)

from app.auth.dependencies import (
    get_current_user
)

router = APIRouter()


class Question(BaseModel):
    question: str


@router.post("/ask")
def ask(
    data: Question,
    current_user=Depends(
        get_current_user
    )
):

    answer = rag_answer(
        data.question,
        current_user.id
    )

    return {
        "answer": answer
    }