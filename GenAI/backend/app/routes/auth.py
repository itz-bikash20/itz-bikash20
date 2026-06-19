from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from app.auth.jwt_handler import create_access_token

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User

from app.schemas.user import (
    UserRegister,
    UserLogin
)

from app.auth.security import (
    hash_password,
    verify_password
)

router = APIRouter()


@router.post("/register")
def register(
        user: UserRegister,
        db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    new_user = User(
        username=user.username,
        email=user.email,
        password=hash_password(
            user.password
        )
    )

    db.add(new_user)
    db.commit()

    return {
        "message":
        "User registered successfully"
    }


@router.post("/login")
def login(
        user: UserLogin,
        db: Session = Depends(get_db)
):

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not verify_password(
            user.password,
            db_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        {
            "id": db_user.id,
            "email": db_user.email,
            "username": db_user.username
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }