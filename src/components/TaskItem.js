import React from 'react';
import {TouchableOpacity} from 'react-native';
import Task from "./Task";

const TaskItem = ({task, completeTask}) => {
    return (
        <TouchableOpacity onPress={() => completeTask(task)}>
            <Task text={task}/>
        </TouchableOpacity>
    )
}

export default TaskItem;