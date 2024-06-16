import React, { useState } from 'react';
import { Button, ListGroup, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PROFILE_ROUTE } from '../utils/consts';
import { asignTaskExecutor } from '../http/taskAPI';

const ResponseItem = ({response}) => {
    const [isButtonActive, setIsButtonActive] = useState(response.user.id!==response.task.executorId)
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
            <Link to={`${PROFILE_ROUTE}/${profile.id}`}>{profile.name} {profile.surname}</Link>
            <Button 
                onClick={(event) => {
                    handleOnChooseExecutorClick(event, response)
                    //у таска executorId = response.user.id
                }}
                disabled={!isButtonActive}
            >
                Назначить
            </Button>
        </ListGroup.Item>
    );
};

export default ResponseItem;