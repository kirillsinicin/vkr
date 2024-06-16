import React from 'react';
import { ListGroup } from 'react-bootstrap';
import ResponseItem from './ResponseItem';

const ResponseList = ({responses}) => {
    return (
        <ListGroup>
            {responses.map(response =>
                <ResponseItem key={response.id} response={response}/>
            )}
        </ListGroup>
    );
};

export default ResponseList;