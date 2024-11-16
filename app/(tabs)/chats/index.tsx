import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import ChatRow from "@/components/ChatRow";
import { defaultStyles } from "@/constants/Styles";
import chats from "@/assets/data/chats.json";

const Page = () => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <FlatList
        data={chats}
        renderItem={({ item }) => <ChatRow {...item} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => (
          <View style={[defaultStyles.separator, { marginLeft: 90 }]} />
        )}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({});
