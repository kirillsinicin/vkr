import React, {useContext} from 'react';
import {Context} from "../index";
import { Button, Card, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom"
import { TASK_ROUTE } from "../utils/consts";
import { deleteTask } from "../http/taskAPI";

const TaskItem = ({ task }) => {
    const { userStore, taskStore } = useContext(Context)
    const history = useHistory()

    const handleOnDeleteClick = (event, taskId) => {
        event.stopPropagation();
        
        deleteTask(taskId)
            .then(data => {
                taskStore.setTasks(taskStore.tasks.filter(task => task.id !== taskId))
            })
            .catch(err => {
                console.err(err);
            });
    };

    return (
        <Col md={4} className={"mb-3"} onClick={() => history.push(TASK_ROUTE + '/' + task.id)}>
            <Card border="secondary" style={{ cursor: 'pointer' }}>
                <Card.Header>Задание №{task.id}</Card.Header>
                <Card.Body>
                    <Card.Title>{task.name}</Card.Title>
                    <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <div>{task.price}  ₽</div>
                        </div>
                    </div>
                    {userStore.isAdmin ? (<Button onClick={ (event) => handleOnDeleteClick(event, task.id) }>Удалить</Button>) : <></>}
                </Card.Body>
            </Card>
        </Col>

    );
};

export default TaskItem;
