import { StyleSheet } from "react-native";
import { YALE_HEX } from "../constants";
import { Dimensions } from "react-native";

// constants used for MapBanner
export const { width, height } = Dimensions.get("window");
export const BANNER_HEIGHT = -height / 2.9;
export const COLLAPSED_BANNER_HEIGHT = -height / 7;
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width;
const MAX_PADDING_BUTTON = Math.max(15, height / 70);

export const editScheduleStyle = StyleSheet.create({
  header: {
    paddingTop: "12%",
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
    display: "flex",
    backgroundColor: "white",
  },
  back: {
    color: YALE_HEX,
    borderColor: YALE_HEX,
    borderRadius: 40,
    backgroundColor: "white",
    alignSelf: "center",
  },
  heading: {
    width: "80%",
    marginTop: 30,
    marginBottom: 20,
    padding: "15%",
    fontWeight: "bold",
    fontSize: 18,
    paddingVertical: 15,
  },
});

export const homeScreenStyle = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingTop: "12%",
    flex: 1,
    position: "absolute",
    justifyContent: "space-between",
  },
  profile: {
    borderColor: YALE_HEX,
    borderWidth: 2,
    borderRadius: 40,
    backgroundColor: "white",
    fontSize: 10,
    padding: "15%",
    paddingVertical: "22%",
  },
});

export const signInScreenStyle = StyleSheet.create({
  header: {
    paddingTop: "12%",
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
    display: "flex",
    backgroundColor: "white",
  },
  signIn: {
    width: "75%",
    padding: 20,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
    backgroundColor: YALE_HEX,
    marginBottom: 20,
  },
  noSignIn: {
    width: "75%",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
    backgroundColor: "white",
    borderColor: YALE_HEX,
    borderWidth: 2,
  },
  view: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    padding: 25,
  },
  logo: {
    padding: 20,
  },
  back: {
    color: YALE_HEX,
    borderColor: YALE_HEX,
    borderRadius: 40,
    backgroundColor: "white",
  },
});

export const userProfileStyle = StyleSheet.create({
  view: {
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    maxWidth: 400,
    display: "flex",
    backgroundColor: "white",
    padding: 20,
  },
  profile: {
    borderColor: YALE_HEX,
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 40,
    backgroundColor: "white",
    padding: 7,
  },
  heading: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    width: 200,
    padding: 20,
  },
  info: {
    textAlign: "center",
    width: 200,
    padding: 10,
  },
  selection: {
    padding: 20,
  },
});

export const mapBannerStyle = StyleSheet.create({
  directions: {
    height: "75%",
    marginBottom: "25%",
  },
  timeContainer: {
    flex: 0.3,
    padding: 20,
    paddingLeft: 30,
    flexDirection: "column",
  },
  timeText: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
  stepsContainer: {
    flex: 0.7,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  text: {
    margin: 5,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "grey",
    alignSelf: "center",
    borderRadius: 3,
    marginTop: 15,
  },
  card: {
    marginVertical: 40,
    backgroundColor: "#FFF",
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    borderRadius: 20,
  },
  scrollView: {
    zIndex: 1,
    position: "absolute",
    width: "100%",
    height: height,
    top: height,
    backgroundColor: "white",
    borderRadius: 25,
    borderColor: YALE_HEX,
    borderWidth: 2,
  },
  button: {
    position: "absolute",
    bottom: height / 12,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: YALE_HEX,
    width: "40%",
    borderRadius: 10,
    padding: MAX_PADDING_BUTTON,
  },
});

export const navigationBarStyle = StyleSheet.create({
  footer: {
    zIndex: 999,
    shadowColor: "black",
    shadowRadius: 20,
    marginTop: "0%",
    flex: 1,
    position: "relative",
    alignSelf: "center",
    backgroundColor: "white",
    borderColor: YALE_HEX,
    borderWidth: 2,
    width: "120%",
    height: "100%",
  },
});

export const courseListingStyle = StyleSheet.create({
  listingComponent: {
    paddingTop: 25,
  },
  listing: {
    padding: 10,
    borderColor: YALE_HEX,
    borderWidth: 2,
    borderRadius: 10,
    width: 300,
    backgroundColor: "white",
  },
  listingHeader: {
    width: "95%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
  },
  listingHeaderCode: {
    fontWeight: "bold",
  },
  listingHeaderSchedule: {
    fontStyle: "normal",
  },
  listingHeaderDelete: { width: "10%" },
  listingTitle: {
    fontStyle: "italic",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  deleteListing: {
    color: "red",
    fontWeight: "bold",
    fontSize: 17,
  },
});

export const scheduleFormStyle = StyleSheet.create({
  container: {
    padding: 60,
    alignItems: "center",
  },
  form_title: {
    textAlign: "center",
    fontSize: 18,
  },
  searchComponent: {
    padding: "2%",
    paddingLeft: "4%",
    flex: 1,
  },
  searchBar: {
    elevation: 0,
    borderColor: YALE_HEX,
    borderWidth: 2,
    borderRadius: 40,
    width: 300,
    backgroundColor: "white",
  },
  resultsComponent: {
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255, 0.8)",
  },
  courseListings: {
    padding: 10,
  },
});

export const campusSpotsStyle = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "65%",
  },
});

export const searchStyle = StyleSheet.create({
  searchComponent: {
    padding: "2%",
    paddingLeft: "4%",
    flex: 1,
  },
  searchBar: {
    elevation: 0,
    borderColor: YALE_HEX,
    borderWidth: 2,
    borderRadius: 40,
    backgroundColor: "white",
  },
  resultsComponent: {
    paddingLeft: "4%",
    paddingRight: "4%",
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255, 0.8)",
  },
});

export const searchResultStyle = StyleSheet.create({
  resultTitle: {
    padding: "4%",
    paddingBottom: 0,
    fontSize: 12,
    fontWeight: "bold",
  },
  resultInfo: {
    paddingTop: 0,
    padding: "4%",
    fontSize: 8,
  },
});

export const spotButtonStyle = StyleSheet.create({
  button: {
    backgroundColor: "white",
    padding: "4%",
    marginHorizontal: "5%",
    borderRadius: 40,
    borderColor: YALE_HEX,
    borderWidth: 2,
  },
  button_active: {
    backgroundColor: YALE_HEX,
  },
  text_active: {
    color: "white",
  },
  text: {
    color: YALE_HEX,
    alignSelf: "center",
    fontSize: 12,
  },
});

export const nextClassStyle = StyleSheet.create({
  nextClass: {
    padding: "2%",
    backgroundColor: "white",
  },
});
