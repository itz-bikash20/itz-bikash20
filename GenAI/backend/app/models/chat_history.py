from sqlalchemy import Column, Integer, Text, DateTime
from datetime import datetime
from app.database import Base

class ChatHistory(Base):

    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer)

    question = Column(Text)

    answer = Column(Text)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )