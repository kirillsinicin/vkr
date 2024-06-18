import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateTaskStatus from '../components/modals/CreateTaskStatus';
import PieChart from '../components/PieChart';
import { fetchTaskByStatus, fetchTaskByType } from '../http/statisticAPI';

const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false)
    const [taskStatusVisible, setTaskStatusVisible] = useState(false)
    const [statisticTypes, setStatisticTypes] = useState([])
    const [statisticStatuses, setStatisticStatuses] = useState([])

    useEffect(() => {
        fetchTaskByStatus()
            .then(data => {
                setStatisticStatuses(data)
            })

        fetchTaskByType()
            .then(data => {
                setStatisticTypes(data)
            })
    }, [])

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
                <Col md={6}>
                    <PieChart chartData = {statisticTypes}/>
                </Col>
                <Col md={6}>
                    <PieChart chartData = {statisticStatuses} />
                </Col>
            </Row>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
            <CreateTaskStatus show={taskStatusVisible} onHide={() => setTaskStatusVisible(false)} />
        </Container>
    );
};

export default Admin;
