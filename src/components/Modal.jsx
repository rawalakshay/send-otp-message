import { Modal, Button, Text, Textarea } from "@nextui-org/react";
import React, { useState, useEffect } from "react";

export default function ModalComponent(props) {

    const [textArea, setTextArea] = useState('');

    const getTextareaValue = (event) => {
        setTextArea(event.target.value);
    }

    const sendData = () => {
        props.sendData(textArea)
    }

    return (
        <Modal
            closeButton
            blur
            preventClose
            aria-labelledby="modal-title"
            open={props.visible}
            onClose={() => { props.closeModal() }}
        >
            <Modal.Header>
                <Text b size={18}>
                    Send Message to {props.name}
                </Text>
            </Modal.Header>
            <Modal.Body>
                <Textarea
                    label="Your message"
                    placeholder="Enter your message here"
                    readOnly
                    value={props.textArea}
                    onChange={getTextareaValue}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onClick={() => { props.closeModal() }}>
                    Close
                </Button>
                <Button auto onClick={sendData} onPress={() => { props.closeModal() }}>
                    Send
                </Button>
            </Modal.Footer>
        </Modal>
    )

}