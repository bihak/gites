import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import { Link, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import axios from 'axios';

function Edit_resa() {
    const param = useParams()
    const [dataReservation, setDataReservation] = useState(null)
    const [date_debut, setDate_debut] = useState();
    const [date_fin, setDate_fin] = useState();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reservation, setReservation] = useState([])
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);


    const handleStartDateChange = (date) => {
        setStartDate(date);
        // Vous pouvez également faire d'autres choses ici en réponse au changement de date
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        // Vous pouvez également faire d'autres choses ici en réponse au changement de date
    };
    useEffect(() => {
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

    const gitreservation = Array.isArray(reservation) ? reservation.filter(res => res.id != param.id) : [];

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


    useEffect(() => {
        axios.get('http://localhost:3001/reservation_edit', {
            params: {
                Id: param.id,
            }
        })
            .then(response => {
                setDataReservation(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);
    const resa = dataReservation && dataReservation[0]

    const lienImages = dataReservation && dataReservation.length > 0 ? dataReservation[0].lien_image.split(',') : [];

    return (
        <div>
            <Navbar />
            <div className="gites">
                {resa && (
                    <div className="gite_discription" key={resa.id}>
                        <div className="titre">
                            <h1 className="titre_gite_discription">Modification date d'arriver et départ</h1>
                        </div>
                        <div className="calendrier">
                            <div className="arriver">
                                <h3>Date d'arrivée</h3>
                                <DatePicker
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
                                    dateFormat="dd/MM/yyyy"
                                    selected={endDate}
                                    onChange={handleEndDateChange}
                                    minDate={startDate || today}
                                    excludeDates={getReservedDates()}
                                />
                            </div>
                        </div>
                        <div className="titre">
                            <h1 className="titre_gite_discription">{resa.nom}</h1>
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
                            <h3 className="gite_discription-info">Prix de la nuit {resa.prix} euro</h3>
                            <h3 className="gite_discription-info">Prix de la nuit {resa.prix_total} euro</h3>
                        </div>
                        <div className="titre">
                            <h1 className="titre_gite_discription">Description</h1>
                        </div>
                        <div>
                            <p> {resa.description}</p>
                        </div>
                        <div className="reserv">
                            <Link to={``}>
                                <button className="Reservation bouton" >
                                    Modifier
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}
export default Edit_resa;
