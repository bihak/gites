import { useState } from "react";
import axios from 'axios';
import Equipement from "./Equipement"
import Accessibilite from "./Accessibilite";
import Langue from "./Langue";
import image from "../img/20945158.jpg";

function Ajoutloc(props) {
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
    const id_user = localStorage.userId


    const checkboxNames = ['wifi', 'fibre', 'Deconnecté', 'Ethernet', 'Climatisation', 'Chauffage', 'Cheminée', 'Cuisine équipée',
        'Espace de travail', 'Télévision', 'Salle de sport', 'Pisine', 'Jacuzzi', 'Barbecue', 'Caméras exterieures', 'Détecteur de fuméé',
        'Détecteur de co2', 'Station de recharge', 'Reservation instantanée', 'Petit dejeuner', 'Séche cheveux', 'Fer a repasser', 'Séche linge', 'Lave linge'];
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:3001/ajoutloc',
                { pro, siren, emailpro, telpro, titre, description, superficie, prix, wifi, animaux, adresse, id_user, photos: photoUrls, equipe: selectedColumns, equipeAcc: selectedColumnsaAcc, langue: selectedColumnsLangue },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const { success, message } = response.data;
            if (success) {
                setSuccessMessage("Inscription réussie");
                props.setConfirmation(true);
            } else {
                setSuccessMessage("Inscription échouée");
            }
        } catch (error) {
            console.log(error);
        }
        props.closeModal1();
    };

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
    return (
        <div className="ajoutloc">
            <form className="formulaire" onSubmit={handleSubmit}>
                <div className="ajout">
                    <div className="ajout_input">
                        <div className="box_input">
                            <label htmlFor="titre">Titre</label>
                            <input id="titre" name="titre" type="text" placeholder="Titre" value={titre} onChange={(e) => setTitre(e.target.value)} />
                        </div>
                        <div className="box_input">
                            <label htmlFor="adresse">Adresse</label>
                            <input id="adresse" name="adresse" type="text" placeholder="Adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
                        </div>
                        <div className="box_input">
                            <label htmlFor="sup">Superficie</label>
                            <input id="sup" name="sup" type="text" placeholder="    ...." value={superficie} onChange={(e) => setSuperficie(e.target.value)} />
                            <label htmlFor="prix">&#x20;m&#xB2;</label>
                        </div>
                        <div className="box_input">
                            <label htmlFor="prix">Prix</label>
                            <input id="prix" name="prix" type="text" placeholder="    ...." value={prix} onChange={(e) => setPrix(e.target.value)} />
                            <label htmlFor="prix">&#x20;euro</label>
                        </div>
                        <div className="box_input">
                            <label htmlFor="check">Pro</label>
                            <input id="check" name="check" type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                        </div>
                        {isChecked && (
                            <>
                                <div className="box_input">
                                    <label htmlFor="siren">Siren</label>
                                    <input id="siren" name="siren" type="text" placeholder="Siren" value={siren} onChange={(e) => setSiren(e.target.value)} />
                                </div>
                                <div className="box_input">
                                    <label htmlFor="email_pro">Email Pro</label>
                                    <input id="siren" name="email_pro" type="email" placeholder="Email Pro" value={emailpro} onChange={(e) => setEmailpro(e.target.value)} />
                                </div>
                                <div className="box_input">
                                    <label htmlFor="tel_pro">Tel Pro</label>
                                    <input id="siren" name="tel_pro" type="text" placeholder="Tel Pro" value={telpro} onChange={(e) => setTelpro(e.target.value)} />
                                </div>
                            </>
                        )}
                        <div className="add_image">
                            <label htmlFor="file"></label>
                            <input id="file" type="file" multiple onChange={handleFileChange} />
                        </div>
                    </div>
                    <div className="ajout_image">
                        <img src={image} alt="home" />
                    </div>
                </div>
                <h2>Déscription</h2>
                <div className="description"><textarea name="dis" placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description}></textarea></div>

                <Equipement selectedColumns={selectedColumns} handleCheckboxChange={handleCheckboxChange} />
                <Accessibilite selectedColumns={selectedColumnsaAcc} handleCheckboxChange={handleCheckboxChangeAcc} />
                <Langue selectedColumns={selectedColumnsLangue} handleCheckboxChange={handleCheckboxChangeLangue} />
                <input onClick={handleSubmit} className="valider" type="submit" value="Valider" />
            </form>
        </div>
    );
}

export default Ajoutloc;


