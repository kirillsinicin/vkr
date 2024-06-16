import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import TaskItem from "./TaskItem";

const TaskList = observer(() => {
    const { taskStore } = useContext(Context)

    return (
        <Row className="d-flex">
            {taskStore.tasks.map(task =>
                <TaskItem key={task.id} task={task}/>
            )}
        </Row>
    );
});

export default TaskList;
