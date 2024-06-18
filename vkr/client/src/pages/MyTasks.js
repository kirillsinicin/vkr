import React, { useContext, useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { fetchTasksWhereUserExecutor, fetchTasksWhereUserOwner } from '../http/taskAPI';
import { Context } from '..';
import { Col, Container, Row } from 'react-bootstrap';
import TaskList from '../components/TaskList';
import AcceptanceList from '../components/AcceptanceList';


const OWNER_STATE = 'ownerTasks'
const EXECUTOR_STATE = 'executorTasks'
const ACCEPTANCE_STATE = 'acceptance'

const MyTasks = () => {
    const { taskStore } = useContext(Context)
    const [key, setKey] = useState(OWNER_STATE);

    useEffect(() => {
        switch (key) {
            case OWNER_STATE:
                fetchTasksWhereUserOwner(taskStore.page, taskStore.limit)
                    .then(data => {
                        taskStore.setTasks(data.rows)
                        taskStore.setTotalCount(data.count)
                    })
                break

            case EXECUTOR_STATE:
                fetchTasksWhereUserExecutor(taskStore.page, taskStore.limit)
                    .then(data => {
                        taskStore.setTasks(data.rows)
                        taskStore.setTotalCount(data.count)
                    })
                break
        }
    }, [key, taskStore, taskStore.page])

    return (
        <Container className="mt-3" style={{paddingBottom:50, paddingTop:50}}>
            <Row>
                <Col>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey={OWNER_STATE} title="Я заказчик">
                            <TaskList />
                        </Tab>
                        <Tab eventKey={EXECUTOR_STATE} title="Я исполнитель">
                            <TaskList />
                        </Tab>
                        <Tab eventKey={ACCEPTANCE_STATE} title="Приём работы">
                            <AcceptanceList/>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>

        </Container>
    );
};

export default MyTasks;