import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Commentaire() {
    const navigate = useNavigate();
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");

    const [note, setNote] = useState("");

    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:3001/commentaire",
                { titre, description, note },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const { success, message } = response.data;
            if (!success) {
                setSuccessMessage(message);
                navigate("/Commentaire");
                console.log("message : " + message);
            } else {
                console.log(success);

                console.log("message :::" + message);
                setSuccessMessage(message);
                navigate("/Commentaire");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>COMMENTAIRE</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Titre"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="note 1 à 5"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />

                <input type="submit" value="Soumettre" />
            </form>
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
}

export default Commentaire;
