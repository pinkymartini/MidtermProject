import { View, Text,FlatList,TouchableOpacity,ActivityIndicator,StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react' 
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { API_URL } from '../env/config';
import { NavigationContainer } from '@react-navigation/native';
import MapView from 'react-native-maps';
import { HeaderStyle } from '../stylings/ScreenStyles';
import { UserDetailStyle } from '../stylings/TextStyles';





const UserStack = createNativeStackNavigator();

const UserStackScreen = ({navigation}) => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen  name= "Users" component={UserListScreen} options={HeaderStyle}/>
      <UserStack.Screen  name= "UserDetail"component={UserDetailScreen} options={({ route }) => ({ title: route.params.userName,...HeaderStyle})}/>
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

    return <>
    <TouchableOpacity onPress={()=>goToDetail(item.id, item.name)}>
    <Text style={{fontSize:20, fontWeight:'bold',color:'#36454F',margin:14}}>{item.name}
    </Text>
    </TouchableOpacity>
    </>
  }

  return (
    loading == true ? <ActivityIndicator size="small" color="#0000ff" /> :<>
    <View style = {{flex:1, padding:20}}>
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

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});



  return (
    
    loading == true ? <ActivityIndicator size="small" color="#0000ff"  /> :<>
    <View style={{flex:1,padding:20,backgroundColor:'#e3b1d0'}}>

    <View style ={{flex: 1,padding:20,}} >

      <View style={{flex:1, backgroundColor:'white',alignItems:'center',borderRadius:10}}>
      <Text style= {UserDetailStyle}>ID: <Text style={{color:'brown'}}>{detail.id}</Text></Text>
      <Text style= {UserDetailStyle}>Name:<Text style={{color:'brown'}}> {detail.name}</Text></Text>
      <Text style= {UserDetailStyle}>Addres:<Text style={{color:'brown'}}> {detail.address.street}</Text></Text>
      <Text style= {UserDetailStyle}>Phone:<Text style={{color:'brown'}}> {detail.phone}</Text></Text>
      </View>

      </View>

      <View style={{flex: 1,padding:20,borderRadius:10}}>
      <MapView style={styles.map}
        initialRegion={{
        latitude: Number(detail.address.geo.lat) ,
        longitude: Number(detail.address.geo.lng),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        }}
        />
        </View>
        
    </View>
    </>
  )
  
}

export default UserStackScreen