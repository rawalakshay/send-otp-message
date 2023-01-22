import React, { useState, useEffect } from "react";
import CardComponent from "./Card";
import ModalComponent from "./Modal";
import { Card, Grid, Text, Row, Button } from "@nextui-org/react";
import contact_list from "../data/contact_list.json"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import twilio from 'twilio';
// const client = new twilio('AC29cc0ebc7abb98cb612055a8d2872bc2', '1872a21f2fbf92e81e7732a0bf52f699');

const App = () => {

    const [modalVisible, setModalVisible] = useState(false)
    const [contactDetails, setcontactDetails] = useState({
        id: "",
        first_name: "",
        last_name: "",
        phone_number: ""
    })
    const [TextareaVal, setTextareaVal] = useState("Hi. Your OTP is: 123456")

    const showModalFn = (contact) => {

        setTextareaVal('Hi. Your OTP is: ' + Math.floor(100000 + Math.random() * 900000))

        const { id, first_name, last_name, phone_number } = contact;
        setModalVisible(true);

        setcontactDetails({
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number
        });

    }

    const closeModalFn = () => {
        setModalVisible(false);
    }

    const getTextareaData = async (textArea) => {
        sendMessage(contactDetails.phone_number, TextareaVal);
    }

    const sendMessage = async (phone_number, message) => {
        console.log('phone_number :>>', phone_number);
        console.log('message :>>', message);

        let sendData = { phone: phone_number, message: message }

    await axios.post('/api/sendMessage', sendData)
        .then(res => {
            console.log('res :>>', res)
            if (res.data.success) {
                toast.success('OTP sent successfully!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }

            if (!res.data.success) {
                toast.error('Error while sending OTP!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        });

    // const res = await fetch('/api/sendMessage', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ phone: phone_number, message: message }),
    // });
    // console.log('res :>>', res);


}

return (
    <>
        <ToastContainer />
        <div className="grid-bottom-padding">
            <Grid sm={16} md={12}>
                <div className="grid-container">

                    {contact_list.map((contact, i) => (
                        <div key={i} className="grid-item">
                            <CardComponent className="grid-item" contactDetails={contact} firstName={contact.first_name} lastName={contact.last_name} phone={contact.phone_number} showModal={showModalFn} />
                        </div>
                    ))}

                </div>

            </Grid>
        </div>

        <div>
            <ModalComponent visible={modalVisible} closeModal={closeModalFn} name={contactDetails.first_name} sendData={getTextareaData} textArea={TextareaVal} />
        </div>
    </>
)
}

export default App;