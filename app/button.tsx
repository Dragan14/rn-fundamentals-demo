import { ScrollView, Text } from "react-native";
import SafeAreaView from "@/components/SafeAreaView";
import View from "@/components/View";
import Button from "@/components/Button";
import { Camera } from "lucide-react-native";
import { PersonStanding } from "lucide-react-native";

export default function ButtonScreen() {
  return (
    <SafeAreaView disableTopSafeArea={true}>
      <ScrollView
        style={{
          paddingTop: 20,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        contentContainerStyle={{
          gap: 20,
          alignItems: "center",
        }}
      >
        <View style={{ gap: 10 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Button Colors
          </Text>
          <Button variant="primary" style={{ width: 350 }}>
            Primary
          </Button>
          <Button variant="secondary" style={{ width: 350 }}>
            Secondary
          </Button>
          <Button variant="tertiary" style={{ width: 350 }}>
            Tertiary
          </Button>
          <Button variant="error" style={{ width: 350 }}>
            Error
          </Button>
          <Button variant="success" style={{ width: 350 }}>
            Success
          </Button>
          <Button variant="outlined" style={{ width: 350 }}>
            Outlined
          </Button>
          <Button variant="elevated" style={{ width: 350 }}>
            Elevated
          </Button>
        </View>
        <View style={{ gap: 10 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Button Icons
          </Text>
          <Button
            variant="primary"
            leftIcon={<PersonStanding />}
            style={{ width: 350 }}
          >
            Left Icon
          </Button>
          <Button
            variant="outlined"
            rightIcon={<Camera />}
            style={{ width: 350 }}
          >
            Right Icon
          </Button>
          <Button
            variant="elevated"
            leftIcon={<PersonStanding />}
            rightIcon={<Camera />}
            style={{ width: 350 }}
          >
            Both Icons Icon
          </Button>
        </View>
        <View style={{ gap: 10 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Additional Properties
          </Text>
          <Button variant="tertiary" round={true} style={{ width: 350 }}>
            Round
          </Button>
          <Button variant="tertiary" loading={true} style={{ width: 350 }}>
            Loading
          </Button>
        </View>
        <View style={{ gap: 10 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Custom Styling
          </Text>
          <Button color="orange" textColor="white" style={{ width: 350 }}>
            Custom Button Color
          </Button>
          <Button color="grey" textColor="blue" style={{ width: 350 }}>
            Custom Text Color
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
