from app.services.openai_service import get_ai_response

stored_chunks = []


def chunk_text(text, chunk_size=300):

    return [
        text[i:i + chunk_size]
        for i in range(0, len(text), chunk_size)
    ]


def store_document(filename, text):

    global stored_chunks

    chunks = chunk_text(text)

    for chunk in chunks:

        stored_chunks.append(
            {
                "filename": filename,
                "content": chunk
            }
        )


def search_documents(question):

    results = []

    words = question.lower().split()

    for chunk in stored_chunks:

        score = sum(
            1
            for word in words
            if word in chunk["content"].lower()
        )

        results.append(
            (
                score,
                chunk["content"]
            )
        )

    results.sort(
        key=lambda x: x[0],
        reverse=True
    )

    return results[:3]


def rag_answer(question):

    matches = search_documents(question)

    context = "\n".join(
        [
            chunk
            for score, chunk in matches
            if score > 0
        ]
    )

    if not context:

        return (
            "I could not find that information "
            "in the uploaded documents."
        )

    prompt = f"""
You are a document assistant.

Answer ONLY from the provided context.

Context:
{context}

Question:
{question}
"""

    return get_ai_response(prompt)