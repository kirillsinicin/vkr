import React, { useState, useContext, useEffect } from 'react';
import { Container, Form, InputGroup, Button, Row, Col, Image } from 'react-bootstrap';
import { fetchOneProfile, updateProfile } from '../http/profileAPI';
import { Context } from '..';
import { v4 as uuidv4 } from 'uuid';
import star from '../assets/star.png'

const MyProfile = () => {
    const { userStore } = useContext(Context)

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [city, setCity] = useState('')
    const [description, setDescription] = useState('')
    const [userContacts, setUserContacts] = useState([])
    const [image, setImage] = useState(null)
    const [imageSrc, setImageSrc] = useState('')
    const [rating, setRating] = useState(0)

    useEffect(() => {
        fetchOneProfile(userStore.user.id)
            .then(data => {
                syncStateWithBackend(data)
            })
    }, [userStore.user.id])

    const updateUserProfile = () => {
        const formData = new FormData()

        formData.append('name', name)
        formData.append('surname', surname)
        formData.append('city', city)
        formData.append('description', description)
        formData.append('contacts', JSON.stringify(userContacts))
        formData.append('img', image)

        updateProfile(userStore.user.id, formData)
            .then(data => {
                syncStateWithBackend(data)
            })
    }

    const syncStateWithBackend = (data) => {
        data.name && setName(data.name);
        data.surname && setSurname(data.surname);
        data.city && setCity(data.city);
        data.description && setDescription(data.description);
        data.userContacts && setUserContacts(data.userContacts);
        data.img && setImageSrc(`${process.env.REACT_APP_API_URL}${data.img}`);
        data.rating && setRating(parseFloat(data.rating).toFixed(2))
    }

    const addContact = () => {
        setUserContacts([...userContacts, { title: '', description: '', id: uuidv4() }])
    }
    const removeContact = (userContactId) => {
        setUserContacts(userContacts.filter(i => i.id !== userContactId))
    }
    const changeContact = (key, value, userContactId) => {
        setUserContacts(userContacts.map(i => i.id === userContactId ? { ...i, [key]: value } : i))
    }

    return (
        <Container className="mt-3" style={{ paddingBottom: 50, paddingTop: 50 }}>
            <Form>
                <Row>
                    <Col>
                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>
                                <Image
                                    fluid
                                    src={imageSrc === "" ? "https://placehold.co/400" : imageSrc}
                                    className="mt-3"
                                />
                                <div className="d-flex align-items-center">
                                    <div>Рейтинг: {rating}</div>
                                    <Image width={18} height={18} src={star} />
                                </div>
                            </Form.Label>
                            <Form.Control
                                type="file"
                                onChange={e => {
                                    const reader = new FileReader();
                                    reader.readAsDataURL(e.target.files[0]);
                                    reader.onload = function (e) {
                                        setImageSrc(this.result)
                                    }

                                    setImage(e.target.files[0])
                                }}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <InputGroup className="my-3">
                            <InputGroup.Text>
                                Имя
                            </InputGroup.Text>
                            <Form.Control
                                value={name}
                                onChange={e => setName(e.target.value)}
                                type="text"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                Фамилия
                            </InputGroup.Text>
                            <Form.Control
                                value={surname}
                                onChange={e => setSurname(e.target.value)}
                                type="text"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                Город
                            </InputGroup.Text>
                            <Form.Control
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                type="text"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Описание</InputGroup.Text>
                            <Form.Control
                                as="textarea"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <Button
                            variant="success"
                            onClick={updateUserProfile}
                            className="ml-4 mt-3"
                        >Сохранить</Button>
                        <Button
                            variant="success"
                            onClick={addContact}
                            className="ml-4 mt-3"
                        >Добавить контакт</Button>
                        {userContacts.map(i =>
                            <Row className="mt-4" key={i.id}>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.title}
                                        onChange={(e) => changeContact('title', e.target.value, i.id)}
                                        placeholder="Тема, например сроки"
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.description}
                                        onChange={(e) => changeContact('description', e.target.value, i.id)}
                                        placeholder="Уточните детали"
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button
                                        onClick={() => removeContact(i.id)}
                                        variant={"outline-danger"}
                                    >
                                        Удалить
                                    </Button>
                                </Col>
                            </Row>
                        )}
                    </Col>
                </Row>
            </Form>

        </Container>
    );
};

export default MyProfile;