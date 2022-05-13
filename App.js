import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { View, Text, FlatList, SafeAreaView } from 'react-native'
import PostStackScreen from './src/tabNavigation/PostStackScreen'
import UserStackScreen from './src/tabNavigation/UserStackScreen';

const Tab = createBottomTabNavigator();

const App = () => {


  return (

    <View style ={{flex: 1,padding:5}} >
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen options={{headerShown: false}} name="Posts" component={PostStackScreen} />
        <Tab.Screen options={{headerShown: false}} name="Users" component={UserStackScreen} />
      </Tab.Navigator>

    </NavigationContainer>

    </View>

  )
}

export default App