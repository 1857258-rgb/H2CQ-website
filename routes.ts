import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import Home from "./pages/Home";
import Components from "./pages/Components";
import BuildSpecs from "./pages/BuildSpecs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "components", Component: Components },
      { path: "build", Component: BuildSpecs },
    ],
  },
]);
