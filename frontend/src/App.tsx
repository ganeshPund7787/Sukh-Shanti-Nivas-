import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import Register from "./pages/Register";

const App = () => {
  return (
    <BrowserRouter>
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
              <span>Search Page</span>
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
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
