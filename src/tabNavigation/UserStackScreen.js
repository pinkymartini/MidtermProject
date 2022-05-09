import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const UserStack = createNativeStackNavigator();

const UserStackScreen = () => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name= "User"component={UserListScreen}/>
      <UserStack.Screen name= "UserDetail"component={UserDetailScreen}/>
    </UserStack.Navigator>
  )
}

const UserListScreen = () => {
  return (
    <View>
      <Text>UserListScreen</Text>
    </View>
  )
}

const UserDetailScreen = () => {
  return (
    <View>
      <Text>UserDetailScreen</Text>
    </View>
  )
}

export default UserStackScreen