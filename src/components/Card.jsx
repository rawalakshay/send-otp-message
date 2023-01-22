import { Card, Grid, Text, Button, Row } from "@nextui-org/react";
import ModalComponent from "./Modal";

export default function CardComponent(props) {

    return (
        <Card css={{ mw: "330px" }}>
            <Card.Header>
                <Text b>{props.firstName} {props.lastName}</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: "$5" }}>
                <Text>{props.phone}</Text>
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
                <Row justify="flex-end">
                    <Button size="sm" onClick={() => props.showModal(props.contactDetails)}>Send Message</Button>
                </Row>
            </Card.Footer>
        </Card>
    );
}
