import { render } from "@testing-library/react-native";
import React from "react";
import { ReactNativeMap } from "../src/components/map/ReactNativeMap";
import { mockCoords, mockWatson } from "./mockData/buildingMock";

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

  class MockPolygon extends React.Component {
    render() {
      return React.createElement("Polygon", this.props, this.props.children);
    }
  }

  MockCallout.propTypes = MapView.Callout.propTypes;
  MockMarker.propTypes = MapView.Marker.propTypes;
  MockMapView.propTypes = MapView.propTypes;
  MockMapView.Marker = MockMarker;
  MockMapView.Callout = MockCallout;
  MockMapView.Polygon = MockPolygon;
  return MockMapView;
});

const renderMap = () => {
  const result = render(
    <ReactNativeMap
      selectedLocation={mockWatson}
      origin={mockCoords}
      buildings={[mockWatson]}
    />
  );
  return result;
};

describe("Testing map functionality", () => {
  test("Map renders with initial region centered around Yale University", async () => {
    const map = renderMap();
    const mapview = map.getByTestId("mapview-map");
    expect(mapview.props.initialRegion).toStrictEqual(yaleUni);
  });

  test("Map is zoomable", async () => {
    const map = renderMap();
    const mapview = map.queryByTestId("mapview-map");
    expect(mapview.props.zoomEnabled).toBe(true);
  });
});

var yaleUni = {
  latitude: 41.3163,
  longitude: -72.922585,
  latitudeDelta: 0.0622,
  longitudeDelta: 0.0121,
};
