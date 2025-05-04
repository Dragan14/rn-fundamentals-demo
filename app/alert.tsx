import React from "react";
import { ScrollView } from "react-native";
import SafeAreaView from "@/components/SafeAreaView";
import View from "@/components/View";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { useAlert } from "@/context/AlertContext";

export default function AlertScreen() {
  const { showAlert, hideAlert } = useAlert();

  return (
    <SafeAreaView disableTopSafeArea={true}>
      <ScrollView
        style={{
          marginTop: 20,
          paddingHorizontal: 10,
        }}
        contentContainerStyle={{
          gap: 20,
          alignItems: "center",
        }}
      >
        <View style={{ gap: 10, width: 350 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Alert
          </Text>
          <Button
            onPress={() => {
              showAlert(
                <View style={{ gap: 10 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    This is a basic alert
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                    }}
                  >
                    <Button
                      onPress={hideAlert}
                      variant="secondary"
                      outlined
                      style={{ flex: 1 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onPress={hideAlert}
                      variant="primary"
                      style={{ flex: 1 }}
                    >
                      Confirm
                    </Button>
                  </View>
                </View>,
              );
            }}
          >
            Show Alert
          </Button>
          <Button
            onPress={() => {
              showAlert(
                <View style={{ gap: 10 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                    variant="error"
                  >
                    Click on the backdrop of this alert to dismiss it
                  </Text>
                </View>,
                { dismissOnBackdropPress: true },
              );
            }}
          >
            Show Alert with Backdrop Dismiss
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
