import { ScrollView } from "react-native";
import { Link } from "expo-router";
import SafeAreaView from "@/components/SafeAreaView";
import Button from "@/components/Button";
import Text from "@/components/Text";
import View from "@/components/View";

export default function Home() {
  return (
    <SafeAreaView>
      <ScrollView
        style={{
          paddingTop: 20,
          paddingHorizontal: 10,
        }}
        contentContainerStyle={{
          gap: 20,
          alignItems: "center",
        }}
      >
        <View style={{ gap: 10, width: 350 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            React Native Fundamental Components
          </Text>
          <Link href="/text" asChild>
            <Button
              style={{
                width: 350,
                marginHorizontal: "auto",
              }}
            >
              Text
            </Button>
          </Link>
          <Link href="/textinput" asChild>
            <Button
              style={{
                width: 350,
                marginHorizontal: "auto",
              }}
            >
              Text Input
            </Button>
          </Link>
          <Link href="/button" asChild>
            <Button
              style={{
                width: 350,
                marginHorizontal: "auto",
              }}
            >
              Button
            </Button>
          </Link>
          <Link href="/segmentedcontrol" asChild>
            <Button
              style={{
                width: 350,
                marginHorizontal: "auto",
              }}
            >
              Segmented Control
            </Button>
          </Link>
          <Link href="/switch" asChild>
            <Button
              style={{
                width: 350,
                marginHorizontal: "auto",
              }}
            >
              Switch
            </Button>
          </Link>
          <Link href="/toast" asChild>
            <Button
              style={{
                width: 350,
                marginHorizontal: "auto",
              }}
            >
              Toast
            </Button>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
