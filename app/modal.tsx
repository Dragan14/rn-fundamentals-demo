import React from "react";
import { ScrollView } from "react-native";
import SafeAreaView from "@/components/SafeAreaView";
import View from "@/components/View";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { useModal } from "@/context/ModalContext";
import { useTheme } from "@/context/ThemeContext";

export default function ModalScreen() {
  const { showModal, hideModal } = useModal();
  const { theme } = useTheme();

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
            Modal
          </Text>
          <Button
            onPress={() => {
              showModal(
                <View style={{ gap: 10 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    This is a basic modal
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                    }}
                  >
                    <Button
                      onPress={hideModal}
                      variant="secondary"
                      outlined
                      style={{ flex: 1 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onPress={hideModal}
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
            Show Modal
          </Button>
          <Button
            onPress={() => {
              showModal(
                <View style={{ gap: 10 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                    variant="error"
                  >
                    Click on the backdrop of this modal to dismiss it
                  </Text>
                </View>,
                { dismissOnBackdropPress: true },
              );
            }}
          >
            Show Modal with Backdrop Dismiss
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
