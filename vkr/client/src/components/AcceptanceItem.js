import React, { useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';

const AcceptanceItem = ({acceptance, showRatingModal}) => {
    return (
        <ListGroup.Item>
            <p>Заказ №{acceptance.taskId} готов.</p>
            <Button
                onClick={(event) => showRatingModal(event, acceptance.executorId, acceptance.taskId)}
            >
                Принять работу
            </Button>
        </ListGroup.Item>
    );
};

export default AcceptanceItem;