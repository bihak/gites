import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../style/inscription.css";
import vector from "../style/img/Vector 2.svg";
import ReactModal from 'react-modal';
import Connexion from "./Connexion";
import bcrypt from "bcryptjs";

function Inscription() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [tel, setTel] = useState("");
    const [password, setPassword] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [image, setImage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const response = await axios.post(
                "http://localhost:3001/inscription",
                { email, password: hashedPassword, nom, prenom, tel, pseudo, image }
            );
            const { success, message } = response.data;

            if (success) {
                navigate("/homee");
            } else {
                navigate("/");
                setSuccessMessage("inscription echouer");
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
    return (
        <main className="connect_inscript inscription_style">
            <div className="connect_inscript_title">
                <h1>Inscription</h1>
            </div>
            <form className="inscription" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nom</label>
                    <img src={vector} alt="barre separation" />
                    <input
                        id="name"
                        type="text"
                        placeholder="Nom"
                        value={nom}
                        // pattern="[A-Za-z]{45}"
                        required
                        onChange={(e) => setNom(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="surname">Prénom</label>
                    <img src={vector} alt="barre separation" />
                    <input
                        id="surname"
                        type="text"
                        placeholder="Prenom"
                        value={prenom}
                        // pattern="[A-Za-z]{45}"
                        required
                        onChange={(e) => setPrenom(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="phone">Téléphone</label>
                    <img src={vector} alt="barre separation" />
                    <input
                        id="phone"
                        type="text"
                        placeholder="Tel"
                        value={tel}
                        // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        required
                        onChange={(e) => setTel(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="pseudo">Pseudo</label>
                    <img src={vector} alt="barre separation" />
                    <input
                        id="pseudo"
                        type="text"
                        placeholder="Pseudo"
                        value={pseudo}
                        // pattern="[A-Za-z]{20}"
                        required
                        onChange={(e) => setPseudo(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="email">E-mail</label>
                    <img src={vector} alt="barre separation" />
                    <input
                        id="email"
                        type="email"
                        placeholder="Adresse e-mail"
                        value={email}
                        // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$"
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
                <div>
                    <label htmlFor="img">Photo de profil</label>
                    <img src={vector} alt="barre separation" />
                    <input
                        id="img"
                        type="file"
                        placeholder=""
                        value={image}
                        required
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>

                <input
                    className="connect_inscript_button"
                    type="submit"
                    value="S'inscrire"
                />
                <button className="connect_button" onClick={openModal} onRequestClose={closeModal}>
                    Connexion
                </button>
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
                    <Connexion />
                </ReactModal>
            </form>

            <br />

            {successMessage && <p>{successMessage}</p>}
        </main>
    );
}

export default Inscription;
