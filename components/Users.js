import React, { Component } from "react"
import { View, Text, Picker, TextInput } from "react-native"

export default  class Users extends Component {
    state = {
        user: [],
        selectedUser: ""
    }

    getUsers = () => {
        fetch("ttps://pure-meadow-62546.herokuapp.com/user")
        .then(response => {
            return response.json()
        })
        .then(users => {
            this.setState({
                users: users.users
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    updateUser = (selectedUser) => {
        this.setState({
            selectedUser
        })
    }

    render() {
        return (
            <View>
                <Picker selectedValue={this.state.user} onValueChange={this.updateUser}>
                    {this.state.user.map(user => <Picker.Item label= {user.userName} />)}
                </Picker>
                {/* <TextInput */}
            </View>
        )
    }
}