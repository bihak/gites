import React from "react";
import { NavLink } from "react-router-dom";
import "../style/footer.css";
import logo_transparent from "../style/img/Fichier_9-300px.png";

const Footer = () => {
    return (
        <div className="footer">
            <footer>
                <div id="infos-links">
                    <div className="block-footer">
                        <p className="footer-title">A propos</p>

                        <p id="about-us">
                            Nous sommes une plateforme en ligne de réservation
                            et location de gîte axé sur la sécurité de nos
                            clients.
                        </p>
                        <div id="footer-logo">
                            <img
                                id="logo-footer"
                                src={logo_transparent}
                                alt="logo-cogite"
                            />
                        </div>
                    </div>
                    <div className="block-footer1 block-footer">
                        <p className="footer-title">Contact</p>
                        <p id="contact-info">
                            Adresse : 133 Rue Saint Thomas, Douai <br />
                            Téléphone : 09 03 56 54 87 <br />
                            cogite@gmail.fr
                        </p>
                    </div>
                </div>
                <div className="white-bar"></div>
                <div className="copyright">
                    <p>
                        Copyright © 2023 Tout droits réservés | Site réalisé par
                        Co’Gîte
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
