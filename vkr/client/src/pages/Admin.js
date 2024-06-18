import React, { useState } from 'react';
import { Button, Col, Container, Row } from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateTaskStatus from '../components/modals/CreateTaskStatus';
import PieChart from '../components/PieChart';

const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false)
    const [taskStatusVisible, setTaskStatusVisible] = useState(false)
    const [notifyVisible, setNotifyVisible] = useState(false)


    return (
        <Container
            className="d-flex flex-column"
            style={{ paddingBottom: 50, paddingTop: 50 }}
        >
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setTypeVisible(true)}
            >
                Добавить категорию
            </Button>
            <Row>
                <Col md={4}>
                    <PieChart />
                </Col>
                {/* <Col md={4}>
                    <PieChart />
                </Col> */}
            </Row>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
            <CreateTaskStatus show={taskStatusVisible} onHide={() => setTaskStatusVisible(false)} />
        </Container>
    );
};

export default Admin;
