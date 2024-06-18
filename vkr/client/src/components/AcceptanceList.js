import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../index";
import { ListGroup } from 'react-bootstrap';
import AcceptanceItem from './AcceptanceItem';
import { fetchTaskAcceptancesByTaskOwner } from '../http/taskAcceptanceAPI';
import RatingModal from './modals/RatingModal';

const AcceptanceList = () => {
    const [acceptanceList, setAcceptanceList] = useState([])
    const [ratingModalShow, setRatingModalShow] = useState(false)
    const [executorId, setExecutorId] = useState(null)
    const [taskId, setTaskId] = useState(null)
    const { userStore } = useContext(Context)

    const showRatingModal = (event, executorId, taskId) => {
        event.preventDefault()
        setRatingModalShow(true)
        setExecutorId(executorId)
        setTaskId(taskId)
    }

    useEffect(() => {
        fetchTaskAcceptancesByTaskOwner(userStore.user.id)
            .then(taskAcceptances => {
                setAcceptanceList(taskAcceptances)
            })
    }, [])

    const hideRatingModal = () => {
        fetchTaskAcceptancesByTaskOwner(userStore.user.id)
            .then(taskAcceptances => {
                setAcceptanceList(taskAcceptances)
                setRatingModalShow(false)
            })      
    }

    return (
        <>
            <ListGroup>
                {acceptanceList.map(acceptance =>
                    <AcceptanceItem key={acceptance.id} acceptance={acceptance} showRatingModal={showRatingModal} />
                )}
            </ListGroup>
            <RatingModal
                executorId={executorId}
                taskId={taskId}
                show={ratingModalShow}
                onHide={hideRatingModal}
            />
        </>
    );
};

export default AcceptanceList;