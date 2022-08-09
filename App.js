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
    const [taskItems, setTaskItems] = useState([]);

    const addTask = () => {
        Keyboard.dismiss();
        setTaskItems([...taskItems, newTask]);
        setNewTask(null);
    }

    const completeTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy);
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
                    style={styles.input}
                    placeholder={'Write a task'}
                    value={newTask}
                    onChangeText={setNewTask}/>
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
        paddingTop: 80,
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
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20
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
