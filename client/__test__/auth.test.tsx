import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "../src/navigation/AuthStack";
import renderer from "react-test-renderer";

describe("Testing logged in", () => {
  test("Renders correctly (integration test)", async () => {
    const component = (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
    const tree = renderer.create(component);
    expect(tree).toMatchSnapshot();
  });
});
