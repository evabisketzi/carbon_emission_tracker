// Implementation taken from
// https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03?utm_source=reactdigest&utm_medium&utm_campaign=1655
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../../services/auth_services";
import { ProtectedRoute } from "../../components/protected_route";
import { AddTripPath, UserProfilePath, ViewTripsPath } from "../../path_constants";
import { AddTripPage } from "../add_trips/add_trip";
import { Sidebar } from "../navigation/sidebar";
import { LoginPage } from "../login/login-page";


const Routes = () => {
  const { token } = useAuth();

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/app",
      element: <ProtectedRoute />,
      children: [
        {
          path: UserProfilePath,
          element: (
            <div className="app-container">
              <Sidebar />
              <div className="page-display">
                <div>User Profile</div>
              </div>
            </div>
          ),
        },
        {
          path: AddTripPath,
          element: (
            <div className="app-container">
              <Sidebar />
              <div className="page-display">
                <AddTripPage/>
              </div>
            </div>
          ),
        },
        {
          path: ViewTripsPath,
          element: (
            <div className="app-container">
              <Sidebar />
              <div className="page-display">
                <div>View trips</div>
              </div>
            </div>
          ),
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <div>Welcome to the Trip CO2 emission app</div>,
    },
    {
      path: "/login",
      element: <LoginPage/>,
    }
  ];

  // Create the router with all routes
  const router = createBrowserRouter([
    ...(token ? routesForAuthenticatedOnly : routesForNotAuthenticatedOnly),
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
