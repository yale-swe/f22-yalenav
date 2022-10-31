import React, {useState} from "react";
import {StyleSheet} from "react-native";
import {MAPBOX_AUTH_TOKEN} from "./mapbox.auth.js";
import MapboxGL from "@rnmapbox/maps";

MapboxGL.setAccessToken(MAPBOX_AUTH_TOKEN);

interface MapboxMapInterface {
    userLoc: number[] | undefined;
}

export const MapboxMap: React.FC<MapboxMapInterface> = ({
                                                            userLoc,
                                                        }: MapboxMapInterface) => {
    const [userCoordinates, setUserCoordinates] = useState([41.3163, 72.9223]);

    return (
        <MapboxGL.MapView style={styles.map}>
            <MapboxGL.Camera
                followZoomLevel={12}
                centerCoordinate={userCoordinates}
            />
            <MapboxGL.PointAnnotation coordinate={userCoordinates}/>
        </MapboxGL.MapView>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    map: {
        flex: 1,
    },
});
