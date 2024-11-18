import React, { useState } from "react";
import styles from "./ModalComponent.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // default styling
import TimeInput from '../components/ui/TimeInput'
import TATimeSlot from '../components/ui/TATimeSlot'
import Button from "../components/ui/Button"

function ModalComponent({closeModal}) {
    const [date, setDate] = useState(new Date());
    // Time Slot Choosing
    const [slots, setSlots] = useState({});
    const [startHour, setStartHour] = useState('');
    const [startMinute, setStartMinute] = useState('');
    const [startPeriod, setStartPeriod] = useState('AM');

    const [endHour, setEndHour] = useState('');
    const [endMinute, setEndMinute] = useState('');
    const [endPeriod, setEndPeriod] = useState('AM');

    const[error, setError] = useState('');

    const disableOtherMonthDays = ({ date, view }) => {
        if (view === "month") {
            const today = new Date();
            // Reset time to 12:00 AM for both dates to compare only the calendar day
            const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const dateToCheck = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
            if (dateToCheck < todayDateOnly) {
                return true; // Disable past dates
            }
    
            // Restrict to current and next month
            const currentMonth = today.getMonth();
            const nextMonth = (currentMonth + 1) % 12;
            const currentYear = today.getFullYear();
    
            if (
                date.getFullYear() === currentYear &&
                (date.getMonth() === currentMonth || date.getMonth() === nextMonth)
            ) {
                return false; // Allow dates in the current and next month
            } else if (
                date.getFullYear() === currentYear + 1 &&
                nextMonth === 0 &&
                date.getMonth() === 0
            ) {
                return false; // Allow January of the next year if current month is December
            }
    
            return true; // Disable all other dates
        }
        return false; // For other views (year, decade), don't disable anything
    };
        
    const addTimeSlot = () => {        
        if (startHour && startMinute && startPeriod && endHour && endMinute && endPeriod) {
            if (!isValidTime()) return;

            const startTime = `${startHour.padStart(2, "0")}:${startMinute.padStart(2, "0")} ${startPeriod}`;
            const endTime = `${endHour.padStart(2, "0")}:${endMinute.padStart(2, "0")} ${endPeriod}`;

            //selected date
            const dayofMonth = date.getDate();

            setSlots(prevDaySlots => {
                const currentDaySlots = prevDaySlots[dayofMonth] || [];
                return {
                    ...prevDaySlots,
                    [dayofMonth]: [...currentDaySlots, {start: startTime, end: endTime}]
                }
            })


            // Reset fields
            setStartHour("");
            setStartMinute("");
            setStartPeriod("AM");
            setEndHour("");
            setEndMinute("");
            setEndPeriod("AM");
        } else {
            setError('Please fill in all time fields');       
        }
    };

    const removeTimeSlot = (dayofMonth, slotIndex) => {
        setSlots(prevDaySlots => {
            const updatedSlots = [...prevDaySlots[dayofMonth]];
            updatedSlots.splice(slotIndex,1)

            //if no slot left for this data, remove the date key
            if (updatedSlots.length === 0) {
                const {[dayofMonth] : _,...rest} = prevDaySlots;
                return rest;
            }

            return {...prevDaySlots, [dayofMonth]:updatedSlots}
        })
    }

    const handleConfrim = () => {
        console.log("Data to be sent to database", slots);
    }

    //Time Validation Parts
    const convertTimeToMinutes = (hour, minute, period) => {
        let hours = parseInt(hour);
        const minutes=parseInt(minute)

        if (period == 'PM' && hours!== 12) {
            hours += 12;
        } else if (period === 'AM' && hours === 12) {
            hours = 0;
        }

        return hours*60 + minutes;
    }

    const isValidTime = () => {
        if (!startHour || !startMinute || !endHour || !endMinute) {
            setError("Please fill in all time fields");
            return false;
        }

        const startInMinutes = convertTimeToMinutes(startHour, startMinute, startPeriod);
        const endInMinutes = convertTimeToMinutes(endHour, endMinute, endPeriod);

        // Check if end time is before start time
        if (endInMinutes <= startInMinutes) {
            setError('End time must be after start time');
            return false;
        }

        const daySlots = slots[date.getDate()] || [];
        const hasOverlap = daySlots.some(slot => {
            const existingStart = convertTimeToMinutes(
                slot.start.split(':')[0],    //hour
                slot.start.split(':')[1].split(' ')[0],    //min
                slot.start.split(' ')[1]    //period
            );

            const existingEnd = convertTimeToMinutes(
                slot.end.split(':')[0],
                slot.end.split(':')[1].split(' ')[0],
                slot.end.split(' ')[1]
            );

            return (startInMinutes < existingEnd && endInMinutes > existingStart);
        })

        if (hasOverlap) {
            setError('Time slot overlaps with existing slot');
            return false;
        }

        setError('');
        return true;
        
    }
    

    return (
        <div className={`${styles.calendarWrapper}`}>
            <div>
                <Calendar
                    onChange={setDate}
                    value={date}
                    tileDisabled={disableOtherMonthDays}
                    maxDetail="month"
                    showDoubleView={false}
                    className={`${styles.customCalendar}`}
                />
            </div>
            <div className={`${styles.timeSlot}`}>
                <h3 className={`${styles.timeTitle}`}>
                    Choose Time Slots for{" "}
                    {date.toLocaleString("default", {
                        month: "long",
                        day: "2-digit",
                    })}{" "}
                </h3>
                <div className={`${styles.TimeBox}`}>
                    <div className={`${styles.startBox}`}>
                        <TimeInput
                            hour={startHour}
                            minute={startMinute}
                            period={startPeriod}
                            setHour={setStartHour}
                            setMinute={setStartMinute}
                            setPeriod={setStartPeriod}
                        />
                    </div>

                    <div className={`${styles.endBox}`}>
                        <TimeInput
                            hour={endHour}
                            minute={endMinute}
                            period={endPeriod}
                            setHour={setEndHour}
                            setMinute={setEndMinute}
                            setPeriod={setEndPeriod}
                        />
                    </div>
                </div>
                {error && <div className={styles.errorMessage}>{error}</div>}
                <button onClick={addTimeSlot} className={styles.addBtn}>
                    Add +
                </button>
            </div>
            <div className={styles.slotContainer}>
            {slots[date.getDate()]?.map((slot, index) => (
                <TATimeSlot
                    key={index}
                    start={slot.start}
                    end={slot.end}
                    onRemove={() => removeTimeSlot(date.getDate(), index)}
                />
            ))}

            </div>
            <div className={`${styles.btnWrapper}`}>
                <button  className={`${styles.cancleBtn}`} onClick={closeModal}>Cancle</button>
                <button  className={`${styles.confirmBtn}`} onClick={handleConfrim}>Confirm</button>
            </div>
        </div>
    );
}

export default ModalComponent;
