import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

function Recherch() {
    const location = useLocation();
    const dataRecherche = location.state?.data;
    const verif = false ? dataRecherche.lenght === 0 : true
    return (
        <div>
            <Navbar />
            {verif ?
                <div className="git">
                    <h1 className="titre_gite">Nos gîtes</h1>
                    <div className="gites">
                        {dataRecherche.map(gite => (
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
                </div> :
                <h1 className="titre_gite">Pas de résultat pour votre recherche</h1>
            }
        </div>
    )
}
export default Recherch;