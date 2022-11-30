import { Text, TouchableOpacity, View } from "react-native";
import { Course, User } from "../../../types";
import { courseListingStyle } from "../../css/styles";

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
    <View style={courseListingStyle.listingComponent}>
      <View style={courseListingStyle.listing}>
        <View style={{ flexDirection: "row" }}>
          <View style={courseListingStyle.listingHeader}>
            <Text style={courseListingStyle.listingHeaderCode}>
              {course.course_code} •{" "}
            </Text>
            <Text style={courseListingStyle.listingHeaderSchedule}>
              {course.schedule}
            </Text>
          </View>
          <View style={courseListingStyle.listingHeaderDelete}>
            <TouchableOpacity
              testID="DeleteCourse"
              onPress={() => {
                editSchedule(user, course, "delete");
              }}
            >
              <Text style={courseListingStyle.deleteListing}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={courseListingStyle.listingTitle}>{course.title}</Text>
      </View>
    </View>
  );
};
