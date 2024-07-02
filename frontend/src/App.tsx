import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import SignIn from "./pages/SignIn";
import ProtectRoute from "./components/ProtectRoute";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";
import UpdateHotel from "./pages/UpdateHotel";
import Search from "./pages/Search";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <span>Home Page</span>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        <Route element={<ProtectRoute />}>
          <Route
            path="/add-hotel"
            element={
              <Layout>
                <AddHotel />
              </Layout>
            }
          />
          <Route
            path="/edit-hotel/:hotelId"
            element={
              <Layout>
                <UpdateHotel />
              </Layout>
            }
          />

          <Route
            path="/my-hotels"
            element={
              <Layout>
                <MyHotels />
              </Layout>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
