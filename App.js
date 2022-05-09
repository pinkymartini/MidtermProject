import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { View, Text, FlatList, SafeAreaView } from 'react-native'
import PostStackScreen from './src/tabNavigation/PostStackScreen'
import UserStackScreen from './src/tabNavigation/UserStackScreen';

const Tab = createBottomTabNavigator();

const App = () => {


  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Posts" component={PostStackScreen} />
        <Tab.Screen name="Users" component={UserStackScreen} />
      </Tab.Navigator>

    </NavigationContainer>



  )
}

export default App