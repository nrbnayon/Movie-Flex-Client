import { createBrowserRouter, Link } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import GuestRoute from "./GuestRoute";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import AllMovies from "../Pages/Home/AllMovies/AllMovies";
import ProtectedRoute from "./ProtectedRoute";
import { Helmet } from "react-helmet-async";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: (
      <p className="text-3xl font-bold min-h-screen flex justify-center items-center w-full mx-auto">
        Page Not Found Back To
        <Link to="/" className="btn btn-warning">
          Home
        </Link>
      </p>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },

      {
        path: "/register",
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        ),
      },
      {
        path: "/allMovies",
        element: (
          <ProtectedRoute>
            {" "}
            <Helmet>
              <title>MovieFlex | All Movies</title>
            </Helmet>
            <AllMovies />{" "}
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
