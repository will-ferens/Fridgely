import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Vibration, Image } from 'react-native'
import { Camera, Permissions, FileSystem, Constants, AppLoading, Asset, CameraRoll } from 'expo'

export default class UserCamera extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    photos: [],
    photoId: 1,
    image: "",
    ingredients: []
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  sendPhotoToServer = () => {
    let image = this.state.image
    fetch("https://pure-meadow-62546.herokuapp.com/image", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({image})
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data)
      // this.setState({
      //   ingredients: data
      // })
    })
    .catch(error => {
      console.log(error)
    })
  }

  takePicture = async function() {
    const result = await Expo.ImagePicker.launchCameraAsync({
      allowEditing: false,
      exif: true
    })
    if(!result.cancelled) {
      this.setState({
        image: result.uri,
        photoId: this.state.photoId + 1
      })
      Vibration.vibrate()
      console.log(this.state.image)
    }
    CameraRoll.saveToCameraRoll(this.state.image)
  }

  render() {
    const { hasCameraPermission } = this.state
    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}>
            <Image style={{height: 50, width: 50}} source={require("../camera-logo.png")}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.sendPhotoToServer}>
            <Text>Post</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 30
  },
});