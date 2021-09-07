import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import db from "../config.js";
import firebase from "firebase";
import MyHeader from "../components/MyHeader";

export default class SettingScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      contact: "",
      address: "",
      emailId: "",
      docId: "",
    };
  }

  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection("users")
      .where("email_id", "==", email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            firstName: data.first_name,
            lastName: data.last_name,
            contact: data.contact,
            address: data.address,
            emailId: data.email_id,
            docId: doc.id,
          });
        });
      });
  };

  updateUserDetails = () => {
    db.collection("users").doc(this.state.docId).update({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      contact: this.state.contact,
      address: this.state.address,
    });
    Alert.alert("Profile Updated Successfully");
  };
  render() {
    return (
      <View style={styles.container}>
        <MyHeader title="Settings" navigation={this.props.navigation} />
        <View style={styles.formContainer}>
          <TextInput
            style={styles.formInput}
            placeholder={"First Name"}
            maxLength={8}
            onChangeText={(value) => {
              this.setState({ firstName: value });
            }}
            value={this.state.firstName}
          />
          <TextInput
            style={styles.formInput}
            placeholder={"Last Name"}
            maxLength={8}
            onChangeText={(value) => {
              this.setState({ lastName: value });
            }}
            value={this.state.lastName}
          />
          <TextInput
            style={styles.formInput}
            placeholder={"Contact"}
            maxLength={10}
            onChangeText={(value) => {
              this.setState({ contact: value });
            }}
            value={this.state.contact}
            keyboardType={"numeric"}
          />
          <TextInput
            style={styles.formInput}
            placeholder={"Address"}
            multiline={true}
            onChangeText={(value) => {
              this.setState({ address: value });
            }}
            value={this.state.address}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.updateUserDetails();
            }}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#ffab91",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: "75%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
});
