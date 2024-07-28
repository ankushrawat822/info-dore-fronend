

import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_REACT_BACKEND_URL}/api/get-feedback`);
                setFeedbacks(response.data);
                console.log(response.data)
                setIsLoading(false);
            } catch (err) {
                setError('Failed to fetch feedbacks');
                setIsLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">User Feedbacks</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {feedbacks.map((feedback) => (
                    <div key={feedback.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="bg-blue-500 text-white px-4 py-2">
                            <h2 className="text-xl font-semibold truncate">{feedback.status}</h2>
                        </div>
                        <div className="p-4">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2 text-gray-800">Raised By</h3>
                                <p className="text-gray-700">{feedback.userEmail}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2 text-gray-800">Concerned Department:</h3>
                                <p className="text-gray-700">{feedback.department}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2 text-gray-800">Problem Statement</h3>
                                <p className="text-gray-700">{feedback.feedbackMessage}</p>
                            </div>
                            {feedback.suggestion && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Suggested Solution</h3>
                                    <p className="text-gray-700">{feedback.suggestion}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default Feedback
