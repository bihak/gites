import React, { useState, useEffect } from "react";
import axios from 'axios';
import Equipement from "./Equipement";
import Accessibilite from "./Accessibilite";
import Langue from "./Langue";
import image from "../img/20945158.jpg";
import { useLocation } from "react-router-dom";

function Edit_gite(props) {
    const location = useLocation()
    const [pro, setPro] = useState('');
    const [telpro, setTelpro] = useState('');
    const [emailpro, setEmailpro] = useState('');
    const [siren, setSiren] = useState('');
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [superficie, setSuperficie] = useState('');
    const [prix, setPrix] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [adresse, setAdresse] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [wifi, setWifi] = useState(0);
    const [animaux, setAnimaux] = useState(0);
    const [photos, setPhotos] = useState([]);
    const [photoUrls, setPhotoUrls] = useState([]);
    const [selectedTab, setSelectedTab] = useState("Formulaire");
    const { editingGite } = props;
    const id = editingGite

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    const checkboxNames = ['wifi', 'fibre', 'Deconnecté', 'Ethernet', 'Climatisation', 'Chauffage', 'Cheminée', 'Cuisine équipée', 'Espace de travail', 'Télévision', 'Salle de sport', 'Pisine', 'Jacuzzi', 'Barbecue', 'Caméras exterieures', 'Détecteur de fuméé', 'Détecteur de co2', 'Station de recharge', 'Reservation instantanée', 'Petit dejeuner', 'Séche cheveux', 'Fer a repasser', 'Séche linge', 'Lave linge'];
    const modifiedCheckboxNames = checkboxNames.map(name => name.replace(/\s/g, '_'));
    const initialSelectedColumns = modifiedCheckboxNames.reduce(
        (acc, name) => ({ ...acc, [name]: 0 }),
        {}
    );
    const [selectedColumns, setSelectedColumns] = useState(initialSelectedColumns);

    const checkboxNamesAcc = [`idGite_accessibilite`, `Animaux`, `Parking`, `Parking_gratuit`, `Fumeur`, `Autonome`, `Plain_pied`, `Accees_sup_81`, `Barres_appui`, `Siége_sb`, `Leve_personne`];
    const modifiedCheckboxNamesAcc = checkboxNamesAcc.map(name => name.replace(/\s/g, '_'));
    const initialSelectedColumnsAcc = modifiedCheckboxNamesAcc.reduce(
        (acc, name) => ({ ...acc, [name]: 0 }),
        {}
    );
    const [selectedColumnsaAcc, setselectedColumnsAcc] = useState(initialSelectedColumnsAcc);

    const checkboxNamesLangue = [`anglais`, `allemand`, `francais`, `italien`, `espagnol`, `arabe`, `portuguais`, `langue_des_signes`];
    const modifiedCheckboxNamesLangue = checkboxNamesLangue.map(name => name.replace(/\s/g, '_'));
    const initialSelectedColumnsLangue = modifiedCheckboxNamesLangue.reduce(
        (acc, name) => ({ ...acc, [name]: 0 }),
        {}
    );
    const [selectedColumnsLangue, setselectedColumnsLangue] = useState(initialSelectedColumnsLangue);

    const handleFileChange = (event) => {
        const files = event.target.files;
        const tab = Array.from(files).map(file => file.name);
        setPhotoUrls(tab);
        setPhotos(files);
    };

    const handleCheckboxChange = (e) => {
        const columnName = e.target.value;
        const isChecked = e.target.checked;
        setSelectedColumns(prevState => ({
            ...prevState,
            [columnName]: isChecked ? 1 : 0,
        }));
    };

    const handleCheckboxChangeAcc = (e) => {
        const columnName = e.target.value;
        const isChecked = e.target.checked;
        setselectedColumnsAcc(prevState => ({
            ...prevState,
            [columnName]: isChecked ? 1 : 0,
        }));
    };

    const handleCheckboxChangeLangue = (e) => {
        const columnName = e.target.value;
        const isChecked = e.target.checked;
        setselectedColumnsLangue(prevState => ({
            ...prevState,
            [columnName]: isChecked ? 1 : 0,
        }));
    };
    const renderTabContent = () => {
        switch (selectedTab) {
            case "Formulaire":
                return (
                    <div >
                        <div className="ajout">
                            <div className="ajout_input">
                                <div className="box_input">
                                    <label htmlFor="titre">Titre</label>
                                    <input id="titre" name="titre" type="text" placeholder="Titre" value={gite.nom} onChange={(e) => setTitre(e.target.value)} />
                                </div>
                                <div className="box_input">
                                    <label htmlFor="adresse">Adresse</label>
                                    <input id="adresse" name="adresse" type="text" placeholder="Adresse" value={gite.adresse} onChange={(e) => setAdresse(e.target.value)} />
                                </div>
                                <div className="box_input">
                                    <label htmlFor="sup">Superficie</label>
                                    <input id="sup" name="sup" type="text" placeholder="    ...." value={gite.superficie} onChange={(e) => setSuperficie(e.target.value)} />
                                    <label htmlFor="prix">&#x20;m&#xB2;</label>
                                </div>
                                <div className="box_input">
                                    <label htmlFor="prix">Prix</label>
                                    <input id="prix" name="prix" type="text" placeholder="    ...." value={gite.prix} onChange={(e) => setPrix(e.target.value)} />
                                    <label htmlFor="prix">&#x20;euro</label>
                                </div>
                                {/* <div className="box_input">
                                <label htmlFor="check">Pro</label>
                                <input id="check" name="check" type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                            </div> */}

                                {isChecked && (
                                    <>
                                        <div className="box_input">
                                            <label htmlFor="siren">Siren</label>
                                            <input id="siren" name="siren" type="text" placeholder="Siren" value={siren} onChange={(e) => setSiren(e.target.value)} />
                                        </div>
                                        <div className="box_input">
                                            <label htmlFor="email_pro">Email</label>
                                            <input id="siren" name="email_pro" type="email" placeholder="Email Pro" value={emailpro} onChange={(e) => setEmailpro(e.target.value)} />
                                        </div>
                                        <div className="box_input">
                                            <label htmlFor="tel_pro">Tél</label>
                                            <input id="siren" name="tel_pro" type="text" placeholder="Tel Pro" value={telpro} onChange={(e) => setTelpro(e.target.value)} />
                                        </div>
                                    </>
                                )}
                                {/* <div className="add_image">
                                <label htmlFor="file"></label>
                                <input id="file" type="file" multiple onChange={handleFileChange} />
                            </div> */}
                            </div>
                            <div className="ajout_image">
                                <img src={image} alt="home" />
                            </div>
                        </div>
                        <div className="description">
                            <h2>Déscription</h2>
                            <textarea name="dis" placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={gite.description}>
                            </textarea>
                        </div>
                    </div>
                );
            case "Equipements":
                return (
                    <Equipement selectedColumns={selectedColumns} handleCheckboxChange={handleCheckboxChange} />
                );
            case "Accessibilite":
                return (
                    <Accessibilite selectedColumns={selectedColumnsaAcc} handleCheckboxChange={handleCheckboxChangeAcc} />
                );
            case "Langues":
                return (
                    <Langue selectedColumns={selectedColumnsLangue} handleCheckboxChange={handleCheckboxChangeLangue} />
                );
            default:
                return null;
        }
    };
    const [gitesData, setGitesData] = useState([]);
    const [gitesAccData, setGitesAccData] = useState([]);
    const [gitesEquData, setGitesEquData] = useState([]);
    const [gitesLanData, setGitesLanData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/gites')
            .then(response => response.json())
            .then(data => {
                setGitesData(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);
    useEffect(() => {
        fetch('http://localhost:3001/gites_acc')
            .then(response => response.json())
            .then(data => {
                setGitesAccData(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:3001/gite_equipement')
            .then(response => response.json())
            .then(data => {
                setGitesEquData(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:3001/langue')
            .then(response => response.json())
            .then(data => {
                setGitesLanData(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const gite = gitesData.find(item => item.id === Number(id));
    const giteacc = gitesAccData.find(item => item.idGite_accessibilite === Number(gite.gite_accessibilite_idGite_accessibilite));
    const giteequ = gitesEquData.find(item => item.id === Number(gite.Gite_equipement_id));
    const gitelan = gitesLanData.find(item => item.id === Number(gite.langue_id));
    const lienImages = gite && gite.lien_image ? gite.lien_image.split(',') : [];
    const data = giteacc
    const filteredKeys = giteacc ? Object.keys(data).filter(key => data[key] === 1) : [];
    const formatColumnName = (filteredKeys) => {
        return filteredKeys.replace(/_/g, " ");
    };

    const dataqu = giteequ
    const filteredKeysqu = giteequ ? Object.keys(dataqu).filter(key => dataqu[key] === 1) : [];
    const formatColumnNamequ = (filteredKeysqu) => {
        return filteredKeysqu.replace(/_/g, " ");
    };

    const datalan = gitelan
    const filteredKeyslan = gitelan ? Object.keys(datalan).filter(key => datalan[key] === 1) : [];
    const formatColumnNamelan = (filteredKeyslan) => {
        return filteredKeyslan.replace(/_/g, " ");
    };
    const id_gite_user = gite.id
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `http://localhost:3001/modifierGite/${id}`, // Assurez-vous que giteId est défini
                { titre, adresse, superficie, prix, description, id_gite_user },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const { success, message } = response.data;
            if (success) {
                setSuccessMessage("Mise à jour réussie");
            } else {
                setSuccessMessage("Échec de la mise à jour");
            }
        } catch (error) {
            console.log(error);
        }

        props.closeModal();
    };
    return (
        <div className="ajoutloc">
            <div className="nav_edit">
                <ul>
                    <li onClick={() => handleTabClick("Formulaire")}>Formulaire</li>
                    <li onClick={() => handleTabClick("Equipements")}>Equipements</li>
                    <li onClick={() => handleTabClick("Accessibilite")}>Accessibilité</li>
                    <li onClick={() => handleTabClick("Langues")}>Langues</li>
                </ul>
            </div>
            <form className="formulaire" onSubmit={handleSubmit}>
                {renderTabContent()}
                <input onClick={handleSubmit} className="valider" type="submit" value="Valider" />
            </form>
        </div>
    );
}

export default Edit_gite;
