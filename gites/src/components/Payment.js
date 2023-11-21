import { useState } from "react";
import React from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import "../style/payment.css"


function Payment({ date_debut, date_fin, prix_total, gite_id, user_id }) {

    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [SuccessMessage, setSuccessMessage] = useState('');
    const [paymentMethod_id, setPaymentMethod_id] = useState(0);

    function convertDate(inputDate) {
        const [day, month, year] = inputDate.split('/');
        const jsDate = new Date(`${month}/${day}/${year}`);
        const formattedDate = jsDate.toLocaleDateString('en-CA');
        return formattedDate;
    }

    const Date_debut = convertDate(date_debut);
    const Date_fin = convertDate(date_fin);

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: prix_total,
                    },
                },
            ],
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture()
            .then(function (details) {
                setPaymentSuccess(true);
                if (data.paymentSource === 'card') {
                    setPaymentMethod_id(2);
                } else {
                    setPaymentMethod_id(2);
                }

            })
            .catch(function (error) {
                console.error("Capture error", error);
                setPaymentSuccess(false);
            });
    };
    if (paymentSuccess) {
        (async () => {
            try {
                const response = await axios.post(
                    "http://localhost:3001/reservation",
                    { Date_debut, Date_fin, prix_total, gite_id, user_id, paymentMethod_id }
                );
                const { success, message } = response.data;
                if (success) {
                    setSuccessMessage(message);
                } else {
                    setSuccessMessage(message);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }
    return (
        <div>
            <h1 className="titre_gite_discription">
                Réglement
            </h1>
            {paymentSuccess ? (
                <div className="payment_reussi">
                    <h3>{SuccessMessage}</h3>
                </div>
            ) : ( // Affiche le div "en_payment" si paymentSuccess est false
                <div className="en_payment">
                    <h3>Total à payer : {prix_total}€</h3>
                    <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
                </div>
            )}
        </div>
    );
}

export default Payment;