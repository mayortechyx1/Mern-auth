import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
      <Route path="" element= {<MainLayout />} >
        <Route path="/login" element= {<Login />} />
        <Route path="/register" element= {<Register />} />
        <Route path="*" element= {<NotFound />} />
        
        {/* Private Routes */}
        <Route path="" element= {<PrivateRoute />}>
          <Route path="/profile" element= {<Profile />} />
        </Route>
      </Route>
  ));

  return <RouterProvider router={router} />
}

export default App