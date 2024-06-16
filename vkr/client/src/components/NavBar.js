import React, { useContext, useState } from 'react';
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, MYTASKS_ROUTE, MYPROFILE_ROUTE } from "../utils/consts";
import { Button, Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useHistory } from 'react-router-dom'
import CreateTask from "../components/modals/CreateTask";

const NavBar = observer(() => {
    const { userStore } = useContext(Context)
    const history = useHistory()

    const [ taskVisible, setTaskVisible ] = useState(false)

    const logOut = () => {
        userStore.setUser({})
        userStore.setIsAuth(false)
        localStorage.removeItem('token')
    }

    //const user = userStore.user;

    return (
        <Navbar className="fixed-top" bg="dark" variant="dark">
            <Container>
                <NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>FreelanceHub</NavLink>
                {userStore.isAuth ?
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        
                        <Button
                            variant={"outline-light"}
                            className="ml-3"
                            onClick={() => setTaskVisible(true)}
                        >
                            Создать заказ
                        </Button>
                        <Button
                            variant={"outline-light"}
                            className="ml-3"
                            onClick={() => history.push(MYTASKS_ROUTE) }
                        >
                            Мои заказы
                        </Button>
                        <Button
                            variant={"outline-light"}
                            className="ml-3"
                            onClick={() => history.push(MYPROFILE_ROUTE) }
                        >
                            Мой профиль
                        </Button>
                        { userStore.isAdmin ?
                            <Button
                                variant={"outline-light"}
                                onClick={() => history.push(ADMIN_ROUTE)}
                                className="ml-3"
                            >
                                Админ панель
                            </Button> : <></>
                        }
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="ml-5"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
                <CreateTask show={taskVisible} onHide={() => setTaskVisible(false)}/>
            </Container>
        </Navbar>
    );
});

export default NavBar;
