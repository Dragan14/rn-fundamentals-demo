import { ScrollView } from "react-native";
import SafeAreaView from "@/components/SafeAreaView";
import View from "@/components/View";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { Camera } from "lucide-react-native";
import { PersonStanding } from "lucide-react-native";

export default function ButtonScreen() {
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
            Button Variants
          </Text>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="error">Error</Button>
          <Button variant="success">Success</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="elevated">Elevated</Button>
        </View>
        <View style={{ gap: 10, width: 350 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Button Icons
          </Text>
          <Button
            variant="primary"
            leftIcon={<PersonStanding />}
            style={{ maxWidth: 350 }}
          >
            Left Icon
          </Button>
          <Button
            variant="outlined"
            rightIcon={<Camera />}
            style={{ maxWidth: 350 }}
          >
            Right Icon
          </Button>
          <Button
            variant="elevated"
            leftIcon={<PersonStanding />}
            rightIcon={<Camera />}
          >
            Both Icons
          </Button>
        </View>
        <View style={{ gap: 10, width: 350 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Additional Properties
          </Text>
          <Button style={{ maxWidth: 350 }} disabled={true}>
            Disabled
          </Button>
          <Button variant="tertiary" round={true}>
            Round
          </Button>
          <Button variant="tertiary" loading={true}>
            Loading
          </Button>
        </View>
        <View style={{ gap: 10, width: 350 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Customisation Example
          </Text>
          <Button
            variant="elevated"
            rightIcon={<Camera />}
            round={true}
            color="pink"
            textColor="red"
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              marginHorizontal: "auto",
            }}
            contentContainerStyle={{ padding: 0 }}
          ></Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
