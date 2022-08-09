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
import {useState} from "react";
import TaskItem from "./src/components/TaskItem";

const App = () => {
    const [newTask, setNewTask] = useState('');
    const [taskItems, setTaskItems] = useState(['1', '2', '3', '4', '5', '6', '7', '8']);
    const [inputError, setInputError] = useState(false);

    const addTask = () => {
        if (newTask) {
            Keyboard.dismiss();
            setInputError(false);
            setTaskItems([...taskItems, newTask]);
            setNewTask('');
        } else {
            setInputError(true);
        }
    }

    const completeTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy);
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
                <Text style={styles.sectionTitle}>Today's Tasks</Text>
                <View style={styles.items}>
                    <FlatList data={taskItems}
                              renderItem={({item, index}) => (
                                  <TaskItem
                                      item={item}
                                      index={index}
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
