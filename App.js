import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { View, Text, FlatList, SafeAreaView } from 'react-native'
import PostStackScreen from './src/tabNavigation/PostStackScreen'
import UserStackScreen from './src/tabNavigation/UserStackScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AlbumStackScreen from './src/tabNavigation/AlbumStackScreen';
import ToDoStackScreen from './src/tabNavigation/ToDoStackScreen';

const Tab = createBottomTabNavigator();

const App = () => {


  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          style= {{flex:1}} 
          options={{
            headerShown: false,
            tabBarIcon: () => (<MaterialCommunityIcons name="post" size={35} ></MaterialCommunityIcons>
            ),
            tabBarLabelStyle:{fontWeight:'bold',fontSize:14},
            
          
          
          }} 
          name="Posts" 
          component={PostStackScreen} />

        <Tab.Screen style= {{flex:1 }} options={{
          headerShown: false,
          tabBarIcon: () => (<MaterialCommunityIcons name="account-group" size={35} ></MaterialCommunityIcons>
          ),
          tabBarLabelStyle:{fontWeight:'bold',fontSize:14},
      
          }} name="Users" component={UserStackScreen} />

          <Tab.Screen 
          style= {{flex:1}} 
          options={{
            headerShown: false,
            tabBarIcon: () => (<MaterialCommunityIcons name="camera-plus" size={35} ></MaterialCommunityIcons>
            ),
            tabBarLabelStyle:{fontWeight:'bold',fontSize:14},
          
          
          
          }} 
          name="Albums" 
          component={AlbumStackScreen} />

          <Tab.Screen 
          style= {{flex:1}} 
          options={{
            headerShown: false,
            tabBarIcon: () => (<MaterialCommunityIcons name="check" size={35} ></MaterialCommunityIcons>
            ),
            tabBarLabelStyle:{fontWeight:'bold',fontSize:14},
           
          
          
          }} 
          name="To Do's" 
          component={ToDoStackScreen} />


      </Tab.Navigator>

    </NavigationContainer>
    
  )
}

export default App