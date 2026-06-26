from pathlib import Path
import chromadb

from app.services.embedding_service import generate_embedding
from app.services.groq_service import get_ai_response

# =====================================================
# ChromaDB Configuration
# =====================================================

PROJECT_ROOT = Path.cwd()

CHROMA_PATH = PROJECT_ROOT / "chroma_db"

CHROMA_PATH.mkdir(parents=True, exist_ok=True)

client = chromadb.PersistentClient(
    path=str(CHROMA_PATH)
)

collection = client.get_or_create_collection(
    name="documents",
    embedding_function=None
)
# =====================================================
# Chunking
# =====================================================

def chunk_text(text, chunk_size=500):
    chunks = []

    for i in range(0, len(text), chunk_size):
        chunks.append(text[i:i + chunk_size])

    return chunks


# =====================================================
# Store Document
# =====================================================

def store_document(text, user_id):

    print("=" * 60)

    chunks = chunk_text(text)


    for idx, chunk in enumerate(chunks):


        try:

            print("Generating embedding...")

            embedding = generate_embedding(chunk)


            collection.add(
                ids=[
                    f"{user_id}_{idx}_{hash(chunk)}"
                ],
                documents=[
                    chunk
                ],
                embeddings=[
                    embedding
                ],
                metadatas=[
                    {
                        "user_id": user_id
                    }
                ]
            )


        except Exception as e:

            print("\nERROR OCCURRED")
            print(type(e))
            print(e)
            raise

    print("=" * 60)


# =====================================================
# Search Documents
# =====================================================

def search_documents(question, user_id):

    print("=" * 60)

    query_embedding = generate_embedding(question)

    print("Query embedding generated")

    results = collection.query(
        query_embeddings=[
            query_embedding
        ],
        n_results=5,
        where={
            "user_id": user_id
        }
    )

    print("Query completed")

    documents = results.get(
        "documents",
        []
    )

    if not documents:
        return []

    return documents[0]


# =====================================================
# RAG Answer
# =====================================================

def rag_answer(question, user_id):

    contexts = search_documents(
        question,
        user_id
    )

    if not contexts:
        return (
            "No relevant information found in uploaded documents."
        )

    context = "\n\n".join(contexts)

    prompt = f"""
You are a document assistant.

Answer ONLY from the provided context.

If the answer is not present, reply exactly:

"Sorry coder, I can't find your answer."

Context:
{context}

Question:
{question}

Answer:
"""


    response = get_ai_response(prompt)

    print("Groq response received")

    return response