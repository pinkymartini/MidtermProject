import { View, Text,FlatList,TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react' 
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { API_URL } from '../env/config';
import { NavigationContainer } from '@react-navigation/native';


const PostStack = createNativeStackNavigator();

const PostStackScreen = ({navigation}) => {
  return (
    
      <PostStack.Navigator>
      <PostStack.Screen name="Posts" component={PostListScreen} />
      <PostStack.Screen options={({ route }) => ({ title: route.params.postTitle })} name="PostDetail" component={PostDetailScreen} />
      </PostStack.Navigator>
    )
  
}

const PostListScreen = ({navigation}) => {
  const [posts, setPosts] = useState([])
  const[loading,setLoading]= useState(true)

  useEffect(() => {
        fetch(API_URL+"posts")
        .then(res=>res.json())
        .then((data)=>{
            data = data.slice(0,20)
            setPosts(data);
            setLoading(false);
        })

  }, [])

  const goToDetail = (id,title)=>{

    navigation.navigate("PostDetail",{postID: id, postTitle: title}); 
  }

  const renderPosts = ({item})=>{
    return <>
    <TouchableOpacity onPress={()=>goToDetail(item.id, item.title)}>
      <Text style ={{fontSize:20, fontWeight:'bold', color:'tomato'}}>{item.title}</Text>
      </TouchableOpacity>
    </>
  }

  return (
    loading == true ? <ActivityIndicator size="small" color="#0000ff" /> :<>
    <View>
      <FlatList
      data={posts}
      renderItem={renderPosts}
      > 
      </FlatList>
    </View>
    </>
  )
}


const PostDetailScreen = ({route,navigation}) => {

  const {postID} = route.params;
  const [detail, setDetail] = useState({})
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    fetch(API_URL+"posts/"+postID)
  .then(res=>res.json())
  .then((data)=>{
      setDetail(data);
      setLoading(false);
  })
   
  }, [])


  return (
    loading == true ? <ActivityIndicator size="small" color="#0000ff"  /> :<>
    <View>
      <Text>USER ID: {detail.userId}</Text>
      <Text>ID: {detail.id}</Text>
      <Text>TITLE: {detail.title}</Text>
      <Text>BODY: {detail.body}</Text>
    </View>
    </>
  )
}

export default PostStackScreen