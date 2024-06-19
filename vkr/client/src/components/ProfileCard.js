import React from 'react';
import { Card, Image } from 'react-bootstrap';
import star from '../assets/star.png'

const ProfileCard = ({ profile }) => {
    const rating = parseFloat(profile.rating)
    return (
        <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{ width: 300, cursor: 'pointer', border: '5px solid lightgray' }}
        >
            <Image width={300} height={200}
                src={profile.img} 
            />
            <Card.Body>
                <Card.Title>{profile.name + ' ' + profile.surname}</Card.Title>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <div>Рейтинг: {rating.toFixed(2)}</div>
                        <Image width={18} height={18} src={star} />
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProfileCard;