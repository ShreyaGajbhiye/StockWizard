import React, { useState, useRef } from "react";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Landingpage from "./components/Landingpage/LandingPage";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Signup/Signup";
import Footer from "./components/Footer/footer";
import AddInventory from "./components/AddInventory/inventory"
import dashboard from "./components/Landingpage/dashboard";
import ChartsPage from "./components/Landingpage/chart"

// import handleSubmit from "./handles/handlesubmit";

const App = (props) => {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Route path="/" component={Landingpage} exact />
        <Route path="/login" component={() => <Login />} exact />
        <Route path="/signup" component={() => <Signup />} exact />
        {/* <Route path="/inventory" component={() => <AddInventory />} exact /> */}
        <Route path="/dashboard" component={dashboard} exact />
        <Route path="/chart" component={ChartsPage} exact />
        {/* <About />
        <Contact /> */}
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
