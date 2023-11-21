import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import ReactModal from 'react-modal';
import Edit_gite from "./Edit_gite";
import plus from "../img/plus.png";
import "../style/annonce.css";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Ajoutloc from './Ajoutloc';

function Annance() {
    const location = useLocation();
    const token = location.state && location.state.token;
    const [userData, setUserData] = useState(null);
    const [giteData, setGiteData] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpen1, setModalIsOpen1] = useState(false);
    const [editingGite, setEditingGite] = useState(null);
    const [confirmation, setConfirmation] = useState(false);



    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        }
    }, [token]);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            axios.get('http://localhost:3001/user', {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })
                .then(response => {
                    setGiteData(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [confirmation]);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            axios.get('http://localhost:3001/useruser', {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })
                .then(response => {
                    setUserData(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [confirmation]);

    const openModal = (giteId) => {
        setEditingGite(giteId);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    const openModal1 = () => {
        setModalIsOpen1(true);
    };

    const closeModal1 = () => {
        setModalIsOpen1(false);
    };
    const Data = giteData ?? []
    const supprimerGite = (giteId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this gite?");
        if (isConfirmed) {
            axios.delete(`http://localhost:3001/gite/${giteId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    setUserData(prevData => ({
                        ...prevData,
                        giteData: prevData.giteData.filter(gite => gite.id !== giteId)
                    }));

                    setConfirmation(true);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="Gestion">
            <div className="git">
                <div className='gite_titre'>
                    <h1 className="titre_gite">Nos gîtes</h1>
                </div>
                <div className="gites">
                    <div className='gite gite_add'>
                        <div className='gite_bouton'>
                            <ReactModal isOpen={modalIsOpen1} onRequestClose={closeModal1}>
                                <Ajoutloc closeModal1={closeModal1} setConfirmation={setConfirmation} />
                            </ReactModal >
                            <button className='ajoutgite' onClick={openModal1}>
                                <img src={plus} alt="plus" />
                            </button>
                        </div>
                    </div>
                    {Data.map(gite => (
                        < div className="gite" key={gite.id} >
                            <div className='boutons_edit_sup'>
                                <button className="edit" onClick={() => openModal(gite.Gite_id)}>
                                    <AiOutlineEdit />
                                </button>
                                <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal}>
                                    <Edit_gite closeModal={closeModal} editingGite={editingGite} />
                                </ReactModal >
                                <button className="supprimer" onClick={() => supprimerGite(gite.Gite_id)}>
                                    <MdOutlineDeleteOutline />
                                </button>
                            </div>
                            {gite.lien_image && <img src={require(`../image/${gite.lien_image.split(',')[0]}`)} alt="Gîte" />}
                            <h3> {gite.adresse} </h3>
                            <h5>
                                {gite.is_professionnel ? 'Professionnel' : 'Particulier'}
                            </h5>
                            <h5>{gite.prix} euro</h5>
                        </div>
                    ))}
                </div>
            </div >
        </div >
    );
}

export default Annance;
