import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Context } from "../index";
import { useParams } from 'react-router-dom'
import { fetchOneTask } from "../http/taskAPI";
import { fetchOneProfile } from "../http/profileAPI";
import { PROFILE_ROUTE } from '../utils/consts';
import { useHistory } from "react-router-dom"
import ProfileCard from '../components/ProfileCard';
import { createResponse, fetchResponseByTaskId } from '../http/responseAPI';
import ResponseList from '../components/ResponseList';
import { createAcceptance, search } from '../http/taskAcceptanceAPI';

const TaskPage = () => {
    const [task, setTask] = useState({ info: [] })
    const { userStore } = useContext(Context)
    const history = useHistory()
    const { id } = useParams()

    const [responses, setResponses] = useState([])

    const [profile, setProfile] = useState({
        "name": "",
        "surname": "",
        "img": "https://placehold.co/400"
    });
    const [isProfileLoading, setIsProfileLoading] = useState(true);

    const [isApplyButtonActive, setIsApplyButtonActive] = useState(false)
    const [isSendAcceptButtonActive, setIsSendAcceptButtonActive] = useState(false)

    useEffect(() => {
        fetchOneTask(id)
            .then(task => {
                setTask(task)

                fetchOneProfile(task.ownerId)
                    .then(profile => {
                        setProfile({
                            ...profile,
                            img: process.env.REACT_APP_API_URL + profile.img
                        })
                        setIsProfileLoading(false);
                    })

                fetchResponseByTaskId(task.id)
                    .then(responsesData => {
                        //если id текущего юзера совпадает с любым юзер id внутри отклика, то задизейблить кнопку
                        const currentUserResponse = responsesData.find((item) => {
                            return item.userId === userStore.user.id
                        })
                        setIsApplyButtonActive(currentUserResponse === undefined)
                        //сохранить в сторе записи откликов по таск id
                        setResponses(responsesData)
                    })
                if (task.executorId) {
                    search(task.id, task.executorId)
                        .then(taskAcceptance => {
                            taskAcceptance ? setIsSendAcceptButtonActive(false) : setIsSendAcceptButtonActive(true)
                        })
                }
            })
    }, [id])

    const handleOnApplyClick = (event, taskId) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('taskId', taskId)

        createResponse(formData)
            .then(data => {
                setIsApplyButtonActive(false)
            })
    };

    const handleOnSendAcceptClick = (event, taskId) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('taskId', taskId)

        createAcceptance(formData)
            .then(data => {
                setIsSendAcceptButtonActive(false)
            })
    };

    return (
        <Container className="mt-3" style={{ paddingBottom: 50, paddingTop: 50 }}>
            <Row className="d-flex flex-column m-3">
                <h1>Описание</h1>
                {task.info.map((info, index) =>
                    <Row key={info.id} style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
            <Row>
                <Col md={4} onClick={() => history.push(PROFILE_ROUTE + '/' + profile.id)}>
                    {isProfileLoading ? <></> : <ProfileCard profile={profile} />}
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{ width: 300, height: 300, border: '5px solid lightgray' }}
                    >
                        <Card.Title>Бюджет: {task.price} ₽</Card.Title>
                        {
                            userStore.user.id !== task.ownerId
                                ?
                                <Button
                                    variant={"outline-dark"}
                                    onClick={(event) => handleOnApplyClick(event, task.id)}
                                    disabled={!isApplyButtonActive}
                                >
                                    Откликнуться
                                </Button>
                                :
                                <></>
                        }
                        {
                            userStore.user.id !== task.ownerId && userStore.user.id == task.executorId
                                ?
                                <Button
                                    variant={"outline-dark"}
                                    onClick={(event) => handleOnSendAcceptClick(event, task.id)}
                                    disabled={!isSendAcceptButtonActive}
                                >
                                    Сдать работу
                                </Button>
                                :
                                <></>
                        }
                    </Card>
                </Col>
                <Col md={4}>
                    {
                        userStore.user.id === task.ownerId
                            ?
                            <ResponseList responses={responses} />
                            :
                            <></>
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default TaskPage;
