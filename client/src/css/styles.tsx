import { StyleSheet } from "react-native";
import { YALE_HEX } from "../constants";

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
