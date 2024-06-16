import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { fetchOneProfile } from '../http/profileAPI';
import ProfileCard from '../components/ProfileCard';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const Profile = () => {
    const [profile, setProfile] = useState({ userContacts: [] })
    const { id } = useParams()

    useEffect(() => {
        fetchOneProfile(id)
            .then(profile => setProfile({
                ...profile,
                img: process.env.REACT_APP_API_URL + profile.img
            }))
    }, [id])

    return (
        <Container className="mt-3" style={{paddingBottom:50, paddingTop:50}}>
            <Row>
                <Col className="ml-3">
                    <ProfileCard profile={profile}/>
                </Col>
                <Col>
                    <h2>Описание</h2>
                    {profile.description}
                </Col>
                <Col>
                    <h2>Контакты</h2>
                    {profile.userContacts.map((userContacts, index) =>
                        <Row key={userContacts.id} style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
                            {userContacts.title}: {userContacts.description}
                        </Row>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;