import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import BoxedIcon from "@/components/BoxedIcon";
import { Ionicons } from "@expo/vector-icons";

const Settings = () => {
  const devices = [
    {
      name: "Broadcast Lists",
      icon: "megaphone",
      backgroundColor: Colors.green,
    },
    {
      name: "Starred Messages",
      icon: "star",
      backgroundColor: Colors.yellow,
    },
    {
      name: "Linked Devices",
      icon: "laptop-outline",
      backgroundColor: Colors.green,
    },
  ];

  const items = [
    {
      name: "Account",
      icon: "key",
      backgroundColor: Colors.primary,
    },
    {
      name: "Privacy",
      icon: "lock-closed",
      backgroundColor: "#33A5D1",
    },
    {
      name: "Chats",
      icon: "logo-whatsapp",
      backgroundColor: Colors.green,
    },
    {
      name: "Notifications",
      icon: "notifications",
      backgroundColor: Colors.red,
    },
    {
      name: "Storage and Data",
      icon: "repeat",
      backgroundColor: Colors.green,
    },
  ];

  const support = [
    {
      name: "Help",
      icon: "information",
      backgroundColor: Colors.primary,
    },
    {
      name: "Tell a Friend",
      icon: "heart",
      backgroundColor: Colors.red,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* this is for devices section */}
        <View style={defaultStyles.block}>
          <FlatList
            scrollEnabled={false}
            data={devices}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View style={defaultStyles.item}>
                <BoxedIcon
                  name={item.icon}
                  backgroundColor={item.backgroundColor}
                />
                <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.gray}
                />
              </View>
            )}
          />
        </View>

        {/* this is for devices section */}

        {/* this is for items section */}
        <View style={defaultStyles.block}>
          <FlatList
            scrollEnabled={false}
            data={items}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View style={defaultStyles.item}>
                <BoxedIcon
                  name={item.icon}
                  backgroundColor={item.backgroundColor}
                />
                <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.gray}
                />
              </View>
            )}
          />
        </View>

        {/* this is for items section */}

        {/* this is for support section */}
        <View style={defaultStyles.block}>
          <FlatList
            scrollEnabled={false}
            data={support}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View style={defaultStyles.item}>
                <BoxedIcon
                  name={item.icon}
                  backgroundColor={item.backgroundColor}
                />
                <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.gray}
                />
              </View>
            )}
          />
        </View>

        {/* this is for support section */}

        <TouchableOpacity>
          <Text
            style={{
              color: Colors.primary,
              fontSize: 18,
              textAlign: "center",
              paddingVertical: 14,
            }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
