import React, { useContext, useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col, InputGroup } from "react-bootstrap";
import { Context } from "../../index";
import { createTask, fetchTypes } from "../../http/taskAPI";
import { observer } from "mobx-react-lite";

const CreateTask = observer(({ show, onHide }) => {
    const { taskStore } = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes()
            .then(data => taskStore.setTypes(data))
    }, [taskStore])

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
    }

    const addTask = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('typeId', taskStore.selectedType.id)
        formData.append('info', JSON.stringify(info))

        createTask(formData)
            .then(data => {
                taskStore.setTasks([...taskStore.tasks, data])
                onHide()
            })
    }

    return (
        <Modal
            size="lg"
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Создать заказ
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{taskStore.selectedType.name || "Выберите категорию"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {taskStore.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => taskStore.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Что нужно сделать?"
                    />
                    <InputGroup>
                           <InputGroup.Text className="mt-3" id="inputGroup-sizing-default">
                                Ваш бюджет
                           </InputGroup.Text>
                           <Form.Control
                                aria-describedby="inputGroup-sizing-default"
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))}
                                className="mt-3"
                                type="number"
                           />
                    </InputGroup>
                    <hr />
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавить информацию
                    </Button>
                    {info.map(i =>
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Тема, например сроки"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Уточните детали"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addTask}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateTask;
