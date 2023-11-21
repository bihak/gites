const express = require("express");
const PORT = process.env.PORT || 3001;
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const bcryptjs = require("bcryptjs-react");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//conexion a la db
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "db_gites",
});
con.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à la base de données :", err);
    } else {
        console.log("Connexion à la base de données réussie");
    }
});
// test pour recuperer des donne de la bas
app.get('/gites', (req, res) => {
    const sql = `SELECT * FROM gite 
    JOIN gite_image ON gite.id = gite_image.Gite_id 
    JOIN localisation ON gite.localisation_id = localisation.id
    JOIN proprietaire p ON gite.Proprietaire_id = p.id; `;
    con.query(sql, (err, data) => {
        if (err) {
            console.log("err2 ", err)
            return res.json(err);
        }
        return res.json(data);

    })
})

// test pour recuperer des donne de la bas
app.get('/gites_acc', (req, res) => {
    const sql = `SELECT * FROM gite_accessibilite; `;
    con.query(sql, (err, data) => {
        if (err) {
            console.log("err2 ", err)
            return res.json(err);
        }
        return res.json(data);

    })
})

// test pour recuperer des donne de la bas
app.get('/gite_equipement', (req, res) => {
    const sql = `SELECT * FROM gite_equipement; `;
    con.query(sql, (err, data) => {
        if (err) {
            console.log("err2 ", err)
            return res.json(err);
        }
        return res.json(data);

    })
})

// test pour recuperer des donne de la bas
app.get('/langue', (req, res) => {
    const sql = `SELECT * FROM langue; `;
    con.query(sql, (err, data) => {
        if (err) {
            console.log("err2 ", err)
            return res.json(err);
        }
        return res.json(data);

    })
})

//rechercher dans la bas en fonction de la ville et pays 
app.post('/recherche', (req, res) => {
    const rechercheValue = req.body.recherche;
    const sql = `
        SELECT * FROM gite g 
        JOIN localisation l on g.Localisation_id = l.id
        JOIN gite_image gi on g.id = gi.Gite_id
        WHERE LOWER(l.adresse) LIKE LOWER('%${rechercheValue}%');
    `;

    con.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la recherche dans la base de données:', err);
            res.status(500).json({ error: 'Erreur lors de la recherche dans la base de données' });
        } else {
            res.json({ message: 'Recherche effectuée avec succès', resultats: results });
            console.log(results);
        }
    });
});


//recuperer la table equipement
app.get('/equipement', (req, res) => {
    const sql = `SELECT * FROM gite_equipement `;
    con.query(sql, (err, data) => {
        if (err) {
            console.log("err2 ", err)
            return res.json(err);
        }
        return res.json(data);

    })
})

//recuperere la table accessibilite
app.get('/accessibilite', (req, res) => {
    const sql = `SELECT * FROM gite_accessibilite`;
    con.query(sql, (err, data) => {
        if (err) {
            console.log("err2 ", err)
            return res.json(err);
        }
        return res.json(data);

    })
})

//recuperere la table langue
app.get('/langue', (req, res) => {
    const sql = `SELECT * FROM langue`;
    con.query(sql, (err, data) => {
        if (err) {
            console.log("err2 ", err)
            return res.json(err);
        }
        return res.json(data);

    })
})

//recuperere la table reservation
app.get('/reser', (req, res) => {
    const sql = `SELECT date_debut,date_fin,id FROM reservation`;
    con.query(sql, (err, data) => {
        if (err) {
            console.log("err2 ", err)
            return res.json(err);
        }
        return res.json(data);

    })
})

app.get("/user", (req, res) => {
    const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        console.log(decodedToken)
        const userId = decodedToken.userId;
        const sql2 = `SELECT * FROM gite g
        JOIN gite_image gm ON g.id = gm.Gite_id
        JOIN proprietaire p ON g.proprietaire_id = p.id
        JOIN localisation l ON g.localisation_id = l.id
        WHERE g.Utilisateur_id = ${userId}`;

        con.query(sql2, (err, giteData) => {
            if (err) {
                console.log("Erreur : ", err);
                return res.status(500).json({
                    success: false,
                    message:
                        "Erreur de récupération des données GITE",
                });
            }

            if (giteData.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Aucun gite trouvé pour cet utilisateur",
                });
            }
            const response = giteData

            return res.json(response);

        });


    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid token" });
    }
});

