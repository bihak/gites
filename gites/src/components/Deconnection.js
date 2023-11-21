import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/desconnexion.css";


function Deconnection(props) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUserData(null);
        navigate("/");
    };

    const handleCloseModal = () => {
        props.onCancel();
    };
    return (
        <div className="deco">
            <h1 className="attention">
                Attention
            </h1>
            <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <div className="bouton_deconexion">
                <button className="annuler" onClick={handleCloseModal}>
                    Annuler
                </button>
                <button className="deconnexion" onClick={handleLogout}>
                    Déconnexion
                </button>
            </div>
        </div>
    );
}

export default Deconnection;