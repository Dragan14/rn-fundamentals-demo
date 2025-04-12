import { ScrollView, Text } from "react-native";
import { useState } from "react";
import SafeAreaView from "@/components/SafeAreaView";
import View from "@/components/View";
import MyText from "@/components/Text";
import { SegmentedControl } from "@/components/SegmentedControl";
import {
  Camera,
  PersonStanding,
  Star,
  PlaneTakeoff,
  PlaneLanding,
} from "lucide-react-native";

export default function TextInputScreen() {
  const [selectedindices1, setSelectedindices1] = useState<number[]>([0]);
  const [selectedindices2, setSelectedindices2] = useState<number[]>([0]);
  const [selectedindices3, setSelectedindices3] = useState<number[]>([0]);
  const [selectedindices4, setSelectedindices4] = useState<number[]>([0]);
  const [selectedindices5, setSelectedindices5] = useState<number[]>([0]);
  const [selectedindices6, setSelectedindices6] = useState<number[]>([0]);
  const [selectedindices7, setSelectedindices7] = useState<number[]>([0]);

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
          <MyText
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Two Tabs
          </MyText>
          <SegmentedControl
            values={[<Text>Tab One</Text>, <Text>Tab Two</Text>]}
            selectedIndices={selectedindices1}
            onTabPress={(index) => {
              setSelectedindices1([index]);
            }}
          />
        </View>
        <View style={{ gap: 10, width: 350 }}>
          <MyText
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Three Tabs
          </MyText>
          <SegmentedControl
            values={[
              <Text>Tab One</Text>,
              <Text>Tab Two</Text>,
              <Text>Tab Three</Text>,
            ]}
            selectedIndices={selectedindices2}
            onTabPress={(index) => {
              setSelectedindices2([index]);
            }}
          />
        </View>
        <View style={{ gap: 10, width: 350 }}>
          <MyText
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Multiple Selections
          </MyText>
          <SegmentedControl
            values={[
              <Text>Tab One</Text>,
              <Text>Tab Two</Text>,
              <Text>Tab Three</Text>,
            ]}
            selectedIndices={selectedindices3}
            onTabPress={(index) => {
              if (selectedindices3.includes(index)) {
                setSelectedindices3(
                  selectedindices3.filter((i) => i !== index),
                );
              } else {
                setSelectedindices3([...selectedindices3, index]);
              }
            }}
          />
        </View>
        <View style={{ gap: 10, width: 350 }}>
          <MyText
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Icons
          </MyText>
          <SegmentedControl
            values={[
              <>
                <Camera />
                <Text>Tab One</Text>
              </>,
              <>
                <Text>Tab Two</Text>
                <PersonStanding />
              </>,
              <Star />,
            ]}
            selectedIndices={selectedindices4}
            onTabPress={(index) => {
              setSelectedindices4([index]);
            }}
          />
        </View>
        <View style={{ gap: 10, width: 350 }}>
          <MyText
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Round
          </MyText>
          <SegmentedControl
            round={true}
            values={[<Text>Tab One</Text>, <Text>Tab Two</Text>]}
            selectedIndices={selectedindices5}
            onTabPress={(index) => {
              setSelectedindices5([index]);
            }}
          />
        </View>
        <View style={{ gap: 10, width: 350 }}>
          <MyText
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Disabled
          </MyText>
          <SegmentedControl
            disabled={true}
            values={[<Text>Tab One</Text>, <Text>Tab Two</Text>]}
            selectedIndices={selectedindices6}
            onTabPress={(index) => {
              setSelectedindices6([index]);
            }}
          />
        </View>
        <View style={{ gap: 10, width: 350 }}>
          <MyText
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            Custom Styling
          </MyText>
          <SegmentedControl
            values={[<PlaneTakeoff size={40} />, <PlaneLanding size={40} />]}
            selectedIndices={selectedindices7}
            style={{ minHeight: 100 }}
            round={true}
            tabStyle={{ borderColor: "red" }}
            onTabPress={(index) => {
              setSelectedindices7([index]);
            }}
            activeTabStyle={{
              backgroundColor: "pink",
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