app.get("/useruser", (req, res) => {
    const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        console.log(decodedToken)
        const userId = decodedToken.userId;
        const sql = `SELECT * FROM utilisateur WHERE id = ${userId}`;

        con.query(sql, (err, userData) => {
            if (err) {
                console.log("Erreur : ", err);
                return res.status(500).json({
                    success: false,
                    message: "Erreur de récupération des données utilisateur",
                });
            }

            if (userData.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Utilisateur introuvable",
                });
            }
            const response = userData;
            return res.json(response);
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid token" });
    }
});

//verifier la conection
app.post("/Connexion", (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM utilisateur WHERE email = '${email}'`;
    con.query(sql, async (err, result) => {

        if (err) {
            console.log("err:", err)
        } else if (result.length === 1) {
            const storedHashedPassword = result[0].mot_de_passe;
            const passwordMatch = bcryptjs.compare(password, storedHashedPassword);
            if (passwordMatch) {
                const userId = result[0].id;
                const token = jwt.sign({ userId }, "RANDOM_TOKEN_SECRET", {
                    expiresIn: "24h",
                });
                res.json({ success: true, message: "Connexion réussie", token, userId });
            } else {
                res.json({
                    success: false,
                    message: "Informations de connexion invalides",
                });
            }
        } else {
            res.json({
                success: false,
                message: "Informations de connexion invalidessss",
            });
        }
    });
});

//inscription nouveaux utilisateur
app.post("/inscription", (req, res) => {
    const { email, password, nom, prenom, tel, pseudo, image } = req.body;
    const img = image.replace("C:\\fakepath\\", "");
    const sql = `INSERT INTO utilisateur (lien_avatar, email, mot_de_passe, nom, prenom, telephone, pseudo) VALUES 
    ('${img}','${email}', '${password}', '${nom}', '${prenom}', '${tel}', '${pseudo}')`;
    con.query(
        sql,
        [email, password, nom, prenom, tel, pseudo],
        (err, result) => {
            if (err) {
                console.error("Erreur lors de l'insertion des données :", err);
                res.json({
                    success: false,
                    message: "Erreur lors de l'enregistrement de l'utilisateur",
                });
            } else {
                res.json({
                    success: true,
                    message: "Utilisateur enregistré avec succès",
                });
            }
        }
    );
});

//Modifier utlisateur 
app.post("/save", (req, res) => {
    const { nom, prenom, email, telephone, userId, lien_avatar } = req.body;
    let fileName = '';
    if (lien_avatar) {
        fileName = lien_avatar.split('\\').pop();
    }
    let sql = "UPDATE `utilisateur` SET ";
    if (fileName) {
        sql += `lien_avatar = '${fileName}', `;
    }
    if (nom) {
        sql += `nom = '${nom}', `;
    }
    if (prenom) {
        sql += `prenom = '${prenom}', `;
    }
    if (email) {
        sql += `email = '${email}', `;
    }
    if (telephone) {
        sql += `telephone = '${telephone}', `;
    }
    if (sql.endsWith(", ")) {
        sql = sql.slice(0, -2);
    }
    sql += ` WHERE id = '${userId}'`;
    con.query(sql, (err, result) => {
        if (err) {
            console.error("Erreur lors de la modification des données :", err);
            res.json({
                success: false,
                message: "Erreur lors de modification des données",
            });
        } else {
            res.json({
                success: true,
                message: "Votre modification est enregistrée avec succès",
            });
        }
    });
});

//ajouter une reservation
app.post("/reservation", (req, res) => {
    const { Date_debut, Date_fin, prix_total, gite_id, user_id, paymentMethod_id } = req.body;
    const sql = `INSERT INTO reservation (Gite_id, Utilisateur_id, Moyen_paiement_id, date_debut, date_fin, prix_total) VALUES 
    ('${gite_id}', '${user_id}', '${paymentMethod_id}', '${Date_debut}', '${Date_fin}', '${prix_total}')`;
    con.query(
        sql,
        (err, result) => {
            if (err) {
                console.error("Erreur lors de l'insertion des données :", err);
                res.json({
                    success: false,
                    message: "Erreur lors de l'enregistrement de la reservation",
                });
            } else {
                res.json({
                    success: true,
                    message: "Votre reservation est enregistré avec succès",
                });
            }
        }
    );
});

//lire reservation en fonction d'un id
app.get('/resa', (req, res) => {
    const userId = req.query.userId;
    const sql = `
    SELECT r.date_debut, r.date_fin, r.prix_total, r.id, g.nom, gi.lien_image, lo.adresse
    FROM reservation r
    JOIN gite g ON r.Gite_id = g.id
    JOIN gite_image gi ON g.id = gi.Gite_id
    JOIN localisation lo ON g.Localisation_id = lo.id
    WHERE r.utilisateur_id = ${userId}`;

    con.query(sql, (err, data) => {
        if (err) {
            console.log("err2 ", err)
            return res.json(err);
        }
        return res.json(data);

    })
});

//lire reservation en fonction de l'id reservation pour pouvour la modifier
app.get('/reservation_edit', (req, res) => {
    const id = req.query.Id;
    const sql = `
    SELECT r.date_debut, r.date_fin, r.prix_total, r.id, g.nom, g.prix, g.description, gi.lien_image
    FROM reservation r
    JOIN gite g ON r.Gite_id = g.id
    JOIN gite_image gi ON g.id = gi.Gite_id
    WHERE r.id = ${id}`;

    con.query(sql, (err, data) => {
        if (err) {
            console.log("err2 ", err)
            return res.json(err);
        }
        return res.json(data);

    })
});

// supprimer gite
app.delete("/gite/:id", (req, res) => {
    const giteId = req.params.id;
    const query = `DELETE FROM db_gites.gite WHERE id = ?`;

    con.query(query, [giteId], (err, result) => {
        if (err) {
            console.error("Error deleting gite:", err);
            res.status(500).json({ message: "Internal Server Error" });
        } else if (result.affectedRows > 0) {
            res.status(200).json({ message: "Gite deleted successfully" });
        } else {
            res.status(404).json({ message: "Gite not found" });
            console.log("erreur")
        }
    });
});

//supprimer compte
app.delete('/delete-account', (req, res) => {
    const userId = req.body.userId; // Assuming you send the user ID in the request body
    const query = `DELETE FROM db_gites.utilisateur WHERE id = ?`;

    con.query(query, [userId], (err, result) => {
        if (err) {
            console.error("Error deleting user:", err);
            res.status(500).json({ message: "Internal Server Error" });
        } else if (result.affectedRows > 0) {
            res.status(200).json({ message: "user deleted successfully" });
        } else {
            res.status(404).json({ message: "user not found" });
            console.log("erreur")
        }
    });
    res.json({ success: true, message: 'Account deleted successfully' });
});

// supprimer reservation
app.delete("/reservation/:id", (req, res) => {
    const giteId = req.params.id;
    const query = `DELETE FROM db_gites.reservation WHERE id = ?`;

    con.query(query, [giteId], (err, result) => {
        if (err) {
            console.error("Error deleting gite:", err);
            res.status(500).json({ message: "Internal Server Error" });
        } else if (result.affectedRows > 0) {
            res.status(200).json({ message: "Gite deleted successfully" });
        } else {
            res.status(404).json({ message: "Gite not found" });
            console.log("erreur")
        }
    });
});

//ajou gites
app.post("/ajoutloc", (req, res) => {
    const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        const userId = decodedToken.userId;
        const {
            pro,
            siren,
            emailpro,
            telpro,
            titre,
            description,
            superficie,
            prix,
            adresse,
            photos,
            equipe,
            equipeAcc,
            langue,
            id_user
        } = req.body;
        let photo = photos.join(',');
        const langueQuery = `INSERT INTO langue (anglais, allemand, francais, italien, espagnol, arabe, portuguais, langue_des_signes) 
VALUES ('${langue.anglais}', '${langue.allemand}', '${langue.francais}', '${langue.italien}', '${langue.espagnol}', '${langue.arabe}', '${langue.portuguais}', '${langue.langue_des_signes}');`;

        con.query(langueQuery, (err, langueResult) => {
            if (err) {
                console.error(
                    "Erreur lors de l'insertion des données dans la table gite_langue :",
                    err
                );
                return res.json({
                    success: false,
                    message:
                        "Erreur lors de l'enregistrement des langue",
                });
            }
            const langueId = langueResult.insertId;

            const AccQuery = `INSERT INTO gite_accessibilite (Animaux_autorisés, Parking_Accessible, Parking_gratuit, Logement_fumeur, Arrivée_autonome, Piéces_de_plain_pied, Accees_sup_81, Barres_appui, \`Siége_de_douche_bain\`, \`Léve_personne\`)
        VALUES ('${equipeAcc.Animaux}', '${equipeAcc.Parking}', '${equipeAcc.Parking_gratuit}', '${equipeAcc.Fumeur}', '${equipeAcc.Autonome}', '${equipeAcc.Plain_pied}',
        '${equipeAcc.Accees_sup_81}', '${equipeAcc.Barres_appui}', '${equipeAcc.Siége_sb}', '${equipeAcc.Leve_personne}');
        `;
            con.query(AccQuery, (err, AccResult) => {
                if (err) {
                    console.error(
                        "Erreur lors de l'insertion des données dans la table gite_Acc :",
                        err
                    );
                    return res.json({
                        success: false,
                        message: "Erreur lors de l'enregistrement des Acc",
                    });
                }
                const AccId = AccResult.insertId;

                const equipementQuery = `INSERT INTO gite_equipement (wifi, fibre, Deconnecté, Ethernet, Climatisation, Chauffage, Cheminée, Cuisine_équipée, Espace_de_travail, 
            Télévision, Salle_de_sport, Pisine, Jacuzzi, Barbecue, Caméras_exterieures, Détecteur_de_fuméé, Détecteur_de_co2, Station_de_recharge, Reservation_instantanée, 
            Petit_dejeuner, Séche_cheveux, Fer_a_repasser, Séche_linge, Lave_linge)
            VALUES ('${equipe.wifi}', '${equipe.fibre}', '${equipe.Deconnecté}', '${equipe.Ethernet}', '${equipe.Climatisation}', '${equipe.Chauffage}', '${equipe.Cheminée}',
            '${equipe.Cuisine_équipée}', '${equipe.Espace_de_travail}', '${equipe.Télévision}', '${equipe.Salle_de_sport}', '${equipe.Pisine}', '${equipe.Jacuzzi}', 
            '${equipe.Barbecue}', '${equipe.Caméras_exterieures}', '${equipe.Détecteur_de_fuméé}', '${equipe.Détecteur_de_co2}', '${equipe.Station_de_recharge}', 
            '${equipe.Reservation_instantanée}', '${equipe.Petit_dejeuner}', '${equipe.Séche_cheveux}', '${equipe.Fer_a_repasser}', '${equipe.Séche_linge}', '${equipe.Lave_linge}')`;

                con.query(equipementQuery, (err, equipementResult) => {
                    if (err) {
                        console.error(
                            "Erreur lors de l'insertion des données dans la table equipement :",
                            err
                        );
                        return res.json({
                            success: false,
                            message: "Erreur lors de l'enregistrement des équipements",
                        });
                    }
                    const equipementId = equipementResult.insertId;

                    const localisationQuery = `INSERT INTO localisation (adresse) VALUES ('${adresse}')`;
                    con.query(localisationQuery, (err, localisationResult) => {
                        if (err) {
                            console.error(
                                "Erreur lors de l'insertion des données dans la table localisation :",
                                err
                            );
                            return res.json({
                                success: false,
                                message: "Erreur lors de l'enregistrement de la localisation",
                            });
                        }
                        const localisationId = localisationResult.insertId;

                        const proprietaire = `SELECT id from proprietaire WHERE Utilisateur_id = ${userId}`;
                        con.query(proprietaire, (err, proprietaireResult) => {
                            if (err) {
                                console.error(
                                    "Erreur lors de la sélection de l'ID utilisateur de la table proprietaire :",
                                    err
                                );
                                return res.json({
                                    success: false,
                                    message:
                                        "Erreur lors de la sélection de l'ID utilisateur de la table proprietaire",
                                });
                            }
                            if (proprietaireResult.length === 0) {
                                if (pro) {
                                    const proprietaireQuery = `INSERT INTO proprietaire (utilisateur_id, is_professionnel, siren, telephone_pro, email_pro) VALUES 
                                    (${userId}, ${pro}, '${siren}', '${telpro}', '${emailpro}')`;
                                    con.query(
                                        proprietaireQuery,
                                        (err, proprietaireResult) => {
                                            if (err) {
                                                console.error(
                                                    "Erreur lors de l'insertion des données dans la table proprietaire :",
                                                    err
                                                );
                                                return res.json({
                                                    success: false,
                                                    message:
                                                        "Erreur lors de l'enregistrement du propriétaire",
                                                });
                                            }
                                            const proprietaireId =
                                                proprietaireResult.insertId;
                                            const giteQuery = `INSERT INTO gite (nom, description, superficie, prix, Localisation_id, Gite_equipement_id, Proprietaire_id, gite_accessibilite_idGite_accessibilite,langue_id, utilisateur_id) 
                                            VALUES ('${titre}', '${description}', '${superficie}', '${prix}', '${localisationId}', '${equipementId}', '${proprietaireId}', ${AccId},${langueId}, ${id_user})`;
                                            con.query(giteQuery, (err, giteResult) => {
                                                if (err) {
                                                    console.error(
                                                        "Erreur lors de l'insertion des données dans la table gite :",
                                                        err
                                                    );
                                                    return res.json({
                                                        success: false,
                                                        message:
                                                            "Erreur lors de l'enregistrement du gîte",
                                                    });
                                                }
                                                const giteId = giteResult.insertId;
                                                const photoQuery = `INSERT INTO gite_image (lien_image, Gite_id) VALUES ('${photo}', '${giteId}')`;
                                                con.query(
                                                    photoQuery,
                                                    (err, photoResult) => {
                                                        if (err) {
                                                            console.error(
                                                                "Erreur lors de l'insertion des données dans la table gite_image :",
                                                                err
                                                            );
                                                            return res.json({
                                                                success: false,
                                                                message:
                                                                    "Erreur lors de l'enregistrement des images",
                                                            });
                                                        }
                                                        return res.json({
                                                            success: true,
                                                            message:
                                                                "Images enregistrées avec succès",
                                                        });
                                                    }
                                                );
                                            });
                                        }
                                    );
                                } else {
                                    const proprietaireQuery = `INSERT INTO proprietaire (utilisateur_id, is_professionnel, siren, telephone_pro, email_pro) VALUES 
                                    (${userId},0,'','','')`;
                                    con.query(
                                        proprietaireQuery,
                                        (err, proprietaireResult) => {
                                            if (err) {
                                                console.error(
                                                    "Erreur lors de l'insertion des données dans la table proprietaire :",
                                                    err
                                                );
                                                return res.json({
                                                    success: false,
                                                    message:
                                                        "Erreur lors de l'enregistrement du propriétaire",
                                                });
                                            }
                                            const proprietaireId =
                                                proprietaireResult.insertId;
                                            const giteQuery = `INSERT INTO gite (nom, description, superficie, prix, Localisation_id, Gite_equipement_id, Proprietaire_id, gite_accessibilite_idGite_accessibilite, langue_id, utilisateur_id ) 
                                            VALUES ('${titre}', '${description}', '${superficie}', '${prix}', '${localisationId}', '${equipementId}', '${proprietaireId}', ${AccId}, ${langueId}, ${id_user})`;
                                            con.query(giteQuery, (err, giteResult) => {
                                                if (err) {
                                                    console.error(
                                                        "Erreur lors de l'insertion des données dans la table gite :",
                                                        err
                                                    );
                                                    return res.json({
                                                        success: false,
                                                        message:
                                                            "Erreur lors de l'enregistrement du gîte",
                                                    });
                                                }
                                                const giteId = giteResult.insertId;

                                                const photoQuery = `INSERT INTO gite_image (lien_image, Gite_id) VALUES ('${photo}', '${giteId}')`;
                                                con.query(photoQuery, (err, photoResult) => {
                                                    if (err) {
                                                        console.error(
                                                            "Erreur lors de l'insertion des données dans la table gite_image :",
                                                            err
                                                        );
                                                        return res.json({
                                                            success: false,
                                                            message:
                                                                "Erreur lors de l'enregistrement des images",
                                                        });
                                                    }
                                                    return res.json({
                                                        success: true,
                                                        message:
                                                            "Images enregistrées avec succès",
                                                    });
                                                });
                                            });
                                        });
                                }
                            } else {
                                const proprietaire_id_existe = proprietaireResult[0].id;
                                const giteQuery = `
                                                INSERT INTO gite 
                                                (nom, description, superficie, prix, Localisation_id, Gite_equipement_id, 
                                                Proprietaire_id, gite_accessibilite_idGite_accessibilite, langue_id, utilisateur_id ) 
                                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                                                `;

                                const giteValues = [titre, description, superficie, prix, localisationId, equipementId, proprietaire_id_existe, AccId, langueId, id_user];

                                con.query(giteQuery, giteValues, (err, giteResult) => {
                                    if (err) {
                                        console.error("Erreur lors de l'insertion des données dans la table gite :", err);
                                        return res.json({
                                            success: false,
                                            message: "Erreur lors de l'enregistrement du gîte",
                                        });
                                    }

                                    const giteId = giteResult.insertId;
                                    const photoQuery = `INSERT INTO gite_image (lien_image, Gite_id) VALUES (?, ?)`;
                                    const photoValues = [photo, giteId];

                                    con.query(photoQuery, photoValues, (err, photoResult) => {
                                        if (err) {
                                            console.error("Erreur lors de l'insertion des données dans la table gite_image :", err);
                                            return res.json({
                                                success: false,
                                                message: "Erreur lors de l'enregistrement des images",
                                            });
                                        }

                                        return res.json({
                                            success: true,
                                            message: "Images enregistrées avec succès",
                                        });
                                    });
                                });

                            }
                        });
                    });
                });
            });
        });
    } catch (err) {
        console.error("Erreur lors de la vérification du token :", err);
        return res.status(500).json({
            success: false,
            message: "Failed to authenticate token",
        });
    }
});


