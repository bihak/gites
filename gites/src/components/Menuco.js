import React, { useState } from "react";
import { Link } from "react-router-dom";
import Deconnection from "./Deconnection";
import ReactModal from 'react-modal';

function Menuco() {
    const [isPlusVisible, setPlusVisible] = useState(false);


    const handleTogglePlus = () => {
        setPlusVisible(!isPlusVisible);
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    return (
        <div className="box">
            <div className="box1">
                <ul>
                    <li>
                        <Link to="/erreur">Messagerie</Link>
                    </li>
                    <hr />
                    <li>
                        <Link to="/edit_resa">Favoris</Link>
                    </li>
                    <hr />
                    <li>
                        <Link to="/Historique">Historique</Link>
                    </li>
                </ul>
            </div>
            <div className="box2">
                <ul>
                    <li>
                        <Link
                            className={isPlusVisible ? "open_plus" : "clos"}
                            onClick={handleTogglePlus}
                            to=""
                        >
                            Mode hôte
                        </Link>
                    </li>
                    {isPlusVisible && (
                        <>
                            <li>
                                <Link to="/profil">Informations professionnelles</Link>
                            </li>
                            <li>
                                <Link to="/gestionannance">Gestion des annonces</Link>
                            </li>
                            <li>
                                <Link to="/erreur">Historique des réservations</Link>
                            </li>
                        </>
                    )}
                    <hr />
                    <li>
                        <Link to="/erreur">Mon compte</Link>
                    </li>
                </ul>
            </div>
            <div className="box3">
                <ul>
                    <li>
                        <Link to="/erreur">À propos</Link>
                    </li>
                    <hr />
                    <li>
                        <Link to="/erreur">Centre d'aide</Link>
                    </li>
                    <button className="deconnexion" onClick={openModal}>
                        Déconnexion
                        <ReactModal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={{
                                overlay: {
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                },
                                content: {
                                    width: '720px',
                                    height: '690px',
                                    margin: 'auto',
                                    background: '#FFFFFF00',
                                    border: 'none'
                                },
                            }}
                        >
                            <Deconnection onCancel={closeModal} />
                        </ReactModal>
                    </button>
                </ul>
            </div>
        </div>
    );
}

export default Menuco;


