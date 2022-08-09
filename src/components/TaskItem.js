import React from 'react';
import {TouchableOpacity} from 'react-native';
import Task from "./Task";

const TaskItem = ({item, index, completeTask}) => {
    return (
        <TouchableOpacity onPress={() => completeTask(index)}>
            <Task text={item}/>
        </TouchableOpacity>
    )
}

export default TaskItem;