// ajout commentaire
app.post("/commentaire", (req, res) => {
    const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        const userId = decodedToken.userId;
        const { titre, description, note } = req.body;
        const giteId = "1";
        let locataire_id = "7";

        let valNote = ["1", "2", "3", "4", "5"];
        if (!valNote.includes(note)) {
            return res.json({
                success: false,
                message: "la note doit être comprise entre 1 et 5",
            });
        }

        // Utilisateur_id du proprietaire du gite.id
        const utilisateur_idGite = `SELECT Utilisateur_id FROM proprietaire INNER JOIN gite ON proprietaire.id = gite.Proprietaire_id WHERE gite.id = '${giteId}'`;

        con.query(
            utilisateur_idGite,
            (err, utilisateur_idProprietaireResult) => {
                if (err) {
                    console.error(
                        "Erreur lors de la sélection de utilisateur_id de la table proprietaire :",
                        err
                    );
                    return res.json({
                        success: false,
                        message:
                            "Erreur lors de la sélection de utilisateur_id de la table proprietaire",
                    });
                }
                let util_idPropGite =
                    utilisateur_idProprietaireResult[0].Utilisateur_id;

                const proprietaire = `SELECT id FROM proprietaire WHERE Utilisateur_id = ${userId}`;
                con.query(proprietaire, (err, proprietaireResult) => {
                    if (err) {
                        console.error(
                            "Erreur lors de la sélection de utilisateur_id dans la table proprietaire :",
                            err
                        );
                        return proprietaireResult.json(err);
                    }

                    if (proprietaireResult.length === 0) {
                        // Message rédigé par le locataire

                        const Redac_locataire_id = userId;
                        Destinataire_id = util_idPropGite;

                        const commentaireQuery = `INSERT INTO commentaire (titre, description, note, date_redaction, Gite_id, Redac_locataire_id, Destinataire_id ) VALUES ('${titre}', '${description}', '${note}',NOW() , ${giteId}, '${Redac_locataire_id}', '${Destinataire_id}')`;

                        con.query(
                            commentaireQuery,
                            (err, resultatCommentaire) => {
                                if (err) {
                                    return res.json(err);
                                }

                                return res.json({
                                    success: true,
                                    message: "Commentaire enregistré",
                                });
                            }
                        );
                    } else {
                        // Message rédigé par le propriétaire

                        Destinataire_id = locataire_id;
                        const Redac_proprietaire_id = userId;

                        const commentaireQuery = `INSERT INTO commentaire (titre, description, note, date_redaction, Gite_id, Redac_proprietaire_id, Destinataire_id ) VALUES ('${titre}', '${description}', '${note}',NOW() , ${giteId}, '${Redac_proprietaire_id}', '${Destinataire_id}')`;

                        con.query(
                            commentaireQuery,
                            (err, resultatCommentaire) => {
                                if (err) {
                                    return res.json(err);
                                }
                                return res.json({
                                    success: true,
                                    message: "Commentaire enregistré",
                                });
                            }
                        );
                    }
                });
            }
        );
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
});


