import { RouteObject } from "react-router-dom";

import HomePage from "../pages/common/HomePage";
import PrivacyPage from "../pages/common/PrivacyPage";
import ContactPage from "../pages/common/ContactPage";
import CommonLayouts from "../components/layouts/commonLayouts";

const authRoutes: RouteObject[] = [
  {
    element: <CommonLayouts />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/privacy",
        element: <PrivacyPage />,
      },
      { path: "/contact", element: <ContactPage /> },
    ],
  },
];
export default authRoutes;
