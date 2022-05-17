import { View, Text,FlatList,TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react' 
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { API_URL } from '../env/config';
import { NavigationContainer } from '@react-navigation/native';
import { PostDetailStyle } from '../stylings/TextStyles';
import { HeaderStyle } from '../stylings/ScreenStyles';

const PostStack = createNativeStackNavigator();

const PostStackScreen = ({navigation}) => {
  return (
    
      <PostStack.Navigator>
      <PostStack.Screen name="Posts" component={PostListScreen} options={HeaderStyle}/>
      <PostStack.Screen name="PostDetail" component={PostDetailScreen} options={({route})=>({title: route.params.postTitle,...HeaderStyle})} />
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
      <Text style ={{fontSize:20, fontWeight:'bold', color:'#36454F', margin:15}}>{item.title}</Text>
      
      </TouchableOpacity>
    </>
  }

  return (
    loading == true ? <ActivityIndicator size="small" color="#0000ff" /> :<>
    <View style = {{backgroundColor:'white'}}>
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
    <View style= {{flex:1,backgroundColor:'#e3b1d0'}}>
      <View style={{margin:25}}>
      <Text style= {PostDetailStyle}>User ID: <Text style= {{color:'#36454F'}}>{detail.userId}</Text></Text>
      <Text style= {PostDetailStyle}>Post ID: <Text style= {{color:'#36454F'}}>{detail.id}</Text></Text>
      <Text style= {PostDetailStyle}>Title: <Text style= {{color:'#36454F'}}>{detail.title}</Text></Text>
      <Text style= {PostDetailStyle}>Body: <Text style= {{color:'#36454F'}}>{detail.body}</Text></Text>
      </View>
    </View>
    </>
  )
}

export default PostStackScreen