import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Map } from "../src/components/map/Map";
import { mockWatson, mockCoords } from "./mockData/buildingMock";

const renderMap = () => {
  const result = render(
    <Map
      selectedLocation={mockWatson}
      origin={mockCoords}
      buildings={[mockWatson]}
    />
  );
};
