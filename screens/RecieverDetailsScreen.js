import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import db from "../config.js";
import firebase from "firebase";
import BookDonate from "./BookDonate";
import BookRequest from "./BookRequest";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { AppTabNavigator } from "../components/AppTabNavigator";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { AppDrawerNavigator } from "../components/AppDrawerNavigator";

export default class RecieverDetails extends React.Component {
  render() {
    return (
      <View>
        <Text>Reciever Details</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
