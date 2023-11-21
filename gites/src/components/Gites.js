import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import "../style/gites_discription.css";
import langue from "../img/languages.png"
import Footer from "./Footer";


const Gites = () => {
    const { id } = useParams();
    const [gitesData, setGitesData] = useState([]);
    const [gitesAccData, setGitesAccData] = useState([]);
    const [gitesEquData, setGitesEquData] = useState([]);
    const [gitesLanData, setGitesLanData] = useState([]);
    const location = useLocation();
    const userId = location.search.substring(1)

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
    return (
        <div>
            <Navbar />
            <div className="discription_gite">
                {gite && (
                    <div className="gite_discription" key={gite.id}>
                        <div className="titre">
                            <h1 className="titre_gite_discription">{gite.nom}</h1>
                        </div>
                        <div className="img_gite_discription">
                            {lienImages.map((imageName, index) => (
                                <img key={index} src={require(`../image/${imageName}`)} alt="Image" />
                            ))}
                        </div>
                        <div className="titre">
                            <h1 className="titre_gite_discription">Informations de base</h1>
                        </div>
                        <div>

                            <h3 className="gite_discription-info">Superficie {gite.superficie} m²</h3>
                            <h3 className="gite_discription-info">Prix de la nuit {gite.prix} euro</h3>
                        </div>
                        <div className="titre">
                            <h1 className="titre_gite_discription">Description</h1>
                        </div>
                        <div>


                            <p> {gite.description}</p>
                        </div>
                        <div className="titre">
                            <h1 className="titre_gite_discription">Equipement et services</h1>
                        </div>
                        <div>
                            <div className="gite_discription_equipement">
                                <ul>
                                    {filteredKeys.map((key, index) => (
                                        <li key={index}>
                                            <img src={require(`../img/${key}.png`)} alt={key} />
                                            <p>{formatColumnName(key)}</p>
                                        </li>
                                    ))}
                                </ul>
                                <ul>
                                    {filteredKeysqu.map((key, index) => (
                                        <li key={index}>
                                            <img src={require(`../img/${key}.png`)} alt={key} />
                                            <p>{formatColumnNamequ(key)}</p>
                                        </li>
                                    ))}
                                </ul>
                                <ul>
                                    {filteredKeyslan.map((key, index) => (
                                        <li key={index}>
                                            <img src={langue} alt={key} />
                                            <p>{formatColumnNamelan(key)}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="reserv">
                                <Link to={`/Reservation/${gite.id}?${userId}`}>
                                    <button className="Reservation bouton" >
                                        Réserver
                                    </button>
                                </Link>

                            </div>
                        </div>
                    </div>
                )}
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d20354.58951845968!2d3.08312915!3d50.3791642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sfr!4v1689151100497!5m2!1sfr!2sfr" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <Footer />
        </div>
    );
};

export default Gites;