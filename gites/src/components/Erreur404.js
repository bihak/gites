import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import erreur from "../image/404.jpg"
import "../style/gites_discription.css"
import { Link } from 'react-router-dom';

function Erreur404() {
    return (
        <div className="erreur">
            <Navbar />
            <div className='erreur404'>
                <Link to="/">
                    <img src={erreur} alt="erreur" />
                </Link>
            </div>
            <Footer />
        </div>
    );
}

export default Erreur404;