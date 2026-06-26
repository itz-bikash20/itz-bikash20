from fastapi import FastAPI

from app.database import Base
from app.database import engine
from app.routes import user
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chat
from app.routes import documents
from app.routes import auth
from app.routes import rag

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Enterprise GenAI"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(
    auth.router,
    prefix="/auth",
    tags=["Authentication"]
)
app.include_router(
    user.router,
    prefix="/user",
    tags=["User"]
)
app.include_router(
    chat.router,
    prefix="/chat",
    tags=["Chat"]
)
app.include_router(
    rag.router,
    prefix="/rag",
    tags=["RAG"]
)
app.include_router(
    documents.router,
    prefix="/documents",
    tags=["Documents"]
)

@app.get("/")
def home():

    return {
        "message":
        "Enterprise GenAI API Running"
    }