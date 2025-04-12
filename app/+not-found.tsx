import SafeAreaView from "@/components/SafeAreaView";
import { Text } from "react-native";
import { Link } from "expo-router";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <SafeAreaView style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={{ marginBottom: 10 }}>Page Not Found</Text>
      <Link href="/" asChild>
        <Button
          style={{
            maxWidth: 350,
            marginHorizontal: "auto",
          }}
        >
          Go Home
        </Button>
      </Link>
    </SafeAreaView>
  );
}
