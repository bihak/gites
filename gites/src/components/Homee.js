import React, { useEffect, useState } from "react";
import "../style/home.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Img from "../image/Dark-wooden-cottage-stands-out-among-the-green-and-gray-backdrop-.jpg"
import Navbar from "./Navbar";
import img1 from "../img/Convenient.png"
import img2 from "../img/Verified.png"
import img3 from "../img/Support.png"
import img4 from "../image/pexels-skyler-ewing-4818015.jpg";

function Home() {
    const [gitesData, setGitesData] = useState([]);

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
        <div className="home">
            <div className="navbar">
                <Navbar />
            </div>
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
                            <Link to={`/gites/${gite.id}`}>
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
                <h1 className="titre_gite">Nos Valeurs</h1>
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
            <div className="last_img">
                <img src={img4} alt="foret" />
                <div className="last_img_text">
                    <h1>Découvrez des paysages sublimes en partant en voyage dans des gîtes
                        insolites, accueillant et chaleureux.</h1>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;