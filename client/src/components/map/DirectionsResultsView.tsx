import React from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Results } from "../../../types";
import { mapBannerStyle } from "../../css/styles";

interface DirectionsResultViewInterface {
  results: Array<Results> | undefined;
}

export const DirectionsResultView: React.FC<DirectionsResultViewInterface> = ({
  results,
}: DirectionsResultViewInterface) => {
  return (
    <>
      {results && (
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={mapBannerStyle.timeContainer}>
            <Text style={mapBannerStyle.timeText}>
              {Math.ceil(
                results.reduce((accumulator, current) => {
                  return accumulator + current.duration;
                }, 0)
              )}
            </Text>
            <Text style={mapBannerStyle.timeText}>min</Text>
          </View>
          <View style={mapBannerStyle.stepsContainer}>
            <View style={mapBannerStyle.directions}>
              <ScrollView>
                {results.map((result: any) => {
                  console.log(result);
                  if (result && result.type == "SHUTTLE") {
                    return (
                      <View style={{ flexDirection: "column" }}>
                        <Text style={{ alignSelf: "center", padding: 10 }}>
                          Hop on the shuttle... 🚎
                        </Text>
                        <Text
                          style={{
                            alignSelf: "center",
                            padding: 5,
                            color: "grey",
                          }}
                        >
                          {result.routeName} ↓ {result.duration} min
                        </Text>
                      </View>
                    );
                  } else if (result && result.legs && result.legs[0].steps) {
                    const navigationResults = result.legs[0].steps.map(
                      (step: any, i: number) => {
                        // Replace all html tags with a space. Add a space because some tags don't have spaces between and causes the text to
                        // not have any space between.
                        let instructions = step.html_instructions.replace(
                          /(<([^>]+)>)/gi,
                          " "
                        );
                        // Replace mutliple spaces with a single space
                        instructions = instructions.replace(/\s\s+/g, " ");
                        instructions = instructions.replace(
                          "Restricted usage road",
                          " "
                        );
                        return (
                          <View key={i} style={{ flexDirection: "column" }}>
                            <Text style={{ alignSelf: "center", padding: 10 }}>
                              {instructions}
                            </Text>
                            <Text
                              style={{
                                alignSelf: "center",
                                padding: 5,
                                color: "grey",
                              }}
                            >
                              {step.duration.text} ↓ {step.distance.text}
                            </Text>
                          </View>
                        );
                      }
                    );
                    return navigationResults;
                  }
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      )}
    </>
  );
};
