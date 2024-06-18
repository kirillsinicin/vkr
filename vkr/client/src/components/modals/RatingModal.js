import React, { useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { createReview } from '../../http/reviewAPI';

const RatingModal = ({ show, onHide, executorId, taskId }) => {
    const [rating, setRating] = useState(0)


    const sendReview = (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('rating', rating)
        formData.append('executorId', executorId)
        formData.append('taskId', taskId)
        createReview(formData)
            .then(review => {
                onHide()
            })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Отзыв об исполнителе
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup>
                    <InputGroup.Text className="mt-3" id="inputGroup-sizing-default">
                        Оценка
                    </InputGroup.Text>
                    <Form.Control
                        aria-describedby="inputGroup-sizing-default"
                        value={rating}
                        onChange={e => setRating(Number(e.target.value))}
                        className="mt-3"
                        type="number"
                    />
                </InputGroup>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={sendReview}>Отправить отзыв</Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    );
};

export default RatingModal;