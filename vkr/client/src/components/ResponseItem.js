import React, { useState } from 'react';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PROFILE_ROUTE } from '../utils/consts';
import { asignTaskExecutor } from '../http/taskAPI';

const ResponseItem = ({ response }) => {
    const [isButtonActive, setIsButtonActive] = useState(response.user.id !== response.task.executorId)
    const profile = response.user.profile

    const handleOnChooseExecutorClick = (event, response) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('executorId', response.user.id)

        asignTaskExecutor(response.task.id, formData)
            .then(data => {
                setIsButtonActive(false)
            })
    };

    return (
        <ListGroup.Item>
            <Row>
                <Col>
                    <Link to={`${PROFILE_ROUTE}/${profile.id}`}>{profile.name} {profile.surname}</Link>
                </Col>
                <Col>
                    <Button
                        onClick={(event) => {
                            handleOnChooseExecutorClick(event, response)
                        }}
                        disabled={!isButtonActive}
                    >
                        Назначить
                    </Button>
                </Col>
            </Row>

        </ListGroup.Item>
    );
};

export default ResponseItem;