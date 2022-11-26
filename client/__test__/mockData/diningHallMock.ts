import { Building } from "../../types";
import { colleges } from "./collegesMock";

const commonsMock: Building = {
  _id: "636af734cd21662437d3d536",
  abbreviation: "Sc",
  address: "Grove Street, 168, New Haven, Ct, 06511",
  coords: {
    latitude: 41.311803,
    longitude: -72.926478,
  },
  name: "Schwarzman Center",
  tile: [
    {
      latitude: 41.311558239660066,
      longitude: -72.92626440525056,
    },
    {
      latitude: 41.3114726152671,
      longitude: -72.92623758316041,
    },
    {
      latitude: 41.31147664465282,
      longitude: -72.92587950825691,
    },
    {
      latitude: 41.31151190176725,
      longitude: -72.92582117021085,
    },
    {
      latitude: 41.31154161846317,
      longitude: -72.92579233646394,
    },
    {
      latitude: 41.31159148204116,
      longitude: -72.92577892541887,
    },
    {
      latitude: 41.31163580518958,
      longitude: -72.92579501867296,
    },
    {
      latitude: 41.31166955120283,
      longitude: -72.92583122849466,
    },
    {
      latitude: 41.31168617236711,
      longitude: -72.9258667677641,
    },
    {
      latitude: 41.31169624579796,
      longitude: -72.92591504752637,
    },
    {
      latitude: 41.31169272009733,
      longitude: -72.92596332728864,
    },
    {
      latitude: 41.311707830241495,
      longitude: -72.92594656348228,
    },
    {
      latitude: 41.31173150279361,
      longitude: -72.9260089248419,
    },
    {
      latitude: 41.31178589926383,
      longitude: -72.92596735060215,
    },
    {
      latitude: 41.31213594953714,
      longitude: -72.92680084705354,
    },
    {
      latitude: 41.31190577280645,
      longitude: -72.92696513235569,
    },
    {
      latitude: 41.31187130830014,
      longitude: -72.92688139714302,
    },
    {
      latitude: 41.31182772409416,
      longitude: -72.92691588474555,
    },
  ],
};

export const diningHalls: Array<Building> = colleges.concat(commonsMock);
