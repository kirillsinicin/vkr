import React, { useState } from 'react';
import { Button, Col, Image, Modal, Row } from 'react-bootstrap';
import { createReview } from '../../http/reviewAPI';
import star from '../../starSvg.svg'
import Star from '../Star';

const NewRatingModal = ({ show, onHide, executorId, taskId }) => {
    const [rating, setRating] = useState(0)
    const [stars, setStars] = useState([{ isHovered: false }, { isHovered: false }, { isHovered: false }, { isHovered: false }, { isHovered: false }])

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

    const onStarMouseOver = (index) => {
        const newStars = stars.map((item, itemIndex) => {
            if (itemIndex <= index) {
                return { ...item, isHovered: true }
            }
            return { ...item }
        })
        setStars(newStars)
    }

    const onStarMouseOut = (index) => {
        const newStars = stars.map((item, itemIndex) => {
            if (itemIndex <= index) {
                return { ...item, isHovered: false }
            }
            return { ...item }
        })
        setStars(newStars)
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
                <Row style={{ paddingBottom: 50, paddingTop: 50 }}>
                    {stars.map((item, index) => {
                        return <Col style={{padding: 0}} key={index}>
                            <Star
                                isActive={(rating >= index + 1) || item.isHovered}
                                onClick={() => setRating(index + 1)}
                                index={index}
                                onMouseOver={onStarMouseOver}
                                onMouseOut={onStarMouseOut}
                            />

                        </Col>
                    })}
                </Row>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={sendReview}>Отправить отзыв</Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    );
};

export default NewRatingModal;