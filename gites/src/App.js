import Connexion from "./components/Connexion";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Connexiongood from "./components/Connexiongood";
import Home from "./components/Home";
import Homee from "./components/Homee";
import Inscription from "./components/Inscription";
import Ajoutloc from "./components/Ajoutloc";
import Modal from "react-modal";
import Commmentaire from "./components/Commentaire";
import Reservation from "./components/Reservation";
import Equipement from "./components/Equipement";
import Accessibilite from "./components/Accessibilite"
import Langue from "./components/Langue"
import Gestionannance from "./components/Gestionannance";
import Gites from "./components/Gites";
import Erreur404 from "./components/Erreur404";
import Payment from "./components/Payment";
import Profil from "./components/Profil";
import annance from "./components/Annonce";
import Historique from "./components/Historique";
import Edit_resa from "./components/Edit_resa";
import Recherche from "./components/Recherche";


function App() {
    Modal.setAppElement("#root");
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" Component={Home} />
                    <Route path="/homee" Component={Homee} />
                    <Route path="/Connexion" Component={Connexion} />
                    <Route path="/Connexiongood" Component={Connexiongood} />
                    <Route path="/Inscription" Component={Inscription} />
                    <Route path="/Ajoutloc" Component={Ajoutloc} />
                    <Route path="/Commentaire" Component={Commmentaire} />
                    <Route path="/Reservation/:id" Component={Reservation} />
                    <Route path="/Payment" Component={Payment} />
                    <Route path="/equipement" Component={Equipement} />
                    <Route path="/accessibilite" Component={Accessibilite} />
                    <Route path="/langue" Component={Langue} />
                    <Route path="/gestionannance" Component={Gestionannance} />
                    <Route path="/annance" Component={annance} />
                    <Route path="/gites/:id" Component={Gites} />
                    <Route path="/profil" Component={Profil} />
                    <Route path="/historique" Component={Historique} />
                    <Route path="/edit_resa/:id" Component={Edit_resa} />
                    <Route path="//recherche" Component={Recherche} />
                    <Route path="/erreur" Component={Erreur404} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
