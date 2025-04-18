import { ScrollView } from "react-native";
import SafeAreaView from "@/components/SafeAreaView";
import View from "@/components/View";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { useToast } from "@/context/ToastContext";
import { Camera, PersonStanding, XCircle } from "lucide-react-native";

export default function ToastScreen() {
  const { showToast, hideToast } = useToast();

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
            Top and Bottom Toast
          </Text>
          <Button
            onPress={() =>
              showToast({
                message: "Top toast",
                position: "top",
              })
            }
          >
            Show Top Toast
          </Button>
          <Button
            onPress={() =>
              showToast({
                message: "Bottom toast",
                position: "bottom",
              })
            }
          >
            Show Bottom Toast
          </Button>
        </View>
        <View style={{ gap: 10, width: 350 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Variants
          </Text>
          <Button
            onPress={() =>
              showToast({
                message: "Primary Variant",
                variant: "primary",
                position: "top",
              })
            }
            variant="primary"
          >
            Show Primary Variant
          </Button>
          <Button
            onPress={() =>
              showToast({
                message: "Secondary variant",
                variant: "secondary",
                position: "top",
              })
            }
            variant="secondary"
          >
            Show Secondary Variant
          </Button>
          <Button
            onPress={() =>
              showToast({
                message: "Tertiary variant",
                variant: "tertiary",
                position: "top",
              })
            }
            variant="tertiary"
          >
            Show Tertiary Variant
          </Button>
          <Button
            onPress={() =>
              showToast({
                message: "Success variant",
                variant: "success",
                position: "top",
              })
            }
            variant="success"
          >
            Show Success Variant
          </Button>
          <Button
            onPress={() =>
              showToast({
                message: "Warning variant",
                variant: "error",
                position: "top",
              })
            }
            variant="error"
          >
            Show Warning Variant
          </Button>
        </View>

        <View style={{ gap: 10, width: 350 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Elevated Toasts
          </Text>
          <Button
            onPress={() =>
              showToast({
                message: "Elevated primary toast",
                variant: "primary",
                elevated: true,
                position: "top",
              })
            }
            variant="primary"
            elevated={true}
          >
            Show Elevated Primary Toast
          </Button>
          <Button
            onPress={() =>
              showToast({
                message: "Elevated secondary toast",
                variant: "secondary",
                elevated: true,
                position: "top",
              })
            }
            variant="secondary"
            elevated={true}
          >
            Show Elevated Secondary Toast
          </Button>
          <Button
            onPress={() =>
              showToast({
                message: "Elevated tertiary toast",
                variant: "tertiary",
                elevated: true,
                position: "top",
              })
            }
            variant="tertiary"
            elevated={true}
          >
            Show Elevated Tertiary Toast
          </Button>
          <Button
            onPress={() =>
              showToast({
                message: "Elevated success toast",
                variant: "success",
                elevated: true,
                position: "top",
              })
            }
            variant="success"
            elevated={true}
          >
            Show Elevated Success Toast
          </Button>
          <Button
            onPress={() =>
              showToast({
                message: "Elevated error toast",
                variant: "error",
                elevated: true,
                position: "top",
              })
            }
            variant="error"
            elevated={true}
          >
            Show Elevated Error Toast
          </Button>
        </View>

        <View style={{ gap: 10, width: 350 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Outlined Toasts
          </Text>
          <Button
            onPress={() =>
              showToast({
                message: "Elevated primary toast",
                variant: "primary",
                outlined: true,
                position: "top",
              })
            }
            variant="primary"
            outlined={true}
          >
            Show Outlined Primary Toast
          </Button>
          <Button
            onPress={() =>
              showToast({
                message: "Elevated and Outlined toast",
                outlined: true,
                elevated: true,
                position: "top",
              })
            }
            outlined={true}
            elevated={true}
          >
            Show Outlined and Elevated Toast
          </Button>
          <Button
            onPress={() =>
              showToast({
                message: "Elevated secondary toast",
                variant: "secondary",
                outlined: true,
                position: "top",
              })
            }
            variant="secondary"
            outlined={true}
          >
            Show Outlined Secondary Toast
          </Button>
          <Button
            onPress={() =>
              showToast({
                message: "Elevated tertiary toast",
                variant: "tertiary",
                outlined: true,
                position: "top",
              })
            }
            variant="tertiary"
            outlined={true}
          >
            Show Outlined Tertiary Toast
          </Button>
          <Button
            onPress={() =>
              showToast({
                message: "Elevated success toast",
                variant: "success",
                outlined: true,
                position: "top",
              })
            }
            variant="success"
            outlined={true}
          >
            Show Outlined Success Toast
          </Button>
          <Button
            onPress={() =>
              showToast({
                message: "Elevated error toast",
                variant: "error",
                outlined: true,
                position: "top",
              })
            }
            variant="error"
            outlined={true}
          >
            Show Outlined Error Toast
          </Button>
        </View>

        <View style={{ gap: 10, width: 350 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Toast with Icons
          </Text>
          <Button
            onPress={() =>
              showToast({
                message: "Toast with left icon",
                variant: "primary",
                leftIcon: <PersonStanding />,
                position: "top",
              })
            }
            variant="primary"
          >
            Show Toast with Left Icon
          </Button>
          <Button
            onPress={() =>
              showToast({
                message: "Toast with right icon",
                variant: "secondary",
                rightIcon: <Camera />,
                position: "top",
              })
            }
            variant="secondary"
          >
            Show Toast with Right Icon
          </Button>
          <Button
            onPress={() =>
              showToast({
                message: "Toast with both icons",
                variant: "tertiary",
                leftIcon: <PersonStanding />,
                rightIcon: <Camera />,
                position: "top",
              })
            }
            variant="tertiary"
          >
            Show Toast with Both Icons
          </Button>
        </View>

        <View style={{ gap: 10, width: 350 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Customisation Example
          </Text>
          <Button
            onPress={() =>
              showToast({
                message: "Click X to close",
                variant: "primary",
                rightIcon: <XCircle onPress={hideToast} />,
                position: "top",
                rightIconContainerStyle: {
                  marginLeft: "auto",
                },
                style: {
                  borderRadius: 20,
                },
              })
            }
            variant="primary"
          >
            Show Toast
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
