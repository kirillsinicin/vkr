import React, { useContext, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import TaskList from "../components/TaskList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchTasks, fetchTypes } from "../http/taskAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const { taskStore } = useContext(Context)

    useEffect(() => {
        fetchTypes()
            .then(data => taskStore.setTypes(data))

        fetchTasks(taskStore.selectedType.id, taskStore.page, taskStore.limit)
            .then(data => {
                taskStore.setTasks(data.rows)
                taskStore.setTotalCount(data.count)
            })
    }, [taskStore.selectedType.id, taskStore, taskStore.page])

    return (
        <Container className="mt-3" style={{paddingBottom:50, paddingTop:50}}>
            <Row>
                <Col md={3} className="mt-3">
                    <TypeBar />
                </Col>
                <Col md={9} className="mt-3">
                    <TaskList />
                    <Pages />                        
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
