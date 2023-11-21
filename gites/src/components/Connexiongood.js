import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from "./Navbar";
import Footer from "./Footer";
import Img from "../image/Dark-wooden-cottage-stands-out-among-the-green-and-gray-backdrop-.jpg";
import img1 from "../img/Convenient.png";
import img2 from "../img/Verified.png";
import img3 from "../img/Support.png";

function Connexiongood() {
    const location = useLocation();
    const token = location.state && location.state.token;
    const userId = location.state && location.state.userId;
    const [userData, setUserData] = useState(null);
    const [gitesData, setGitesData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId)
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
                    setUserData(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, []);

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
    return (
        <div className="Conexion">
            <Navbar />
            <div className="img_acceuil">
                <img src={Img} alt="acceuil" />
                <div className="sur_image">
                    <h1>Co’Gîte</h1>
                    <p>Ne réfléchissez plus à votre destination, nous cogitons pour vous.</p>
                    <button className="bouton">Recherche</button>
                </div>
            </div>
            <div className="git">
                <h1 className="titre_gite">Nos gîtes</h1>
                <div className="gites">
                    {gitesData.map(gite => (
                        <div className="gite" key={gite.id}>
                            <Link to={`/gites/${gite.id}?${userId}`}>
                                {gite.lien_image && <img src={require(`../image/${gite.lien_image.split(',')[0]}`)} alt="Gîte" />}
                                <h3>{gite.adresse}</h3>
                                <h5>
                                    {gite.Proprietaire_id ? 'Professionnel' : 'Particulier'}
                                </h5>
                                <h5>{gite.prix} euro</h5>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="git_plus">
                <h1 className="titre_gite">Nos gîtes</h1>
                <div className="gites_plus">
                    <div className="gites_plus_box">
                        <div className="gites_plus_box_img">
                            <img src={img1} alt="" />
                        </div>
                        <h3>Simplicité</h3>
                        <p>Rendre la recherche et la location de gîtes simple et tout ça accessible pour tous est primordiale pour nous.</p>
                    </div>
                    <div className="gites_plus_box">
                        <div className="gites_plus_box_img">
                            <img src={img2} alt="" />
                        </div>
                        <h3>Sécurité</h3>
                        <p>Être en sécurité dans son gîte, avoir un propriétaire ou locataire fiable c’est essentiel pour nous. </p>
                    </div>
                    <div className="gites_plus_box">
                        <div className="gites_plus_box_img">
                            <img src={img3} alt="" />
                        </div>
                        <h3>Convivialité</h3>
                        <p>Nous nous efforçons de vérifier nos utilisateurs pour qu’ils soient accueillant, fiable.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Connexiongood;
