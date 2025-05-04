import React from "react";
import { ScrollView } from "react-native";
import SafeAreaView from "@/components/SafeAreaView";
import View from "@/components/View";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { useModal } from "@/context/ModalContext";

export default function ModalScreen() {
  const { showModal, hideModal } = useModal();

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
                <View>
                  <Text>This is a basic modal</Text>
                  <Button onPress={hideModal} variant="secondary" outlined>
                    Cancel
                  </Button>
                  <Button onPress={hideModal} variant="primary">
                    Confirm
                  </Button>
                </View>,
              );
            }}
          >
            Show Modal
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
