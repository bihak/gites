import React, { useEffect, useState } from "react";

function Accessibilite(props) {
    const [columnNames, setColumnNames] = useState([]);
    const [checkboxValues, setCheckboxValues] = useState({});

    useEffect(() => {
        fetch("http://localhost:3001/accessibilite")
            .then((response) => response.json())
            .then((data) => {
                const columns = Object.keys(data[0]).filter((column) => column !== "idGite_accessibilite");
                setColumnNames(columns);
            })
            .catch((error) => {
                console.error("Erreur :", error);
            });
    }, []);

    const formatColumnName = (columnName) => {
        return columnName.replace(/_/g, " ");
    };

    const handleColumnCheckboxChange = (e) => {
        const columnName = e.target.value;
        const isChecked = e.target.checked;
        setCheckboxValues((prevState) => ({
            ...prevState,
            [columnName]: isChecked ? 1 : 0,
        }));
        props.handleCheckboxChange(e);
    };

    const isColumnSelected = (columnName) => {
        return checkboxValues[columnName] === 1;
    };

    return (
        <div className="big_box">
            <h2>Accessibilité</h2>
            <div className="box_box">
                <div className="boxx">
                    {columnNames.map((column) => (
                        <div key={column} className="checkbox-wrapper-16">
                            <label className="checkbox-wrapper">
                                <input
                                    type="checkbox"
                                    className="checkbox-input"
                                    value={column}
                                    checked={isColumnSelected(column)}
                                    onChange={handleColumnCheckboxChange}
                                />
                                <span className="checkbox-tile">
                                    <span className="checkbox-icon">
                                        <img src={require(`../img/${column}.png`)} alt={column} />
                                    </span>
                                    <span className="checkbox-label">{formatColumnName(column)}</span>
                                </span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Accessibilite;