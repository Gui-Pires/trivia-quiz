import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://opentdb.com/api.php?amount=10&category=9&type=multiple";

export default function TriviaGame() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(API_URL);
                setQuestions(response.data.results);
            } catch (err) {
                setError("Erro ao carregar perguntas.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Jogo de Trivia</h1>
            {questions.map((q, index) => (
                <div key={index}>
                    <h3>{q.question}</h3>
                    <ul>
                        {[...q.incorrect_answers, q.correct_answer].sort().map((answer, i) => (
                            <li key={i}>{answer}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
