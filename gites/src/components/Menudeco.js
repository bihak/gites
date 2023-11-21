import React from 'react';
import { useState } from 'react';
import ReactModal from 'react-modal';
import Connexion from './Connexion';



function Menudco() {
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
                        <button className="box1_bouton" onClick={openModal}>
                            <p>Connexion/</p><p>inscription</p>
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
                                    height: '690px',
                                    margin: 'auto',
                                    background: '#FFFFFF00',
                                    border: 'none'
                                },
                            }}
                        >
                            <Connexion />
                        </ReactModal>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Menudco;