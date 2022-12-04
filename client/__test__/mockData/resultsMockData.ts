import { MapDirectionsLegs } from "react-native-maps-directions";
import { Results } from "../../types";

const mockWatsonLegs: MapDirectionsLegs = [
  {
    distance: { text: "407 ft", value: 124 },
    duration: { text: "2 mins", value: 94 },
    end_address: "60 Sachem St, New Haven, CT 06511, USA",
    end_location: { lat: 41.3159538, lng: -72.9236477 },
    start_address: "Sachem St & Opp Hillhouse Ave, New Haven, CT 06511, USA",
    start_location: { lat: 41.3163083, lng: -72.922607 },
    steps: [
      {
        distance: { text: "217 ft", value: 66 },
        duration: { text: "1 min", value: 55 },
        end_location: { lat: 41.3159538, lng: -72.9236477 },
        html_instructions:
          'Turn <b>right</b> onto <b>Sachem St</b><div style="font-size:0.9em">Destination will be on the left</div>',
        maneuver: "turn-right",
        polyline: { points: "wnd{F~va|LIr@AFAJOpA" },
        start_location: { lat: 41.3157969, lng: -72.9228816 },
        travel_mode: "WALKING",
      },
    ],
    traffic_speed_entry: [],
    via_waypoint: [],
  },
];

export const mockResultWatson: Array<Results> = [
  {
    distance: 0.124,
    duration: 1.5666666666666667,
    step: 1,
    type: "WALKING",
    legs: mockWatsonLegs,
  },
];
