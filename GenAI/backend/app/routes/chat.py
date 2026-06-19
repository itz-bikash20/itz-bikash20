from fastapi import APIRouter
from pydantic import BaseModel
from app.models.chat_history import ChatHistory
from sqlalchemy.orm import Session
from fastapi import Depends
from app.auth.dependencies import get_current_user
from app.database import get_db

from app.services.openai_service import (
    get_ai_response
)

router = APIRouter()


class ChatRequest(BaseModel):
    message: str

@router.post("/")
def chat(
    data: ChatRequest,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    answer = get_ai_response(
        data.message
    )

    chat_record = ChatHistory(
        user_id=current_user.id,
        question=data.message,
        answer=answer
    )

    db.add(chat_record)
    db.commit()

    return {
        "response": answer
    }
@router.get("/history")
def get_history(
    db: Session = Depends(get_db),
    current_user = Depends(
        get_current_user
    )
):
    chats = db.query(
        ChatHistory
    ).filter(
        ChatHistory.user_id ==
        current_user.id
    ).all()
    return chats