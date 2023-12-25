import React, { useState, useEffect } from "react";
import { Container, Button, Row,Table, Form } from "react-bootstrap";
import AddInventory from "../AddInventory/inventory";
import { Link } from "react-router-dom";
import { database } from '../../firebase_setup/firebase';
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import "./landingpage.css";
Chart.register(CategoryScale);

const ChartsPage = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const loginButton = document.getElementById("Login-button");
          const signupButton = document.getElementById("Signup-button");
          const logoutButton = document.getElementById("logout-button");
          if (loginButton && signupButton) {
            loginButton.style.display = "none";
            signupButton.style.display = "none";
            logoutButton.style.display = "none";
          }

  useEffect(() => {
    const inventoryRef = database.ref("Inventory");
    inventoryRef.on("value", (snapshot) => {
      const inventoryData = snapshot.val();
      setInventoryData(inventoryData);
    });
  }, []);

  const processData = (data) => {
    const labels = Object.values(data).map((item) => item.productName);
    const values = Object.values(data).map((item) => item.quantity);

    const labels1= Object.values(data).map((item) => item.category);
    const values1= Object.values(data).map((item) => item.quantity);
    



    return {
      labels,
      datasets: [
        {
          label: "Inventory Quantity by Product Name",
          data: values,
          backgroundColor:[
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#8E24AA",
            "#4DB6AC",
            "#9CCC65",
            "#78909C",
            "#FFA726",
            "#26C6DA",
            "#7E57C2",
          ],
          //borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          
        },
      ],
    

    };

    
    
  };

  const chartData = processData(inventoryData);

  return (
    <div>
      <h1 class="centered" >Inventory Charts</h1>
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default ChartsPage;
