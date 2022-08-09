import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {useEffect, useState} from "react";
import TaskItem from "./src/components/TaskItem";
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
    const [newTask, setNewTask] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [inputError, setInputError] = useState(false);

    // TODO : Create a context and reducer for the actions

    useEffect(() => {
        getTasks().then(() => {
            console.log("Loading Complete")
        });
    }, []);

    const getTasks = async () => {
        const jsonValue = await AsyncStorage.getItem('task-items')
        return jsonValue != null ? setTaskList(JSON.parse(jsonValue)) : null;
    }

    const addTask = async () => {
        if (newTask) {
            Keyboard.dismiss();
            setInputError(false);
            setNewTask('');
            await AsyncStorage.setItem('task-items', JSON.stringify([...taskList, newTask]));
            await getTasks();
        } else {
            setInputError(true);
        }
    }

    const completeTask = async (item) => {
        let itemsCopy = [...taskList];
        itemsCopy = itemsCopy.filter((task) => {
            return task !== item
        });
        await AsyncStorage.setItem('task-items', JSON.stringify([...itemsCopy]));
        await getTasks();
    }

    const inputHandler = (text) => {
        if (inputError && text) {
            setInputError(false);
        }
        setNewTask(text);
    }

    return (
        <View style={styles.container}>
            <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>
                    Today's Tasks
                </Text>
                <View style={styles.items}>
                    <FlatList data={taskList}
                              keyExtractor={task => task}
                              renderItem={({item, index}) => (
                                  <TaskItem
                                      task={item}
                                      completeTask={completeTask}/>
                              )}
                    />
                </View>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.writeTaskWrapper}>
                <TextInput
                    style={inputError ? [styles.input, styles.error] : styles.input}
                    placeholder={'Write a task'}
                    value={newTask}
                    onChangeText={inputHandler}/>
                {/*TODO : Replace Text with Icon*/}
                <TouchableOpacity onPress={addTask}>
                    <View style={styles.addWrapper}>
                        <Text>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    items: {
        marginTop: 30
    },
    writeTaskWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20
    },
    input: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    error: {
        borderColor: '#AA0000',
        borderWidth: 3
    },
    addWrapper: {
        width: 60,
        height: 60,
        marginLeft: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    }
});

export default App;
