import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { map } from "./map";
import Login from "../components/Login";
import NotFoundPage from "../components/NotFound/NotFoundPage";
const MainRouter = () => {
  const router = createBrowserRouter([
    {
      path: map.login,
      element: <Login />,
    },
    {
      path: map.dashboard,
      // element:<Dashboard/>
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default MainRouter;
