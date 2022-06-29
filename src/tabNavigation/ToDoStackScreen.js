import { View, Text,FlatList,TouchableOpacity,ActivityIndicator,ScrollView,StyleSheet,Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react' 
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { API_URL } from '../env/config';
import { NavigationContainer } from '@react-navigation/native';
import { PostDetailStyle } from '../stylings/TextStyles';
import { HeaderStyle } from '../stylings/ScreenStyles';

const TodoStack = createNativeStackNavigator();

const ToDoStackScreen = ({navigation}) => {
    return (
      
        <TodoStack.Navigator>
        <TodoStack.Screen name="ToDoList" component={ToDoListScreen} options={HeaderStyle}/>
        
        </TodoStack.Navigator>
      )
}


const ToDoListScreen = () => {

    const [toDos, setToDos] = useState([])
    const[loading,setLoading]= useState(true)

    useEffect(() => {
        fetch(API_URL+"todos")
        .then(res=>res.json())
        .then((data)=>{
            setToDos(data);
            setLoading(false);
            
        })

  }, [])

  const renderToDos = ({item})=>{

    return <>
      <Text style ={{fontSize:20, fontWeight:'bold', color:'#36454F', margin:15}}>{item.title}</Text>
    </>

  }



  return (
    loading == true ? <ActivityIndicator size="small" color="#0000ff" /> :<>
      <View style = {{backgroundColor:'white'}}>
        <FlatList
        data={toDos}
        renderItem={renderToDos}
        > 
        </FlatList>
      </View>
      </>
  )
}



export default ToDoStackScreen