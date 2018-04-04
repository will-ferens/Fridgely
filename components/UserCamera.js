import React from 'react'
import { Text, View, TouchableOpacity, Vibration, Image } from 'react-native'
import { Camera, Permissions, FileSystem, Constants, AppLoading, Asset, CameraRoll } from 'expo'

// function cacheImages(images) {
//   return images.map(image => {
//     if (typeof image === 'string') {
//       return Image.prefetch(image)
//     } else {
//       return Asset.fromModule()
//     }
//   })
// }



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

  componentDidMount() {
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
      console.log(e, 'Directory exists')
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
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref }} >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  })
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.takePicture.bind(this)}>
                <Text>Take Pic</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      )
    }
  }
}

