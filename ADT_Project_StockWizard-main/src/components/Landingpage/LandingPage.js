import React, { useState, useEffect } from "react";
import { Container, Button, Row,Table, Form } from "react-bootstrap";
import "./landingpage.css";
import AddInventory from "../AddInventory/inventory";
import { Link } from "react-router-dom";
import { database } from '../../firebase_setup/firebase';


const usersRef = database.ref("Inventory");
usersRef.once("value").then((snapshot) => {
  snapshot.forEach((userSnapshot) => {
    const user = userSnapshot.val();
    console.log(user);
  });
});
const InventoryTable = () => {
  const [inventory, setInventory] = useState([]);
  
  useEffect(() => {
    const databasee = database.ref("Inventory");
    databasee.on("value", (snapshot) => {
      const items = snapshot.val();
      const inventoryList = [];
      for (let id in items) {
        inventoryList.push({ id, ...items[id] });
      }
      // sort inventoryList by inventoryId
      inventoryList.sort((a, b) => a.inventoryId - b.inventoryId);
      setInventory(inventoryList);
    });
  }, []);

  const handleDelete = (id) => {
    database.ref(`Inventory/${id}`).remove();
  };

  const handleUpdate = (id) => {
    // TODO: implement update functionality
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Inventory Id</th>
          <th>Product Name</th>
          <th>Quantity(/Case)</th>
          <th>Cost ($)</th>
          <th>Weight (lbs)</th>
          <th>Expiry</th>
          <th>MFD</th>
          <th>Category</th>
          <th>Store Name</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((item) => (
          <tr key={item.id}>
            <td>{item.inventoryId}</td>
            <td>{item.productName}</td>
            <td>{item.quantity}</td>
            <td>{item.cost}</td>
            <td>{item.weight}</td>
            <td>{item.expiry}</td>
            <td>{item.mfg}</td>
            <td>{item.category}</td>
            <td>{item.storeName}</td>
            <td>{item.city}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
const landingpage = () => {
  return (
    <section id="Landing">
      <div className="main">
        <Container>
          <Row>
            <div className="intro-text">
              <div>
                <h1 className="title">StockWizard</h1>
                <p className="subtitle">
                  {" "}
                  Solution to all your Inventory Problems{" "}
                </p>
              </div>
              <div className="inventorybuttoncl">
              {/* <AddInventory /> */}
              </div>
              <InventoryTable />
            </div>
          </Row>
        </Container>
      </div>
    </section>
  );
};
export default landingpage;
