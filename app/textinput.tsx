import { useState } from "react";
import { ScrollView } from "react-native";
import SafeAreaView from "@/components/SafeAreaView";
import View from "@/components/View";
import TextInput from "@/components/TextInput";
import Text from "@/components/Text";
import { CircleCheckBig } from "lucide-react-native";
import { CircleUser } from "lucide-react-native";
import { Pencil } from "lucide-react-native";
import { CircleX } from "lucide-react-native";

export default function TextInputScreen() {
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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
            Clear Variant
          </Text>
          <TextInput
            placeholder="clear"
            variant="clear"
            retainErrorMessageSpace={false}
          />
          <TextInput
            placeholder="clear"
            variant="clear"
            topLabel="Top Label"
            retainErrorMessageSpace={false}
          />
          <TextInput
            placeholder="clear"
            variant="clear"
            leftLabel="Left Label"
            retainErrorMessageSpace={false}
          />
          <Text
            style={{ textAlign: "center", fontWeight: "500", fontSize: 14 }}
          >
            Outlined Variant
          </Text>
          <TextInput
            placeholder="outlined"
            variant="outlined"
            retainErrorMessageSpace={false}
          />
          <TextInput
            placeholder="outlined"
            variant="outlined"
            topLabel="Top Label"
            retainErrorMessageSpace={false}
          />
          <TextInput
            placeholder="outlined"
            variant="outlined"
            leftLabel="Left Label"
            retainErrorMessageSpace={false}
          />
          <Text
            style={{ textAlign: "center", fontWeight: "500", fontSize: 14 }}
          >
            Solid Variant
          </Text>
          <TextInput
            placeholder="solid"
            variant="solid"
            retainErrorMessageSpace={false}
          />

          <TextInput
            placeholder="solid"
            variant="solid"
            topLabel="Top Label"
            retainErrorMessageSpace={false}
          />
          <TextInput
            placeholder="solid"
            variant="solid"
            leftLabel="Left Label"
            retainErrorMessageSpace={false}
          />
        </View>
        <View style={{ gap: 10, width: 350 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Text Input Icons
          </Text>
          <TextInput
            placeholder="clear"
            variant="clear"
            leftLabel="Left Label"
            topLabel="Top Label"
            leftIcon={<CircleUser />}
            rightIcon={<CircleCheckBig />}
            retainErrorMessageSpace={false}
          />
          <TextInput
            placeholder="outlined"
            variant="outlined"
            leftLabel="Left Label"
            topLabel="Top Label"
            leftIcon={<CircleUser />}
            rightIcon={<CircleCheckBig />}
            retainErrorMessageSpace={false}
          />
        </View>
        <View style={{ gap: 10, width: 350 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Additional Properties
          </Text>
          <Text
            style={{ textAlign: "center", fontWeight: "500", fontSize: 14 }}
          >
            Disabled
          </Text>
          <TextInput
            placeholder="disabled"
            variant="outlined"
            disabled={true}
            retainErrorMessageSpace={false}
          />
          <Text
            style={{ textAlign: "center", fontWeight: "500", fontSize: 14 }}
          >
            Error Message
          </Text>
          <TextInput
            placeholder="error message"
            variant="outlined"
            error={true}
            errorMessage="This is an error message"
          />
          <Text
            style={{ textAlign: "center", fontWeight: "500", fontSize: 14 }}
          >
            Character Counter
          </Text>
          <TextInput
            value={value}
            onChangeText={setValue}
            placeholder="character counter"
            variant="outlined"
            counter={true}
            maxLength={10}
          />
        </View>
        <View style={{ gap: 10, width: 350 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Customisation Example
          </Text>
          <TextInput
            value={value2}
            onChangeText={setValue2}
            placeholder={value2 || "click on the pencil to edit"}
            variant="outlined"
            disabled={!isEditing}
            retainErrorMessageSpace={false}
            topLabel="Top Label"
            leftIcon={
              !isEditing ? (
                <Pencil
                  onPress={() => {
                    setIsEditing(!isEditing);
                  }}
                />
              ) : (
                <CircleCheckBig
                  onPress={() => {
                    setIsEditing(!isEditing);
                  }}
                />
              )
            }
            rightIcon={
              isEditing ? (
                <CircleX
                  onPress={() => {
                    setIsEditing(!isEditing);
                    setValue2("");
                  }}
                />
              ) : undefined
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
