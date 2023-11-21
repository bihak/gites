import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import "../style/connexion.css";
import vector from "../style/img/Vector 2.svg";
import Inscription from "./Inscription";
import ReactModal from 'react-modal';
import bcrypt from "bcryptjs-react";

function Connexion(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const token = location.state && location.state.token;
    const userId = location.state && location.state.userId;
    const currentPath = location.pathname;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const hashedPassword = await bcrypt.hash(password.trim(), 10);
            const response = await axios.post(
                "http://localhost:3001/connexion",
                { email, password: hashedPassword }
            );
            const { success, message, token, userId } = response.data;
            setMessage(message);
            if (success) {
                if (currentPath == '/') {
                    navigate("/Connexiongood", { state: { token: token, userId: userId } });
                } else {
                    navigate(`${currentPath}`, { state: { token: token, userId: userId, message: message } });
                }
            } else {
                navigate("");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId)
        }
    }, [token]);
    return (
        <main className="connect_inscript">
            <div className="connect_inscript_title">
                <h1>Connexion</h1>
            </div>
            <form className="connexion" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">E-mail</label>
                    <img src={vector} alt="barre separation" />

                    <input
                        id="email"
                        type="email"
                        placeholder="Adresse e-mail"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <img src={vector} alt="barre separation" />

                    <input
                        id="password"
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <input
                    className="connect_inscript_button"
                    type="submit"
                    value="Connexion"
                />
            </form>
            <button className="Reservation btn active inscription_btn" onClick={openModal} onRequestClose={closeModal}>Inscription</button>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        width: '720px',
                        height: '900px',
                        margin: 'auto',
                        background: '#FFFFFF00',
                        border: 'none'
                    },
                }}
            >
                <Inscription />
            </ReactModal>
            {message && <p>{message}</p>}
        </main>
    );
}

export default Connexion;
