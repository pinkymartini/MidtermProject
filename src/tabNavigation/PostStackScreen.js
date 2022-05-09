import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const PostStack = createNativeStackNavigator();

const PostStackScreen = () => {
  return (
    
      <PostStack.Navigator>
      <PostStack.Screen name="Post" component={PostListScreen} />
      <PostStack.Screen name="PostDetail" component={PostDetailScreen} />
      </PostStack.Navigator>
    )
  
}

const PostListScreen = () => {
  return (
    <View>
      <Text>PostListScreen</Text>
    </View>
  )
}


const PostDetailScreen = () => {
  return (
    <View>
      <Text>PostDetailScreen</Text>
    </View>
  )
}

export default PostStackScreen