app.post("/reservation", (req, res) => {
    const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        const userId = decodedToken.userId;
        const { date_debut, date_fin, prix_total } = req.body;
        const giteId = "17";
        const Moyen_paiement_id = "1";

        const Utilisateur_id = userId;

        if (date_debut < date_fin) {
            const giteFree = `SELECT id, date_debut, date_fin  FROM reservation WHERE gite_id = ${giteId} AND (date_debut BETWEEN   '${date_debut}' AND '${date_fin}' OR date_fin BETWEEN   '${date_debut}' AND '${date_fin}')`;

            con.query(giteFree, (err, gitePeriodeResult) => {
                if (err) {
                    console.error(
                        "Erreur lors de la sélection de data dans la table reservation :",
                        err
                    );
                    return proprietaireResult.json(err);
                }

                if (gitePeriodeResult.length > 0) {
                    return res.json({
                        success: false,
                        message: "Période déjà reservée",
                    });
                } else {
                    const Reservation = `INSERT INTO reservation (date_debut, date_fin, prix_total, Gite_id, Utilisateur_id, Moyen_paiement_id ) VALUES ('${date_debut}', '${date_fin}', '${prix_total}', ${giteId}, '${Utilisateur_id}', '${Moyen_paiement_id}')`;

                    con.query(Reservation, (err, resultatReservation) => {
                        if (err) {
                            return res.json(err);
                        }

                        return res.json({
                            success: true,
                            message: "Réservation enregistrée",
                        });
                    });
                }
            });
        } else {
            return res.json({
                success: false,
                message:
                    "Erreur la date_fin doit être supérieure à la date_debut",
            });
        }
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
});

app.listen(PORT, () => {
    console.log(`mon backend : ${PORT}`);
});
