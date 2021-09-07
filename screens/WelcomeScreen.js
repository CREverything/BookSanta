import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import db from "../config.js";
import firebase from "firebase";
import SantaAnimation from "../components/SantaAnimation.js";

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: "abc@abc.com",
      password: "abcabcabc",
      firstName: "",
      lastName: "",
      address: "",
      contact: "",
      confirmPassword: "",
      isModalVisible: false,
    };
  }

  showModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: "100%" }}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
              <Text style={styles.modalTitle}>Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder="First Name"
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({ firstName: text });
                }}
                value={this.state.firstName}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="Last Name"
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({ lastName: text });
                }}
                value={this.state.lastName}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="Contact"
                keyboardType={"numeric"}
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({ contact: text });
                }}
                value={this.state.contact}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="Address"
                onChangeText={(text) => {
                  this.setState({ address: text });
                }}
                value={this.state.address}
                multiline={true}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="Email"
                onChangeText={(text) => {
                  this.setState({ emailId: text });
                }}
                value={this.state.emailId}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
                value={this.state.password}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="Confirm Password"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ confirmPassword: text });
                }}
                value={this.state.confirmPassword}
              />
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => {
                    this.userSignUp(
                      this.state.emailId,
                      this.state.password,
                      this.state.confirmPassword
                    );
                  }}
                >
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    this.setState({ isModalVisible: false });
                  }}
                >
                  <Text style={{ color: "#ff5722" }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };
  userLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then((userCredential) => {
        // Signed in
        // ...
        this.props.navigation.navigate("DonateBooks");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return alert(errorMessage);
      });
  };
  userSignUp = (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return alert("Your password does not match.");
    } else {
      console.log(emailId);
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then((userCredential) => {
          // Signed in
          db.collection("users").add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            contact: this.state.contact,
            address: this.state.address,
            email_id: this.state.emailId,
          });
          return alert("User Added Successfully", "", [
            {
              text: "OK",
              onPress: () => this.setState({ isModalVisible: false }),
            },
          ]);
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
          return alert(errorMessage);
        });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}></View>
        {this.showModal()}
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.title}>Book Santa</Text>
        </View>
        <View>
          <TextInput
            placeholder="Username"
            style={styles.loginBox}
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({ emailId: text });
            }}
            value={this.state.emailId}
          />
          <TextInput
            placeholder="Password"
            style={styles.loginBox}
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
            value={this.state.password}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.userLogin(this.state.emailId, this.state.password);
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({ isModalVisible: true });
            }}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7489ab",
    alignItems: "center",
    justifyContent: "center",
  },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 65,
    fontWeight: "bold",
    paddingBottom: 30,
    color: "#eaf8fe",
  },
  loginBox: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: "#eaf8fe",
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
  },
  KeyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 30,
    color: "#7489ab",
    margin: 50,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7489ab",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#7489ab",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  registerButton: {
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
  },
  registerButtonText: {
    color: "#ff5722",
    fontSize: 15,
    fontWeight: "bold",
  },
  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  button: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#eaf8fe",
    marginTop: 10,
  },
  buttonText: {
    color: "#7489ab",
    fontWeight: "bold",
    fontSize: 20,
  },
  modalBackButton: {
    alignSelf: "center",
  },
});
