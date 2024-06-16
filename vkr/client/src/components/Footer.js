import React from 'react';
import { Container, Nav, Navbar, Row } from 'react-bootstrap';

const Footer = () => {
    return (
        <Navbar className="fixed-bottom" bg="dark" variant="dark">
            <Container className="justify-content-center">
                <Row>
                    <Nav activeKey="/home">
                        <Nav.Item>
                            <Nav.Link style={{ color: 'white' }} eventKey="link-1">Правила</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link style={{ color: 'white' }} eventKey="link-2">Частые вопросы</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link style={{ color: 'white' }} eventKey="link-2">Контакты</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link style={{ color: 'white' }} eventKey="link-2">Служба поддержки</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link style={{ color: 'white' }} href="/home">О нас</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Row>
            </Container>
        </Navbar>
    );
};

export default Footer;