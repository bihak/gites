import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import "../style/profil.css";
import Deconnection from "./Deconnection";
import ReactModal from 'react-modal';
import Annonce from './Annonce';
import axios from 'axios';
import { AiOutlineFolderAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setProfil } from "../Store";
import { useNavigate } from "react-router-dom";


function Profil() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);
    const [selectedTab, setSelectedTab] = useState('profil');
    const [userData, setUserData] = useState(null);
    const [userDatas, setUserDatas] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [editableFields, setEditableFields] = useState({
        nom: false,
        prenom: false,
        email: false,
        telephone: false,
        lien_avatar: false,
        mot_de_pass: false,
    });
    const [editedValues, setEditedValues] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        lien_avatar: '',
        mot_de_pass: ''
    });

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    const openModal2 = () => {
        setModalIsOpen2(true);
    };

    const closeModal2 = () => {
        setModalIsOpen2(false);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        console.log(storedToken)
        if (storedToken) {
            axios.get('http://localhost:3001/useruser', {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })
                .then(response => {
                    setUserData(response.data);
                    dispatch(setProfil(response.data[0].lien_avatar))
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [userDatas]);
    const handleEdit = (field) => {
        setEditableFields(prevState => ({
            ...prevState,
            [field]: true
        }));
        setEditedValues(prevState => ({
            ...prevState,
            [field]: Data[0][field] || ''

        }));
    };
    const handleSave = (field) => {
        axios.post('http://localhost:3001/save', {
            [field]: editedValues[field],
            userId: localStorage.userId
        })
            .then(response => {
                setUserDatas(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la sauvegarde', error);
            });
        setEditableFields(prevState => ({
            ...prevState,
            [field]: false
        }));
    };

    const handleCancel = (field) => {
        setEditableFields(prevState => ({
            ...prevState,
            [field]: false
        }));
    };

    const handleInputChange = (e, field) => {
        setEditedValues(prevState => ({
            ...prevState,
            [field]: e.target.value
        }));
    };
    const handleDeleteAccount = () => {
        const isConfirmed = window.confirm("Confirmez-vous la suppression de votre compte?");
        const storedToken = localStorage.getItem('token');

        if (isConfirmed) {
            axios.delete('http://localhost:3001/delete-account', {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                },
                data: {
                    userId: localStorage.userId
                }
            })
                .then(response => {
                    navigate('/');
                })
                .catch(error => {
                    console.error('Error deleting account', error);
                });
        }
    };
    const Data = userData ?? []
    console.log(Data)
    return (
        <div className='profil_corp'>
            <Navbar />
            <div className='profil'>
                <div className='sidebar'>
                    <div className='up'>
                        <div>
                            <div className='photo_profil' onClick={openModal2}>
                                {Data[0]?.lien_avatar ? (
                                    <img src={require(`../image/${Data[0]?.lien_avatar}`)} alt={Data[0]?.pseudo} />
                                ) : (
                                    <p>hello</p>
                                )}
                            </div>

                            <ReactModal
                                isOpen={modalIsOpen2}
                                onRequestClose={closeModal2}
                                style={{
                                    overlay: {
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    },
                                    content: {
                                        width: '61vw',
                                        margin: 'auto',
                                        background: 'transparent',
                                        border: 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    },
                                }}
                            >
                                <div style={{ width: '70%' }}>
                                    {editableFields.lien_avatar ? (
                                        <div className='edit_file'>
                                            <input
                                                type='file'
                                                name="file"
                                                id="file"
                                                class="inputfile"
                                                onChange={(e) => handleInputChange(e, 'lien_avatar')}
                                            />
                                            <label htmlFor="file"><AiOutlineFolderAdd size="50%" />Choose a file</label>
                                        </div>
                                    ) : (
                                        Data[0]?.lien_avatar ? (
                                            <img
                                                src={require(`../image/${Data[0]?.lien_avatar}`)}
                                                alt={Data[0]?.pseudo}
                                                style={{ width: '100%', height: '100%', borderRadius: '10px', objectFit: 'cover', float: 'left' }}
                                            />
                                        ) : (
                                            <p>hello</p>
                                        )
                                    )}
                                </div>
                                <div className='btn_edit_del'>
                                    {editableFields.lien_avatar ? (
                                        <>
                                            <button className="Reservation" onClick={() => handleSave('lien_avatar')}>
                                                Sauvegarder
                                            </button>
                                            <button className="Reservation" onClick={() => handleCancel('lien_avatar')}>
                                                Annuler
                                            </button>
                                        </>
                                    ) : (
                                        <button className="Reservation" onClick={() => handleEdit('lien_avatar')}>
                                            Modifier
                                        </button>
                                    )}
                                </div>
                            </ReactModal>
                        </div>
                        <h3>{Data[0]?.pseudo}</h3>
                        <div className='btn_profil'>
                            <button className={`Reservation btn ${selectedTab === 'profil' ? 'active' : ''}`} onClick={() => setSelectedTab('profil')}>
                                Profil
                            </button>
                            <button className={`Reservation btn ${selectedTab === 'hote' ? 'active' : ''}`} onClick={() => setSelectedTab('hote')}>
                                Mode Hôte
                            </button>
                        </div>
                    </div>
                    <div className='decox'>
                        <button className="deconnexion_profil Reservation" onClick={openModal}>
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
                        <button className="deconnexion_profil Reservation" onClick={handleDeleteAccount}>
                            Supprimer
                        </button>
                    </div>
                </div>
                <div className='information'>
                    {selectedTab === 'profil' && <div className='info'>
                        {userData && (
                            <>
                                <div className='btn_information'>
                                    <div className='profil_info_box'>
                                        <p className='profil_info_titre'>Nom: </p>
                                        {editableFields.nom ? (
                                            <input
                                                className='input_edit'
                                                type='text'
                                                value={editedValues.nom}
                                                onChange={(e) => handleInputChange(e, 'nom')}
                                            />
                                        ) : (
                                            <p className='profil_info_user'>{Data[0]?.nom}</p>
                                        )}
                                    </div>
                                    <div className='btn_edit_del'>
                                        {editableFields.nom ? (
                                            <>
                                                <button className="Reservation" onClick={() => handleSave('nom')}>
                                                    Sauvegarder
                                                </button>
                                                <button className="Reservation" onClick={() => handleCancel('nom')}>
                                                    Annuler
                                                </button>
                                            </>
                                        ) : (
                                            <button className="Reservation" onClick={() => handleEdit('nom')}>
                                                Modifier
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className='btn_information'>
                                    <div className='profil_info_box'>
                                        <p className='profil_info_titre'>Prenom:</p>
                                        {editableFields.prenom ? (
                                            <input
                                                className='input_edit'
                                                type='text'
                                                value={editedValues.prenom}
                                                onChange={(e) => handleInputChange(e, 'prenom')}
                                            />
                                        ) : (
                                            <p className='profil_info_user'>{Data[0]?.prenom}</p>
                                        )}
                                    </div>
                                    <div className='btn_edit_del'>
                                        {editableFields.prenom ? (
                                            <>
                                                <button className="Reservation" onClick={() => handleSave('prenom')}>
                                                    Sauvegarder
                                                </button>
                                                <button className="Reservation" onClick={() => handleCancel('prenom')}>
                                                    Annuler
                                                </button>
                                            </>
                                        ) : (
                                            <button className="Reservation" onClick={() => handleEdit('prenom')}>
                                                Modifier
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className='btn_information'>
                                    <div className='profil_info_box'>
                                        <p className='profil_info_titre'>E-mail: </p>
                                        {editableFields.email ? (
                                            <input
                                                className='input_edit'
                                                type='mail'
                                                value={editedValues.email}
                                                onChange={(e) => handleInputChange(e, 'email')}
                                            />
                                        ) : (
                                            <p className='profil_info_user'>{Data[0]?.email}</p>
                                        )}
                                    </div>
                                    <div className='btn_edit_del'>
                                        {editableFields.email ? (
                                            <>
                                                <button className="Reservation" onClick={() => handleSave('email')}>
                                                    Sauvegarder
                                                </button>
                                                <button className="Reservation" onClick={() => handleCancel('email')}>
                                                    Annuler
                                                </button>
                                            </>
                                        ) : (
                                            <button className="Reservation" onClick={() => handleEdit('email')}>
                                                Modifier
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className='btn_information'>
                                    <div className='profil_info_box'>
                                        <p className='profil_info_titre'>Téléphone: </p>
                                        {editableFields.telephone ? (
                                            <input
                                                className='input_edit'
                                                type='text'
                                                value={editedValues.telephone}
                                                onChange={(e) => handleInputChange(e, 'telephone')}
                                            />
                                        ) : (
                                            <p className='profil_info_user'>{Data[0]?.telephone}</p>
                                        )}
                                    </div>
                                    <div className='btn_edit_del'>
                                        {editableFields.telephone ? (
                                            <>
                                                <button className="Reservation" onClick={() => handleSave('telephone')}>
                                                    Sauvegarder
                                                </button>
                                                <button className="Reservation" onClick={() => handleCancel('telephone')}>
                                                    Annuler
                                                </button>
                                            </>
                                        ) : (
                                            <button className="Reservation" onClick={() => handleEdit('telephone')}>
                                                Modifier
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>}
                    {selectedTab === 'hote' && <div className='mode_hote'> <Annonce /></div>}
                </div>
            </div>
        </div >
    );
}

export default Profil;
