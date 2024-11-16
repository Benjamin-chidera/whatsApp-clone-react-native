import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from "react-native";
import React from "react";
import welcome from "@/assets/images/welcome.png";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

const Page = () => {
  const OpenLink = () => {
    Linking.openURL("https://www.whatsapp.com/legal/privacy-policy/");
  };

  return (
    <View style={styles.container}>
      <Image source={welcome} style={styles.welcomeImage} />
      <Text style={styles.headlines}>Welcome to WhatsApp Clone</Text>
      <Text style={styles.description}>
        Read Our {""}
        <Text style={styles.link} onPress={OpenLink}>
          Privacy Policy
        </Text>
        . {'Text "Agree & Continue" to accept the'}
        <Text style={styles.link} onPress={OpenLink}>
          Terms of Service
        </Text>
      </Text>

      <Link href={"/otp"} replace asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Agree & Continue</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  welcomeImage: {
    width: "100%",
    height: 300,
    marginBottom: 80,
  },
  headlines: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 80,
    color: Colors.gray,
  },
  link: {
    color: Colors.primary,
  },

  button: {
    width: "100%",
    alignItems: "center",
  },

  buttonText: {
    
    fontWeight: "bold",
    fontSize: 22,
  },
});
