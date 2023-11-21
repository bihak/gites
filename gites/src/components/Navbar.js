import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/navbar.css";
import logonavbar from "../img_navbar/logonavbar.svg";
import recherche from "../img_navbar/Search.svg";
import menu from "../img_navbar/menu.svg";
import Menudco from "./Menudeco";
import Menuco from "./Menuco";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from "react-redux";

function Navbar() {
    const navigate = useNavigate();
    const [hasToken, setHasToken] = useState(false);
    const [dataRecherche, setDataRecherche] = useState(null)
    const [redirect, setRedirect] = useState(false);
    const profil = useSelector((state) => state.profil)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setHasToken(true);
        } else {
            setHasToken(false);
        }
    }, [localStorage.token]);
    const formik = useFormik({
        initialValues: {
            recherche: '',
        },
        validationSchema: Yup.object({
            recherche: Yup.string().required('Champ requis'),
        }),
        onSubmit: async values => {
            try {
                const response = await fetch('http://localhost:3001/recherche', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ recherche: values.recherche }),
                });
                if (response.ok) {
                    const data = await response.json();
                    setDataRecherche(data.resultats)
                    if (dataRecherche != null) {
                        navigate('/recherche', { state: { data: dataRecherche } })
                    }
                    console.log('Réponse du backend:', data);
                } else {
                    console.error('Échec de la requête vers le backend:', response.statusText);
                }
            } catch (error) {
                console.error('Erreur lors de la requête vers le backend:', error);
            }
        },
    });
    return (
        <nav>
            {/* Barre de navigation Côté GAUCHE */}
            <Link to="/">
                <div className="NavLeft">
                    <img src={logonavbar} alt="Logo" />
                </div>
            </Link>
            {/* Barre de navigation Côté CENTRE */}
            <div className="NavMid">
                <div className="searchBar">
                    <form className="apercu" onSubmit={formik.handleSubmit}>
                        <input
                            type="text"
                            id="recherche"
                            name="recherche"
                            placeholder="Recherche"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.recherche}
                        />
                        {formik.touched.recherche && formik.errors.recherche ? (
                            <div>{formik.errors.recherche}</div>
                        ) : null}
                        {/* Déplacez le bouton à l'intérieur du formulaire */}
                        <button className="search" type="submit">
                            <img src={recherche} alt="Recherche" />
                        </button>
                    </form>
                </div>
            </div>
            {/* Barre de navigation Côté DROIT */}
            <div className="NavRight">
                <div className="menuNav">
                    <div className="dropdown">
                        <input type="checkbox" id="dropdown" />
                        <label htmlFor="dropdown" className="dropdown-btn">
                            <div className="menuICON">
                                <img src={menu} alt="Menu" />
                            </div>
                        </label>
                        {hasToken ? <Menuco /> : <Menudco />}
                    </div>
                    {hasToken && (
                        <Link to='/profil'>
                            <div className="profilICON">
                                <img src={require(`../image/${profil}`)} alt='' />
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </nav >
    );
}

export default Navbar;