import { Autocomplete, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const Reservation = () => {
    const [selectedDateOption, setSelectedDateOption] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlots, setSelectedTimeSlots] = useState(null);
    const [selectedPersonCount, setSelectedPersonCount] = useState(null);

    const timeSlotsRef = useRef();
    const personCountRef = useRef();
    const dateRef = useRef();

    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    const handleChange = (date) => {
        setSelectedDateOption(date);
        const dateToBeFormatted = new Date(date);

        const day = ("0" + dateToBeFormatted.getDate()).slice(-2);
        const month = ("0" + (dateToBeFormatted.getMonth() + 1)).slice(-2);
        const year = dateToBeFormatted.getFullYear();

        const formattedDate = `${day}.${month}.${year}`;
        setSelectedDate(formattedDate);
    };

    const timeSlots = [
        "10:00-12:00",
        "12:00-14:00",
        "14:00-16:00",
        "16:00-18:00",
        "18:00-20:00",
        "20:00-22:00",
        "22:00-00:00"
    ];

    return (
        <div className='grid place-content-center '>
            <div className='w-[600px] h-[600px] flex flex-col justify-between gap-y-4 rounded-lg bg-white mt-12 p-8' style={{

                "& .react-datepicker-wrapper": {
                    width: "100% !important"
                }

            }}>
                <div className='flex flex-col gap-y-4'>
                    <Autocomplete options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]}
                        onChange={(_, selectedValue) => setSelectedPersonCount(selectedValue)}
                        renderInput={(params) => <TextField {...params} label="Person Count" />}
                    />
                    <div className='flex space-x-4 justify-between items-center'>
                        <DatePicker
                            selected={selectedDateOption}
                            onChange={handleChange}
                            minDate={today}
                            maxDate={maxDate}
                            placeholderText="Select the Date"
                            className='border-[1px] p-2 rounded-md w-full h-14 border-slate-400 hover:border-black'
                            dateFormat={"dd/MM/yyyy"}
                            isClearable
                        />
                        <Autocomplete options={timeSlots} className='w-full' ref={timeSlotsRef}
                            onChange={(_, selectedValue) => setSelectedTimeSlots(selectedValue)}

                            renderInput={(params) => <TextField {...params} label="Time Slots" />}
                        />
                    </div>
                </div>
                <button className='p-4 rounded-lg disabled:text-slate-700 disabled:bg-slate-300 disabled:hover:brightness-100 bg-rwSalmon hover:brightness-110 transition-all font-semibold text-lg bottom-0'
                    onClick={() => {
                        console.log(selectedDate, selectedPersonCount, selectedTimeSlots)

                    }}
                    disabled={!selectedDate || !selectedPersonCount || !selectedPersonCount}
                >Next</button>
            </div>

        </div>
    )
}

export default Reservation