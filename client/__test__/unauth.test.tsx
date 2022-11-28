import { NavigationContainer } from "@react-navigation/native";
import UnauthStack from "../src/navigation/UnauthStack";
import renderer from "react-test-renderer";

describe("Testing not logged in", () => {
  test("Renders Correctly (integration test)", async () => {
    const component = (
      <NavigationContainer>
        <UnauthStack />
      </NavigationContainer>
    );
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
