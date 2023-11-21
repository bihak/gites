import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/histo_resa.css'
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";

function Histo_resa() {
    const userId = localStorage.userId;
    const today = new Date();
    const [dataReservation, setDataReservation] = useState(null);
    const [confirmation, setConfirmation] = useState(false);
    let reservationsAvantAujourdhui = [];
    let reservationsAPartirAujourdhui = [];
    const navigate = useNavigate();

    const handleModifier = (reservationId) => {
        navigate(`/edit_resa/${reservationId}`);
    };

    useEffect(() => {
        axios.get('http://localhost:3001/resa', {
            params: {
                userId: userId,
            }
        })
            .then(response => {
                setDataReservation(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [confirmation]);
    const handleSupprimer = (giteId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this reservation?");
        if (isConfirmed) {
            axios.delete(`http://localhost:3001/reservation/${giteId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    setDataReservation(prevData => ({
                        ...prevData,
                        filter: reservation => reservation.id !== giteId
                    }));
                    setConfirmation(true);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    if (dataReservation != null) {
        // Filtrer les réservations en fonction des dates
        reservationsAPartirAujourdhui = dataReservation.filter(reservation => new Date(reservation.date_debut) >= today);
        reservationsAvantAujourdhui = dataReservation.filter(reservation => new Date(reservation.date_debut) < today - 1);

        reservationsAPartirAujourdhui = Array.isArray(reservationsAPartirAujourdhui) ? reservationsAPartirAujourdhui : [];
        reservationsAvantAujourdhui = Array.isArray(reservationsAvantAujourdhui) ? reservationsAvantAujourdhui : [];

        reservationsAPartirAujourdhui.sort((a, b) => new Date(a.date_debut) - new Date(b.date_debut));
        reservationsAvantAujourdhui.sort((a, b) => new Date(b.date_debut) - new Date(a.date_debut));
    }
    console.log(reservationsAPartirAujourdhui)

    return (
        <div className='resa_prochainement'>
            <div className='resa_historique'>
                <div className='resa_box'>
                    <div className='gite_titre-resa'><h1 >Réservations à venir</h1></div>
                    <ul>
                        <li className='gite_nom'><h3>Gite</h3></li>
                        <li className='gite_prix'><h3>Prix</h3></li>
                        <li className='gite_arriver'><h3>Date d'arriver</h3></li>
                        <li className='gite_depart'><h3>Date de départ</h3></li>
                        <li className='gite_adresse'><h3>Ville / Pays</h3> </li>
                    </ul>
                    {reservationsAPartirAujourdhui.map(reservation => (
                        <ul key={reservation.id}>
                            <li className='gite_nom' key={reservation.id}>{reservation.nom}</li>
                            <li className='gite_prix' key={reservation.id}>{reservation.prix_total} €</li>
                            <li className='gite_arriver' key={reservation.id}>{reservation.date_debut.split("T")[0]}</li>
                            <li className='gite_depart' key={reservation.id}>{reservation.date_fin.split("T")[0]}</li>
                            <li className='gite_adresse' key={reservation.id}>{reservation.adresse}</li>
                            <li>
                                <button onClick={() => handleModifier(reservation.id)}><AiOutlineEdit /></button>
                                <button onClick={() => handleSupprimer(reservation.id)}><MdOutlineDeleteOutline /></button>
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
            <div className='resa_box'>
                <div className='gite_titre-resa'><h1 >Historique des réservations</h1></div>
                <ul>
                    <li className='gite_nom'><h3>Gite</h3></li>
                    <li className='gite_prix'><h3>Prix</h3></li>
                    <li className='gite_arriver'><h3>Date d'arriver</h3></li>
                    <li className='gite_depart'><h3>Date de départ</h3></li>
                    <li className='gite_adresse'><h3>Ville / Pays </h3></li>
                </ul>
                {reservationsAvantAujourdhui.map(reservation => (
                    <ul key={reservation.id}>
                        <li className='gite_nom' key={reservation.id}>{reservation.nom}</li>
                        <li className='gite_prix' key={reservation.id}>{reservation.prix_total} €</li>
                        <li className='gite_arriver' key={reservation.id}>{reservation.date_debut.split("T")[0]}</li>
                        <li className='gite_depart' key={reservation.id}>{reservation.date_fin.split("T")[0]}</li>
                        <li className='gite_adresse' key={reservation.id}>{reservation.adresse}</li>
                        <li>
                            <button onClick={() => handleModifier(reservation.id)}><AiOutlineEdit /></button>
                            <button onClick={() => handleSupprimer(reservation.id)}><MdOutlineDeleteOutline /></button>
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    );
}

export default Histo_resa;
