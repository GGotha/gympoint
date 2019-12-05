import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Recsenha from "./pages/Recsenha";
import Meetups from "./pages/Meetups";
import Inscricoes from "./pages/Inscricoes";

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          Login,
          Signup
        }),
        App: createBottomTabNavigator(
          {
            Meetups,
            Inscricoes,
            Recsenha
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: "#FFF",
              inactiveTintColor: "rgba(255, 255, 255, 0.6)",
              style: {
                backgroundColor: "#2B1A2F"
              }
            }
          }
        )
      },
      {
        initialRouteName: isSigned ? "App" : "Sign"
      }
    )
  );
