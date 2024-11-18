import React from "react";
import styles from "./TimeInput.module.css";

function TimeInput({ hour, minute, period, setHour, setMinute, setPeriod }) {
    const handleHourChange = (e) => {
        const value = e.target.value;
        // Only allow numbers between 1-12
        if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 12)) {
            setHour(value);
        }
    };

    const handleMinuteChange = (e) => {
        const value = e.target.value;
        // Only allow numbers between 0-59
        if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 59)) {
            setMinute(value);
        }
    };


    return (
        <div className={styles.timeInput}>
            <input
                type="text"
                maxLength="2"
                value={hour}
                onChange={handleHourChange}
                placeholder="HH"
                className={styles.input}
            />
            <span className={styles.separator}>:</span>
            <input
                type="text"
                maxLength="2"
                value={minute}
                onChange={handleMinuteChange}
                placeholder="MM"
                className={styles.input}
            />
            <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className={styles.select}
            >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
        </div>
    );
}

export default TimeInput;