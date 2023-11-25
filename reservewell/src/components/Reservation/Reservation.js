import React, { useState } from 'react'
import { Alert, Autocomplete, CircularProgress, Snackbar, TextField } from '@mui/material'
import DatePicker from "react-datepicker";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import db from "../../firebase/config";
import { collection, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';


import "react-datepicker/dist/react-datepicker.css";
const Reservation = (props) => {
    const [selectedDateOption, setSelectedDateOption] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [selectedPersonCount, setSelectedPersonCount] = useState(null);
    const [currentReservationStep, setCurrentReservationStep] = useState(0);
    const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = useState(false);
    const [isErrorSnackbarOpen, setIsErrorSnackbarOpen] = useState(false);
    const [submitButtonText, setSubmitButtonText] = useState("Confirm & Reserve");
    const [formValues, setFormValues] = useState({});
    const router = useRouter();

    const reservationsCollectionRef = collection(db, 'reservations');

    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        surname: yup.string().required("Surname is required"),
        email: yup.string().required("e-mail is required").email("Please enter a valid e-mail"),
        phoneNumber: yup.string().required("Phone number is required"),
    });
    const methods = useForm({
        resolver: yupResolver(schema)
    });
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

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSuccessSnackbarOpen(false);
        setIsErrorSnackbarOpen(false);
    };

    const onSubmit = async (data) => {

        if (currentReservationStep === 1) {
            setFormValues({ ...data })
            setCurrentReservationStep(2);
            return;
        }

        setSubmitButtonText(
            <CircularProgress
                size={18}
                thickness={6}
                className="text-white"
                sx={{
                    color: '#FFF',
                }}
            />
        );
        try {
            const reservationsRef = doc(reservationsCollectionRef);
            const reqBody = {
                created_at: new Date(),
                group_size: selectedPersonCount,
                time_slot: selectedTimeSlot,
                date: selectedDate,
                notes: data.message || "",
                restaurant_id: props?.restaurantId,
                status: ["created"],
                user_id: "",
                name: data.name,
                surname: data.surname,
                phone_number: data.phoneNumber,
                email: data.email

            }
            await setDoc(reservationsRef, reqBody);
            setSubmitButtonText("Confirm & Reserve");
            setIsSuccessSnackbarOpen(true);
            setTimeout(() => router.push("/"), 2500)
        }
        catch (error) {
            setIsErrorSnackbarOpen(true);
            setSubmitButtonText("Confirm & Reserve");
        }
    };

    return (
        <div>
            <Snackbar
                open={isSuccessSnackbarOpen}
                autoHideDuration={2500}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity="success"
                    className="items-center text-lg font-semibold"
                >
                    Reservation Successful!
                </Alert>
            </Snackbar>
            <Snackbar
                open={isErrorSnackbarOpen}
                autoHideDuration={2500}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity="error"
                    className="items-center text-lg font-semibold"
                >
                    Something went wrong. Please try again.
                </Alert>
            </Snackbar>
            <form onSubmit={methods.handleSubmit(onSubmit)} className='grid place-content-center '>
                {currentReservationStep === 0 && <div className='w-[600px] h-[600px] flex flex-col justify-between gap-y-4 rounded-lg bg-white mt-12 p-8' >
                    <div className='flex flex-col gap-y-4'>
                        <h2 className='font-semibold text-2xl'>Reservation Information</h2>
                        <Autocomplete name="personCount" options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]}
                            onChange={(_, selectedValue) => setSelectedPersonCount(selectedValue)}
                            value={selectedPersonCount || ""}
                            renderInput={(params) => <TextField {...params}
                                label="Person Count" />}
                        />
                        <div className='flex space-x-4 justify-between items-center'>
                            <DatePicker
                                selected={selectedDateOption}
                                name='date'
                                onChange={handleChange}
                                minDate={today}
                                maxDate={maxDate}
                                placeholderText="Select the Date"
                                className='border-[1px] p-2 rounded-md w-full h-14 border-slate-400 hover:border-black'
                                dateFormat={"dd/MM/yyyy"}
                                // isClearable
                                value={selectedDate ? selectedDateOption : null}
                            />
                            <Autocomplete name="timeSlot" value={selectedTimeSlot || ""} options={timeSlots} className='w-full'
                                onChange={(_, selectedValue) => setSelectedTimeSlot(selectedValue)}

                                renderInput={(params) => <TextField {...params} label="Time Slots" />}
                            />
                        </div>
                    </div>


                    <div className='flex items-center space-x-8 justify-between'>
                        <button className='p-4 w-full rounded-lg  bg-rwCadetGray hover:brightness-110 transition-all font-semibold text-lg bottom-0'
                            onClick={() => router.push("/")}
                        >
                            Cancel
                        </button>
                        <button className='p-4 w-full rounded-lg disabled:text-slate-600 disabled:bg-slate-300 disabled:hover:brightness-100 bg-rwSalmon hover:brightness-110 transition-all font-semibold text-lg bottom-0'
                            onClick={() => setCurrentReservationStep(1)}
                            disabled={!selectedDate || !selectedPersonCount || !selectedTimeSlot}
                        >
                            Next
                        </button>
                    </div>



                </div>}
                {
                    currentReservationStep === 1 && <div className='w-[600px] min-h-[600px] flex flex-col justify-between gap-y-4 rounded-lg bg-white mt-12 p-8' >
                        <div className='flex flex-col gap-y-4'>
                            <h2 className='font-semibold text-2xl'>Contact Information</h2>
                            <div className='flex space-x-6'>
                                <div className='flex space-x-1'><b>Date:</b> <p>{selectedDate}</p></div>
                                <div className='flex space-x-1'><b>Time Slot:</b> <p>{selectedTimeSlot}</p> </div>
                                <div className='flex space-x-1'> <b>Table for:</b> <p>{selectedPersonCount} people</p></div>
                            </div>
                            <div className='flex space-x-4'>
                                <TextField label="Name"
                                    name='name'
                                    type='text'
                                    className='w-full'
                                    {...methods.register('name')}
                                    error={methods.formState.errors.name}
                                    helperText={methods.formState.errors?.name?.message}
                                    inputProps={{
                                        maxLength: 30
                                    }}
                                />
                                <TextField label="Surname"
                                    name='surname'
                                    type='text'
                                    className='w-full'
                                    {...methods.register('surname')}
                                    error={methods.formState.errors.surname}
                                    helperText={methods.formState.errors?.surname?.message}
                                    inputProps={{
                                        maxLength: 30
                                    }}
                                />
                            </div>
                            <TextField label="e-mail"
                                name='email'
                                className='w-full'
                                error={methods.formState.errors.email}
                                helperText={methods.formState.errors?.email?.message}
                                {...methods.register('email')}

                            />
                            <TextField label="Phone Number"
                                name='phoneNumber'
                                placeholder='555 555 55 55'
                                className='w-full'
                                error={methods.formState.errors.phoneNumber}
                                helperText={methods.formState.errors?.phoneNumber?.message}
                                {...methods.register('phoneNumber')}
                                inputProps={{
                                    maxLength: 30
                                }}
                            />
                            <TextField label="Message (optional)"
                                name='message'
                                type='text'
                                multiline
                                className='w-full'
                                {...methods.register('message')}
                                inputProps={{
                                    maxLength: 1000
                                }}
                            />

                        </div>
                        <div className='flex items-center space-x-8 justify-between'>
                            <button className='p-4 w-full rounded-lg  bg-rwCadetGray hover:brightness-110 transition-all font-semibold text-lg bottom-0'
                                onClick={() => setCurrentReservationStep(0)}
                            >
                                Back
                            </button>
                            <button className='p-4 w-full text-white rounded-lg disabled:text-slate-600 disabled:bg-slate-300 disabled:hover:brightness-100 bg-rwScarlet font-semibold text-lg bottom-0'
                                type='submit'
                            >
                                Make Reservation
                            </button>
                        </div>
                    </div>
                }
                {
                    currentReservationStep === 2 &&
                    <div className='w-[600px] min-h-[600px] flex flex-col justify-between gap-y-4 rounded-lg bg-white mt-12 p-8'
                        style={{
                            "& .Mui-disabled": {
                                color: "black",
                                WebkitTextFillColor: "black"
                            }
                        }}
                    >
                        <div className='flex flex-col gap-y-4'>
                            <h2 className='font-semibold text-2xl'>Confirm Reservation</h2>
                            <div className='flex space-x-4'>
                                <TextField label="Date"
                                    name='dateConfirm'
                                    type='text'
                                    className='w-full'
                                    value={selectedDate}
                                    disabled

                                />
                                <TextField label="Time Slot"
                                    name='timeSlotConfirm'
                                    type='text'
                                    className='w-full'
                                    value={selectedTimeSlot}
                                    disabled
                                />
                            </div>
                            <TextField label="Person Count"
                                name='personCountConfirm'
                                className='w-full'
                                value={selectedPersonCount}
                                disabled
                            />
                            <div className='flex space-x-4'>
                                <TextField label="Name"
                                    name='nameConfirm'
                                    type='text'
                                    className='w-full'
                                    value={formValues.name}
                                    disabled

                                />
                                <TextField label="Surname"
                                    name='surnameConfirm'
                                    type='text'
                                    className='w-full'
                                    value={formValues.surname}
                                    disabled

                                />
                            </div>
                            <TextField label="e-mail"
                                name='emailConfirm'
                                className='w-full'
                                value={formValues.email}
                                disabled
                            />
                            <TextField label="Phone Number"
                                name='phoneNumberConfirm'
                                className='w-full'
                                value={formValues.phoneNumber}
                                disabled

                            />
                            <TextField label="Message (optional)"
                                name='message'
                                type='text'
                                multiline
                                className='w-full'
                                value={formValues.message || " "}
                                disabled
                            />

                            {/* <div><Checkbox className=''/></div> */}
                        </div>
                        <div className='flex items-center space-x-8 justify-between'>
                            <button className='p-4 w-full rounded-lg  bg-rwCadetGray hover:brightness-110 transition-all font-semibold text-lg bottom-0'
                                onClick={() => setCurrentReservationStep(1)}
                            >
                                Back
                            </button>
                            <button type='submit' className='p-4 w-full text-white rounded-lg disabled:text-slate-600 disabled:bg-slate-300 disabled:hover:brightness-100 bg-rwScarlet hover:brightness-125 hover:scale-105 transition-all font-semibold text-lg bottom-0'

                                disabled={!selectedDate || !selectedPersonCount || !selectedTimeSlot}
                            >
                                {submitButtonText}
                            </button>
                        </div>
                    </div>
                }

            </form >
        </div >
    )
}

export default Reservation