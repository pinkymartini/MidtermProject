import { View, Text,FlatList,TouchableOpacity,ActivityIndicator,ScrollView } from 'react-native'
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
  const [comments, setCommments] = useState([])


  useEffect(() => {
    fetch(API_URL+"posts/"+postID)
  .then(res=>res.json())
  .then((data)=>{
      setDetail(data);
      setLoading(false);
  })
  }, [])

  useEffect(() => {
    fetch(API_URL+"posts/"+postID+"/comments")
  .then(res=>res.json())
  .then((data)=>{
      setCommments(data);
      console.log(data);
      //setLoading(false);
  })
  }, [])

  const renderComments = ({item})=>{
    return <>
   
      <Text style ={{fontSize:20, fontWeight:'bold', color:'purple', margin:15}}>{item.body}</Text>
      
  
    </>
  }

  


  return (
    loading == true ? <ActivityIndicator size="small" color="#0000ff"  /> :<>


    <View style= {{flex:1,backgroundColor:'#e3b1d0', padding:20,}}>

     
     
      <ScrollView style={{padding:5,flex:2,backgroundColor:'white',margin:10,borderRadius:10}}>

      <Text style= {PostDetailStyle}>User ID: <Text style= {{color:'#36454F'}}>{detail.userId}</Text></Text>
      <Text style= {PostDetailStyle}>Post ID: <Text style= {{color:'#36454F'}}>{detail.id}</Text></Text>
      <Text style= {PostDetailStyle}>Title: <Text style= {{color:'#36454F'}}>{detail.title}</Text></Text>
      <Text style= {PostDetailStyle}>Body: <Text style= {{color:'#36454F'}}>{detail.body}</Text></Text>
      </ScrollView>
      
      
      <View style={{padding:5,flex:1,backgroundColor:'cyan',borderRadius:10}}>

      
      <Text style= {[PostDetailStyle, {marginBottom:0}]}>Comments</Text>
      

      
      <FlatList
      data={comments}
      renderItem={renderComments}
      > 
      </FlatList>
      </View>

      </View>



    
    </>
  )
}

export default PostStackScreen