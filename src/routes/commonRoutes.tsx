import { RouteObject } from "react-router-dom";

import HomePage from "../pages/common/HomePage";
import PrivacyPage from "../pages/common/PrivacyPage";
import ContactPage from "../pages/common/ContactPage";
import CommonLayouts from "../components/layouts/commonLayouts";
import FeaturesPage from "../pages/common/FeaturesPage";
import AboutPage from "../pages/common/AboutPage";

const commonRoutes: RouteObject[] = [
  {
    element: <CommonLayouts />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      { path: "/features", element: <FeaturesPage /> },
      {
        path: "/privacy",
        element: <PrivacyPage />,
      },
      { path: "/contact", element: <ContactPage /> },
      { path: "/about", element: <AboutPage /> },
    ],
  },
];
export default commonRoutes;
