import React from 'react'
import { Text, View, TouchableOpacity, Vibration, Image } from 'react-native'
import { Camera, Permissions, FileSystem, Constants, AppLoading, Asset, CameraRoll } from 'expo'

export default class UserCamera extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    photos: [],
    photoId: 1
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
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
      console.log(this.state)
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
        <View style={{ flex: 1 }}>
              <View>
              <TouchableOpacity
                onPress={this.takePicture.bind(this)}>
                <Text>Take Pic</Text>
              </TouchableOpacity>
            </View>
        </View>
      )
    }
  }
}