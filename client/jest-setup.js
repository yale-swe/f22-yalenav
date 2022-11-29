import React from "react";
import "react-native";
// include this line for mocking react-native-gesture-handler
import "react-native-gesture-handler/jestSetup";

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("react-native-maps", () => {
  const React = jest.requireActual("react");
  const MapView = jest.requireActual("react-native-maps");

  class MockCallout extends React.Component {
    render() {
      return React.createElement("Callout", this.props, this.props.children);
    }
  }

  class MockMarker extends React.Component {
    render() {
      return React.createElement("Marker", this.props, this.props.children);
    }
  }

  class MockMapView extends React.Component {
    render() {
      return React.createElement("MapView", this.props, this.props.children);
    }
  }

  MockCallout.propTypes = MapView.Callout.propTypes;
  MockMarker.propTypes = MapView.Marker.propTypes;
  MockMapView.propTypes = MapView.propTypes;
  MockMapView.Marker = MockMarker;
  MockMapView.Callout = MockCallout;
  return MockMapView;
});

global.__reanimatedWorkletInit = () => {};
jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock")
);
