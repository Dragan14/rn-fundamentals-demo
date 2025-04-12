import { ScrollView } from "react-native";
import { useState } from "react";
import SafeAreaView from "@/components/SafeAreaView";
import View from "@/components/View";
import Text from "@/components/Text";
import SegmentedControl from "@/components/SegmentedControl";

export default function TextInputScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndex2, setSelectedIndex2] = useState(0);
  const [selectedIndex3, setSelectedIndex3] = useState(0);
  const [selectedIndex4, setSelectedIndex4] = useState([0]);
  const [selectedIndex5, setSelectedIndex5] = useState(0);

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
        <Text>I'm currently working on implementing this component myself</Text>
        <View style={{ gap: 10, width: 350 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Square
          </Text>
          <SegmentedControl
            values={["Tab One", "Tab Two"]}
            selectedIndex={selectedIndex}
            onTabPress={setSelectedIndex}
            tabStyle={{ minHeight: 30 }}
          />
        </View>
        <View style={{ gap: 10, width: 350 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Round
          </Text>
          <SegmentedControl
            values={["Tab One", "Tab Two"]}
            selectedIndex={selectedIndex2}
            onTabPress={setSelectedIndex2}
            round={true}
            tabStyle={{ minHeight: 30 }}
          />
        </View>
        <View style={{ gap: 10, width: 350 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Three Tabs
          </Text>
          <SegmentedControl
            values={["Tab One", "Tab Two", "Tab Three"]}
            selectedIndex={selectedIndex3}
            onTabPress={setSelectedIndex3}
            tabStyle={{ minHeight: 30 }}
          />
        </View>
        <View style={{ gap: 10, width: 350 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Multiple Selections
          </Text>
          <SegmentedControl
            values={["Tab One", "Tab Two", "Tab Three", "Tab Four"]}
            multiple={true}
            selectedIndices={selectedIndex4}
            onTabPress={(index) => {
              setSelectedIndex4((prev) => {
                if (prev.includes(index)) {
                  return prev.filter((i) => i !== index);
                }
                return [...prev, index];
              });
            }}
            tabStyle={{ minHeight: 30 }}
          />
        </View>
        <View style={{ gap: 10, width: 350 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Disabled
          </Text>
          <SegmentedControl
            values={["Tab One", "Tab Two"]}
            tabStyle={{ minHeight: 30 }}
            enabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
