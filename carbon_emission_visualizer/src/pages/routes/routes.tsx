// Implementation taken from
// https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03?utm_source=reactdigest&utm_medium&utm_campaign=1655
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "../../components/protected_route";
import { AddTripPage } from "../add_trips/add_trip";
import { Sidebar } from "../navigation/sidebar";
import { LoginPage } from "../login/login-page";
import { ViewTripPage } from "../view_trips/view_trips_page";


const Routes = () => {

  const Layout = ({ children }: { children: React.ReactNode }) => (
    <div className="app-container">
      <Sidebar />
      <div className="page-display">
        {children}
      </div>
    </div>
  );

  // Create the router with all routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Welcome to the Trip CO2 emission app</div>
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/app",
      element: <ProtectedRoute />,
      children: [
        {
          path: "user-profile",
          element: (
            <Layout>
              <div>User Profile</div>
            </Layout>
          ),
        },
        {
          path: "add-trip",
          element: (
            <Layout>
              <AddTripPage/>
            </Layout>
          ),
        },
        {
          path: "view-trips",
          element: (
            <Layout>
              <ViewTripPage/>
            </Layout>
          ),
        },
      ],
    },
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
