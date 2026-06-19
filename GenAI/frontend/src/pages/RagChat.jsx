import { useState } from "react";
import api from "../services/api";

function RagChat() {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const askQuestion = async () => {

        try {

            const token = localStorage.getItem("token");

const res = await api.post(
    "/rag/ask",
    {
        question
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

            setAnswer(
                res.data.answer
            );

        } catch (err) {

            console.error(err);

            alert("Error asking question");
        }
    };

    return (

        <div className="p-8">

            <h1 className="text-3xl font-bold">
                Document Assistant
            </h1>

            <textarea
                className="border p-3 w-full mt-4"
                rows="4"
                placeholder="Ask a question from uploaded documents..."
                value={question}
                onChange={(e) =>
                    setQuestion(e.target.value)
                }
            />

            <button
                onClick={askQuestion}
                className="bg-blue-600 text-white px-4 py-2 mt-4"
            >
                Ask
            </button>

            <div className="mt-6">

                <h2 className="font-bold">
                    Answer
                </h2>

                <p>
                    {answer}
                </p>

            </div>

        </div>
    );
}

export default RagChat;