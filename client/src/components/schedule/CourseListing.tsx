import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Course, User } from "../../../types";
import { YALE_HEX } from "../../constants";

interface CourseListingInterface {
  user: User;
  course: Course;
  editSchedule: Function;
}

export const CourseListing: React.FC<CourseListingInterface> = ({
  user,
  course,
  editSchedule,
}: CourseListingInterface) => {
  return (
    <View style={styles.listingComponent}>
      <View style={styles.listing}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.listingHeader}>
            <Text style={styles.listingHeaderCode}>
              {course.course_code} •{" "}
            </Text>
            <Text style={styles.listingHeaderSchedule}>{course.schedule}</Text>
          </View>
          <View style={styles.listingHeaderDelete}>
            <TouchableOpacity
              onPress={() => {
                editSchedule(user, course, "delete");
              }}
            >
              <Text style={styles.deleteListing}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.listingTitle}>{course.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
