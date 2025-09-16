import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import commonRoutes from "./commonRoutes";
import NotFoundPage from "../pages/common/NotFoundPage";
import authRoutes from "./authRoutes";

const router: RouteObject[] = [
  ...commonRoutes,
  ...authRoutes,

  { path: "*", element: <NotFoundPage /> },
];

const Routes = createBrowserRouter(router);
export const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={Routes} />
    </>
  );
};
