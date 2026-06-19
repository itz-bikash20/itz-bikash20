from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime

from datetime import datetime

from app.database import Base


class Document(Base):

    __tablename__ = "documents"

    id = Column(
        Integer,
        primary_key=True
    )

    user_id = Column(
        Integer
    )

    filename = Column(
        String(255)
    )

    filepath = Column(
        String(500)
    )

    uploaded_at = Column(
        DateTime,
        default=datetime.utcnow
    )