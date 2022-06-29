import { View, Text,FlatList,TouchableOpacity,ActivityIndicator,ScrollView,StyleSheet,Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react' 
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { API_URL } from '../env/config';
import { NavigationContainer } from '@react-navigation/native';
import { PostDetailStyle } from '../stylings/TextStyles';
import { HeaderStyle } from '../stylings/ScreenStyles';

const AlbumStack = createNativeStackNavigator();

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });

const AlbumStackScreen = ({navigation}) => {
    return (
      
        <AlbumStack.Navigator>
        <AlbumStack.Screen name="AlbumList" component={AlbumListScreen} options={ ({route})=>({title: "Album List",...HeaderStyle})}/>
        <AlbumStack.Screen name="PhotoList" component={PhotoListScreen} options={({route})=>({title: route.params.albumTitle,...HeaderStyle})} />
        </AlbumStack.Navigator>
      )
}

const AlbumListScreen = ({navigation}) => {
    const [albums, setAlbums] = useState([])
    const[loading,setLoading]= useState(true)
  
    useEffect(() => {
          fetch(API_URL+"albums")
          .then(res=>res.json())
          .then((data)=>{
              setAlbums(data);
              setLoading(false);
              console.log(data);
          })
  
    }, [])
  
    const goToPhotos = (id,title)=>{
  
        navigation.navigate("PhotoList",{albumId: id, albumTitle: title}); 
      
    }
  
    const renderAlbums = ({item})=>{
      return <>
      <TouchableOpacity onPress={()=>goToPhotos(item.id, item.title)}>
        <Text style ={{fontSize:20, fontWeight:'bold', color:'#36454F', margin:15}}>{item.title}</Text>
        
        </TouchableOpacity>
        
      </>
    }
  
    return (
      loading == true ? <ActivityIndicator size="small" color="#0000ff" /> :<>
      <View style = {{backgroundColor:'white'}}>
        <FlatList
        data={albums}
        renderItem={renderAlbums}
        > 
        </FlatList>
      </View>
      </>
    )
}

const PhotoListScreen = ({route,navigation}) => {

    const {albumId} = route.params;
    const [photos, setPhotos] = useState([])
    const[loading,setLoading]= useState(true)
  
    useEffect(() => {
          fetch(API_URL+"photos")
          .then(res=>res.json())
          .then((data)=>{
              data = data.filter(q=> q.albumId ==albumId)
              setPhotos(data);
              setLoading(false);
          })
  
    }, [])

    const renderPhotos = ({item})=>{
        return <>
        
          <Text style ={{fontSize:20, fontWeight:'bold', color:'#36454F', margin:15}}>{item.title}</Text>
          
          <View style={{alignItems: 'center'}}>
          <Image
            style={styles.logo}
            source={{
                uri: item.url,
            }}
            />
            </View>
          
        </>
      }
  

  
    return (
      loading == true ? <ActivityIndicator size="small" color="#0000ff" /> :<>
      <View style = {{backgroundColor:'white'}}>
        <FlatList
        data={photos}
        renderItem={renderPhotos}
        > 
        </FlatList>
      </View>
      </>
    )
}




export default AlbumStackScreen