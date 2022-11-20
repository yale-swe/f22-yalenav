import { SetStateAction, useEffect, useState } from "react";
import { FlatList, Keyboard, StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { Course, User } from "../../../types";
import { YALE_HEX } from "../../constants";
import {
  addCourseToSchedule,
  deleteCourseFromSchedule,
  getCourses,
  limitString,
  searchFilterCourses,
} from "../../utils";
import { SearchResult } from "../search/SearchResult";
import { CourseListing } from "./CourseListing";

interface ScheduleFormInterface {
  user: User;
}

export const ScheduleForm: React.FC<ScheduleFormInterface> = ({
  user,
}: ScheduleFormInterface) => {
  const [userProfile, setUserProfile] = useState<User>(user);

  // Load Yale courses
  const [courses, setCourses] = useState<Course[]>([]);
  const [userCourses, setUserCourses] = useState<Course[]>(
    userProfile.courses ?? []
  );

  useEffect(() => {
    const retrieveAllCourses = async () => {
      const allCourses = await getCourses();
      setCourses(
        allCourses.filter((c: Course) => {
          return !userCourses.some(
            (userCourse: Course) => userCourse.title === c.title
          );
        })
      );
    };
    retrieveAllCourses();
  }, [userCourses]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [queryComplete, setQueryComplete] = useState<Boolean>(false);
  const [resultsVisible, setResultsVisible] = useState<Boolean>(false);

  const onChangeSearch = (query: SetStateAction<string>) => {
    setQueryComplete(false);
    setSearchQuery(query);
  };

  const editSchedule = async (user: User, course: Course, action: string) => {
    // post the course to DB
    const updatedUser =
      action === "add"
        ? await addCourseToSchedule(user, course.course_code)
        : action === "delete"
        ? await deleteCourseFromSchedule(user, course.course_code)
        : user;
    if (updatedUser) {
      setUserProfile(updatedUser);
      setUserCourses(updatedUser.courses ?? []);
    }
  };

  const onDoneSearch = (course: Course) => {
    setSearchQuery("");
    editSchedule(user, course, "add");
    Keyboard.dismiss();
    setQueryComplete(true);
  };

  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  useEffect(() => {
    // results should be visible (1) search query is non-empty, (2) not done searching
    setResultsVisible(searchQuery && !queryComplete ? true : false);

    const updatedCourses = courses.filter((course) => {
      // utils function to filter the terms
      return searchFilterCourses(course, searchQuery);
    });

    setFilteredCourses(updatedCourses);
  }, [searchQuery, queryComplete]);

  return (
    <View>
      <Searchbar
        autoCorrect={false}
        style={styles.searchBar}
        inputStyle={{ fontSize: 13 }}
        placeholder="Search for a Yale course..."
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {resultsVisible ? (
        <FlatList
          style={styles.resultsComponent}
          data={filteredCourses}
          renderItem={({ item }) => (
            <SearchResult
              obj={item}
              title={item.course_code}
              info={limitString(item.title, 50)}
              onDoneSearch={onDoneSearch}
            />
          )}
          keyExtractor={(item) => item._id}
        />
      ) : (
        userCourses.map((c: any) => (
          <CourseListing
            user={userProfile}
            course={c}
            editSchedule={editSchedule}
            key={c._id}
          />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
