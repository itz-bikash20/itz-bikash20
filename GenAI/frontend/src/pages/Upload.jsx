import { useState } from "react";
import api from "../services/api";

function Upload() {

    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");

    const uploadFile = async () => {

        if (!file) {
            alert("Please select a file");
            return;
        }

        try {

            const formData = new FormData();

            formData.append(
                "file",
                file
            );

            const token =
                localStorage.getItem("token");

            const res =
                await api.post(
                    "/documents/upload",
                    formData,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                            "Content-Type":
                                "multipart/form-data"
                        }
                    }
                );

            setUploadStatus(
                res.data.message
            );

        } catch (error) {

            console.error(error);

            setUploadStatus(
                "Upload Failed"
            );
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <div className="max-w-4xl mx-auto">

                <div className="bg-white rounded-xl shadow-lg p-8">

                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Upload Documents
                    </h1>

                    <p className="text-gray-500 mb-8">
                        Upload PDF, DOCX or TXT files for AI-powered document search.
                    </p>

                    <div className="border-2 border-dashed border-blue-300 rounded-xl p-10 text-center">

                        <div className="text-6xl mb-4">
                            📄
                        </div>

                        <h2 className="text-xl font-semibold mb-6">
                            Choose a document
                        </h2>

                        {/* Custom File Button */}

                        <label className="cursor-pointer">

                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) =>
                                    setFile(
                                        e.target.files[0]
                                    )
                                }
                            />

                            <div className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block shadow-md">

                                📁 Choose File

                            </div>

                        </label>

                        {/* Selected File */}

                        {
                            file && (

                                <div className="mt-5 bg-green-50 border border-green-300 rounded-lg p-4">

                                    <p className="font-medium text-green-700">

                                        Selected File:

                                    </p>

                                    <p className="text-green-600">

                                        {file.name}

                                    </p>

                                </div>

                            )
                        }

                        {/* Upload Button */}

                        <button
                            onClick={uploadFile}
                            className="
                                mt-6
                                bg-green-600
                                hover:bg-green-700
                                text-white
                                px-8
                                py-3
                                rounded-lg
                                shadow-lg
                                font-semibold
                            "
                        >
                            🚀 Upload Document
                        </button>

                        {/* Status */}

                        {
                            uploadStatus && (

                                <div className="mt-5 p-3 rounded-lg bg-blue-50 text-blue-700">

                                    {uploadStatus}

                                </div>

                            )
                        }

                    </div>

                </div>

                {/* Supported Files */}

                <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

                    <h2 className="text-2xl font-bold mb-4">
                        Supported Files
                    </h2>

                    <div className="grid grid-cols-3 gap-4">

                        <div className="bg-red-50 p-5 rounded-lg text-center">

                            📕
                            <p className="mt-2">
                                PDF
                            </p>

                        </div>

                        <div className="bg-blue-50 p-5 rounded-lg text-center">

                            📘
                            <p className="mt-2">
                                DOCX
                            </p>

                        </div>

                        <div className="bg-green-50 p-5 rounded-lg text-center">

                            📗
                            <p className="mt-2">
                                TXT
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Upload;