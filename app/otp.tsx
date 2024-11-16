import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Linking,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaskInput from "react-native-mask-input";
import { isClerkAPIResponseError, useSignIn, useSignUp } from "@clerk/clerk-expo";

const Otp = () => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const keyboardVerticalOffset = Platform.OS === "ios" ? 90 : 0;
  const { bottom } = useSafeAreaInsets();
    const { signUp, setActive } = useSignUp();
    const { signIn } = useSignIn();

  const OpenLink = () => {
    Linking.openURL("https://www.whatsapp.com/legal/privacy-policy/");
  };

  const sendOTP = async () => {
    // console.log("sendOTP", phoneNumber);
    // setLoading(true);

    // try {
    //   await signUp!.create({
    //     phoneNumber,
    //   });
    //   console.log("TESafter createT: ", signUp!.createdSessionId);

    //   signUp!.preparePhoneNumberVerification();

    //   console.log("after prepare: ");
      router.push(`/(tabs)/chats`);
    // } catch (err) {
    //   console.log("error", JSON.stringify(err, null, 2));

    //   if (isClerkAPIResponseError(err)) {
    //     if (err.errors[0].code === "form_identifier_exists") {
    //       // User signed up before
    //       console.log("User signed up before");
    //       await trySignIn();
    //     } else {
    //       setLoading(false);
    //       Alert.alert("Error", err.errors[0].message);
    //     }
    //   }
    // }
  };

  const trySignIn = async () => {
    // console.log("trySignIn", phoneNumber);

    // const { supportedFirstFactors } = await signIn!.create({
    //   identifier: phoneNumber,
    // });

    // const firstPhoneFactor: any = supportedFirstFactors?.find((factor: any) => {
    //   return factor.strategy === "phone_code";
    // });

    // const { phoneNumberId } = firstPhoneFactor;

    // await signIn!.prepareFirstFactor({
    //   strategy: "phone_code",
    //   phoneNumberId,
    // });

    // router.push(`/verify/${phoneNumber}?signin=true`);
    // setLoading(false);
  };


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={keyboardVerticalOffset}
      behavior="padding"
    >
      <View style={styles.container}>
        {loading && (
          <View style={(StyleSheet.absoluteFill, styles.loading)}>
            <ActivityIndicator size={"large"} color={Colors.primary} />
            <Text style={{ marginTop: 10 }}>Sending code...</Text>
          </View>
        )}
        <Text style={styles.description}>
          WhatsApp will need to verify your account. Carrier charges may apply
        </Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.listItem}>Nigeria</Text>
            <Ionicons name="chevron-forward" size={24} color={Colors.gray} />
          </View>

          <View style={styles.separator}></View>

          <MaskInput
            style={styles.input}
            value={phoneNumber}
            autoFocus
            keyboardType="default"
            onChangeText={(masked, unmasked) => {
              setPhoneNumber(masked); // you can use the unmasked value as well
            }}
            mask={[
              "+",
              "2",
              "3",
              "4",
              " ",
              /\d/,
              /\d/,
              /\d/, // Two digits for the "XX" part
              " ",
              /\d/,
              /\d/,
              /\d/, // Three digits for the "XXX" part
              " ",
              /\d/,
              /\d/,
              /\d/,
              /\d/, // Four digits for the "XXXX" part
            ]}
            placeholder="Enter your phone number"
            placeholderTextColor={"gray"}
          />
        </View>

        <Text style={styles.legal}>
          You must be {""}
          <Text style={styles.link} onPress={OpenLink}>
            at least 16 years old
          </Text>{" "}
          to register. Learn how whatsApp works with the
          <Text>Meta companies</Text>
        </Text>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          onPress={sendOTP}
          style={[
            styles.button,
            phoneNumber !== "" ? styles.enabled : null,
            { marginBottom: bottom },
          ]}
          disabled={phoneNumber === ""}
        >
          <Text
            style={[
              styles.buttonText,

              phoneNumber !== "" ? styles.enabled : null,
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.background,
    gap: 20,
  },
  description: {
    fontSize: 14,
    // textAlign: "center",
    // marginBottom: 80,
    color: Colors.gray,
  },
  list: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    padding: 10,
  },

  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6,
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 18,
    color: Colors.primary,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.gray,
    opacity: 0.3,
  },
  link: {
    color: Colors.primary,
  },
  legal: {
    textAlign: "center",
    fontSize: 12,
    color: Colors.gray,
  },
  button: {
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
    color: "#fff",
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 18,
  },

  input: {
    backgroundColor: "#fff",
    width: "100%",
    fontSize: 16,
    padding: 6,
    marginTop: 10,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
