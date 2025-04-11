import { ScrollView, Text } from "react-native";
import { Link } from "expo-router";
import SafeAreaView from "@/components/SafeAreaView";
import Button from "@/components/Button";

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
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          React Native Fundamental Components
        </Text>
        <Link href="/button" asChild>
          <Button
            style={{
              width: 350,
              marginHorizontal: "auto",
            }}
          >
            Check out the Button Component
          </Button>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}
