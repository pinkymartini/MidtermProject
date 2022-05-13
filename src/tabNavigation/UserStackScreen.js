import { View, Text,FlatList,TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react' 
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { API_URL } from '../env/config';
import { NavigationContainer } from '@react-navigation/native';

const UserStack = createNativeStackNavigator();

const UserStackScreen = ({navigation}) => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name= "User"component={UserListScreen}/>
      <UserStack.Screen options={({ route }) => ({ title: route.params.userName })} name= "UserDetail"component={UserDetailScreen}/>
    </UserStack.Navigator>
  )
}

const UserListScreen = ({navigation}) => {

  const [users, setUsers] = useState([])
  const[loading,setLoading]= useState(true)

  useEffect(() => {
        fetch(API_URL+"users")
        .then(res=>res.json())
        .then((data)=>{
            setUsers(data);
            setLoading(false);
        })

  }, [])

  const goToDetail= (id,name) => {
    navigation.navigate("UserDetail",{userID: id, userName: name}); 
  }

  const renderUsers =({item}) =>{

    return <TouchableOpacity onPress={()=>goToDetail(item.id, item.name)}>
    <Text style={{fontSize:20, fontWeight:'bold'}}>Name: {item.name}</Text>
    </TouchableOpacity>
  }

  return (
    loading == true ? <ActivityIndicator size="small" color="#0000ff" /> :<>
    <View>
      <FlatList
      data={users}
      renderItem={renderUsers}
      > 
      </FlatList>
    </View>
    </>
  )
}

const UserDetailScreen = ({route,navigation}) => {

  const [detail, setDetail] = useState({})
  const [loading, setLoading] = useState(true)

  const {userID}= route.params;

  useEffect(() => {
    fetch(API_URL+"users/"+userID)
    .then(res=>res.json())
    .then((data)=>{
        setDetail(data);
        setLoading(false);
    })

}, [])

  return (
    loading == true ? <ActivityIndicator size="small" color="#0000ff"  /> :<>
    <View>
      <Text>ID: {detail.id}</Text>
      <Text>Name: {detail.name}</Text>
      <Text>Addres: {detail.address.street}</Text>
      <Text>phone: {detail.phone}</Text>
    </View>
    </>
  )
}

export default UserStackScreen