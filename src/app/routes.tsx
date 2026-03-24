import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import CustomOrders from "./pages/CustomOrders";
import Contact from "./pages/Contact";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "custom-orders", Component: CustomOrders },
      { path: "contact", Component: Contact },
    ],
  },
]);
