import { RouteObject } from "react-router-dom";

import HomePage from "../pages/common/HomePage";
import PrivacyPage from "../pages/common/PrivacyPage";
import ContactPage from "../pages/common/ContactPage";
import CommonLayouts from "../components/layouts/commonLayouts";
import FeaturesPage from "../pages/common/FeaturesPage/FeaturesPage";
import AboutPage from "../pages/common/AboutPage";
import ProfilePage from "../pages/common/ProfilePage";
import SettingsPage from "../pages/common/SettingsPage";
import ProfileEditPage from "../pages/common/ProfileEditPage";

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
      { path: "/profile", element: <ProfilePage /> },
      { path: "/profile/edit/:userId", element: <ProfileEditPage /> },
      { path: "/settings", element: <SettingsPage /> },
    ],
  },
];
export default commonRoutes;
