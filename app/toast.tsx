import { ScrollView } from "react-native";
import SafeAreaView from "@/components/SafeAreaView";
import View from "@/components/View";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { useToast } from "@/context/ToastContext";
import { CheckCircle } from "lucide-react-native";
import { XCircle } from "lucide-react-native"; // Import icons

export default function ToastScreen() {
  const { showToast } = useToast();

  const handleShowToast = () => {
    showToast({
      message: "This is a toast message!",
      leftIcon: <CheckCircle />,
      rightIcon: <XCircle />,
    });
  };

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
            Click on the button to show the Toast
          </Text>
          <Button onPress={handleShowToast}>Show Toast</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
