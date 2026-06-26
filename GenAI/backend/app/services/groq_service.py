from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def get_ai_response(prompt):

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": """
                You are an Enterprise AI Assistant.
                Answer professionally and clearly.
                """
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.7
    )

    return completion.choices[0].message.content