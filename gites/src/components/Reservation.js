import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../style/gites_reservation.css";
import Navbar from './Navbar';
import Footer from "./Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactModal from 'react-modal';
import Payment from "./Payment";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Connexion from "./Connexion";

function Reservation() {
    const { id } = useParams();
    console.log(id)
    const [date_debut, setDate_debut] = useState("");
    const [date_fin, setDate_fin] = useState("");
    const [prix_total, setPrix_total] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [gitesData, setGitesData] = useState([]);
    const [reservation, setReservation] = useState([])
    const [counts, setCounts] = useState([0, 0, 0, 0]);
    const [nightCount, setNightCount] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [hasToken, setHasToken] = useState(false);
    const today = new Date();

    const userId = localStorage.userId


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setHasToken(true);
        } else {
            setHasToken(false);
        }
    }, []);

    useEffect(() => {
        // Fetch des gîtes
        fetch('http://localhost:3001/gites')
            .then(response => response.json())
            .then(data => {
                setGitesData(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        // Fetch des réservations
        fetch('http://localhost:3001/reser')
            .then(response => response.json())
            .then(data => {
                setReservation(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const getReservedDates = () => {
        const reservedDates = [];

        gitreservation.forEach(reservation => {
            const start = new Date(reservation.date_debut);
            start.setDate(start.getDate() + 1); // Ajoute un jour à la date de début
            const end = new Date(reservation.date_fin);

            // Ajoute toutes les dates entre date_debut et date_fin à reservedDates
            for (let current = start; current <= end; current.setDate(current.getDate() + 1)) {
                reservedDates.push(new Date(current));
            }
        });

        return reservedDates;
    };

    const gitreservation = Array.isArray(reservation) ? reservation.filter(res => res.Gite_id === id) : [];

    gitreservation.forEach(reservation => {
        const dateDebut = new Date(reservation.date_debut);
        const formattedDateDebut = dateDebut.toISOString().split('T')[0];

        const dateFin = new Date(reservation.date_fin);
        const formattedDateFin = dateFin.toISOString().split('T')[0];

        reservation.date_debut = formattedDateDebut;
        reservation.date_fin = formattedDateFin;
    });



    const handleStartDateChange = (date) => {
        if (date >= today) {
            setStartDate(date);
            setDate_debut(formatDate(date));
        }
    };

    const handleEndDateChange = (date) => {
        if (date >= startDate) {
            setEndDate(date);
            setDate_fin(formatDate(date));
            const timeDiff = date - startDate;
            const newNightCount = Math.round(timeDiff / (1000 * 60 * 60 * 24)); // Convertit la différence de temps en nombre de nuits
            setNightCount(newNightCount); // Met à jour nightCount avec la nouvelle valeur
            setPrix_total(newNightCount * gite.prix); // Met également à jour le prix total
        }
    }

    const increment = (index) => {
        const newCounts = [...counts];
        newCounts[index] += 1;
        setCounts(newCounts);
    };

    const decrement = (index) => {
        const newCounts = [...counts];
        if (newCounts[index] > 0) {
            newCounts[index] -= 1;
            setCounts(newCounts);
        }
    };

    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Les mois commencent à 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const validateForm = () => {
        const cgvChecked = document.getElementById('demo1')?.checked;
        const annulationChecked = document.getElementById('demo2')?.checked;
        const datesSelected = startDate !== null && endDate !== null;
        const isPriceValid = prix_total > 0;
        const atLeastOneAdult = counts[0] > 0;
        return datesSelected && isPriceValid && cgvChecked && annulationChecked && atLeastOneAdult;
    };

    const gite = gitesData.find(item => item.id === Number(id));

    const openModal = () => {
        setModalIsOpen(true);
        if (hasToken && validateForm()) {
            setModalIsOpen(true);
        }
    };

    const closeModal = () => {
        if (hasToken) {
            setModalIsOpen(false)
        }
    };
    return (
        <PayPalScriptProvider options={{
            "client-id": "AQlqSyJ2QR1N2a4whs9dpTCsbkY83-DmwF6uaNqiLR6pjmfVNyg7y1eSS5zk4CFn9Wq38gwQ-G9n414N",
            currency: "EUR"
        }}>
            <div className="discription_gite">
                <Navbar />
                <div>
                    <h1 className="titre_gite_discription">Procéder à la reservation</h1>
                </div>
                <div>
                    <div className="calendrier">
                        <div className="arriver">
                            <h3>Date d'arrivée</h3>
                            <DatePicker
                                className="calandrier_cal"
                                dateFormat="dd/MM/yyyy"
                                selected={startDate}
                                onChange={handleStartDateChange}
                                minDate={today}
                                excludeDates={getReservedDates()}
                            />
                        </div>
                        <div className="depart">
                            <h3>Date de départ</h3>
                            <DatePicker
                                className="calandrier_cal"
                                dateFormat="dd/MM/yyyy"
                                selected={endDate}
                                onChange={handleEndDateChange}
                                minDate={startDate || today}
                                excludeDates={getReservedDates()}
                            />
                        </div>
                    </div>
                    <h1 className="titre_gite_discription">Nombre de Voyageurs</h1>
                    <div className="voyageur">
                        <div className="nombre_persson">
                            <h4>Adulte</h4>
                            <h4>Enfants</h4>
                            <h4>Bébés</h4>
                            <h4>Animaux</h4>
                        </div>
                        <div className="nombre_persson">
                            {counts.map((count, index) => (
                                <div className="bouton" key={index}>
                                    <button onClick={() => decrement(index)}>-</button>
                                    <h3>{count}</h3>
                                    <button onClick={() => increment(index)}>+</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <h1 className="titre_gite_discription">Prix du Sejour</h1>
                    <div className="prix">
                        {gite && (
                            <h3>Prix a la nuit: {gite.prix} €</h3>
                        )}
                        {nightCount != null ? (
                            <h3>Nombre de Nuitées: {nightCount} nuits</h3>
                        ) : (
                            <h3>Nombre de Nuitées: 0 nuits</h3>
                        )}
                        <h2>Total: {prix_total} €</h2>
                    </div>
                    <h1 className="titre_gite_discription">Conditions D'annulation</h1>
                    <div className="condition">
                        <p>Vous pouvez annuler à tout moment, sans frais,
                            et ce jusqu’à 24H avant la date de début de réservation. Ce délais dépassé,
                            en cas d’annulation, la moitié de la somme totale de la réservation vous seront prélevés.</p>
                    </div>
                    <div className="chek">
                        <div className="chek_fin">
                            <input type="checkbox" class="demo2" id="demo2" />
                            <label for="demo2">Vous acceptez les Conditions d'annulation</label>
                        </div>
                        <div className="chek_fin">
                            <input type="checkbox" class="demo1" id="demo1" />
                            <label for="demo1">Vous acceptez les CGV</label>
                        </div>
                    </div>
                    <div className="reserv">
                        <ReactModal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={{
                                overlay: {
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                },
                                content: {
                                    width: '720px',
                                    height: '750px',
                                    margin: 'auto',
                                    background: '#ffffff',
                                    border: 'none'
                                },
                            }}
                        >
                            {hasToken ?
                                <Payment
                                    date_debut={date_debut}
                                    date_fin={date_fin}
                                    prix_total={prix_total}
                                    gite_id={id}
                                    user_id={userId}
                                /> :
                                <Connexion />
                            }
                        </ReactModal >
                        <button className="Reservation bouton" onClick={openModal} disabled={!validateForm()}>
                            Reglement
                        </button>

                    </div>
                </div>
                <Footer />
            </div>
        </PayPalScriptProvider>
    );
}

export default Reservation;