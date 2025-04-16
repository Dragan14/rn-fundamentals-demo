import { useState } from "react";
import { ScrollView } from "react-native";
import SafeAreaView from "@/components/SafeAreaView";
import View from "@/components/View";
import Text from "@/components/Text";
import Switch from "@/components/Switch";

export default function TextInputScreen() {
  const [isEnabled, setIsEnabled] = useState(true);
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
            Variants
          </Text>

          <Text
            style={{ textAlign: "center", fontWeight: "500", fontSize: 14 }}
          >
            Primary Variant
          </Text>
          <Switch
            variant="primary"
            value={isEnabled}
            onValueChange={() => setIsEnabled(!isEnabled)}
            style={{ marginHorizontal: "auto" }}
          />

          <Text
            style={{ textAlign: "center", fontWeight: "500", fontSize: 14 }}
          >
            Secondary Variant
          </Text>
          <Switch
            variant="secondary"
            value={isEnabled}
            onValueChange={() => setIsEnabled(!isEnabled)}
            style={{ marginHorizontal: "auto" }}
          />

          <Text
            style={{ textAlign: "center", fontWeight: "500", fontSize: 14 }}
          >
            Tertiary Variant
          </Text>
          <Switch
            variant="tertiary"
            value={isEnabled}
            onValueChange={() => setIsEnabled(!isEnabled)}
            style={{ marginHorizontal: "auto" }}
          />

          <Text
            style={{ textAlign: "center", fontWeight: "500", fontSize: 14 }}
          >
            Success Variant
          </Text>
          <Switch
            variant="success"
            value={isEnabled}
            onValueChange={() => setIsEnabled(!isEnabled)}
            style={{ marginHorizontal: "auto" }}
          />

          <Text
            style={{ textAlign: "center", fontWeight: "500", fontSize: 14 }}
          >
            Error Variant
          </Text>
          <Switch
            variant="error"
            value={isEnabled}
            onValueChange={() => setIsEnabled(!isEnabled)}
            style={{ marginHorizontal: "auto" }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
