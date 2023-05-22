import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Layout from "./layout/Layout";
import Hotels from "./pages/hotel/Hotels";
import AddHotel from "./pages/new-hotel/AddHotel";
import Rooms from "./pages/room/Rooms";
import AddRoom from "./pages/new-room/AddRoom";
import Transaction from "./pages/transaction/transaction";
import Login from "./pages/login/Login";

import { useSelector } from "react-redux";
import EditHotel from "./pages/edit-hotel/EditHotel";
import EditRoom from "./pages/edit-room/EditRoom";

function App() {
  const isLogin = useSelector((state) => state.isLogin);

  return (
    <BrowserRouter>
      {!isLogin && (
        <Routes>
          <Route index path="/login" element={<Login />} />
        </Routes>
      )}

      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/add-hotel" element={<AddHotel />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/edit-hotel/:hotelId" element={<EditHotel />} />
          <Route path="/edit-room/:roomId" element={<EditRoom />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
