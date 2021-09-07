import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import db from "../config.js";
import firebase from "firebase";
import MyHeader from "../components/MyHeader.js";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";

export default class BookRequest extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      bookName: "",
      requestReason: "",
      isbn: "",
    };
  }

  createUniqueId = () => {
    return Math.random().toString(36).substring(7);
  };

  addRequest = (bookName, requestReason, isbn) => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();
    db.collection("requested_books").add({
      user_id: userId,
      book_name: bookName,
      request_reason: requestReason,
      isbn: isbn,
      request_id: randomRequestId,
    });

    this.setState({
      bookName: "",
      requestReason: "",
      isbn: "",
    });
    return Alert.alert("Book Requested Successfully");
  };
  render() {
    return (
      <View style={styles.container}>
        <MyHeader title="Request Book" />
        <KeyboardAvoidingView style={styles.keyBoardStyle}>
          <TextInput
            style={styles.formTextInput}
            placeholder="Book name"
            onChangeText={(text) => {
              this.setState({
                bookName: text,
              });
            }}
            value={this.state.bookName}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="ISBN"
            onChangeText={(text) => {
              this.setState({
                isbn: text,
              });
            }}
            value={this.state.isbn}
          />
          <TextInput
            style={styles.formTextInput}
            multiline
            numberOfLines={8}
            placeholder="Reason"
            onChangeText={(text) => {
              this.setState({
                requestReason: text,
              });
            }}
            value={this.state.requestReason}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.addRequest(
                this.state.bookName,
                this.state.requestReason,
                this.state.isbn
              );
            }}
          >
            <Text style={{ color: "#eaf8fe" }}>Request</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyBoardStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderRadius: 10,
    borderColor: "#7489ab",
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
    backgroundColor: "#7489ab",
    color: "#eaf8fe",
    marginTop: 20,
  },
});
