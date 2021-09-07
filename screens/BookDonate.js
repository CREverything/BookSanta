import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import db from "../config.js";
import firebase from "firebase";
import MyHeader from "../components/MyHeader.js";
import { ListItem } from "react-native-elements";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import RecieverDetails from "./RecieverDetailsScreen.js";

export default class BookDonate extends React.Component {
  constructor() {
    super();
    this.state = {
      requestedBookList: [],
    };
    this.requestRef = null;
  }

  componentDidMount() {
    console.log("get");
    this.getRequestedBookList();
  }

  getRequestedBookList = async () => {
    console.log("get");
    this.requestRef = await db
      .collection("requested_books")
      .onSnapshot((snapshot) => {
        var requestedBooksList = snapshot.docs.map((document) =>
          document.data()
        );
        console.log(requestedBooksList);
        this.setState({ requestedBookList: requestedBooksList });
      });
    console.log(this.state.requestedBookList);
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.book_name}
        subtitle={item.request_reason}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        rightElement={
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("RecieverDetails");
            }}
          >
            <Text style={{ color: "#fff" }}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Donate books" navigation={this.props.navigation} />
        <View style={{ flex: 1 }}>
          {this.state.requestedBookList.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>List Of All Requested Books</Text>
            </View>
          ) : (
            <FlatList
              data={this.state.requestedBookList}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7489ab",
    borderRadius: 10,
    fontWeight: "bold",
    color: "#eaf8fe",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
});
