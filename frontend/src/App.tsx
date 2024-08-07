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
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
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
          path="/detail/:hotelId"
          element={
            <Layout>
              <Detail />
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
            path="/hotel/:hotelId/booking"
            element={
              <Layout>
                <Booking />
              </Layout>
            }
          />
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
          <Route
            path="/my-bookings"
            element={
              <Layout>
                <MyBookings />
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
