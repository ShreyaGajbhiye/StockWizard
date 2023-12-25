import React, { useState, useEffect } from "react";
import { Container, Button, Row,Table, Form,Modal } from "react-bootstrap";
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
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateData, setUpdateData] = useState({
    inventoryId: "",
    productName: "",
    quantity: "",
    cost: "",
    weight: "",
    expiry: "",
    mfg: "",
    category: "",
    storeName: "",
    city: "",
  });

  
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
    console.log("in update")
    // find the item with the given id from the inventory array
    const selectedItem = inventory.find((item) => item.id === id);

      console.log(selectedItem)
    // populate the update form with the item data
    setUpdateData(selectedItem);

    // show the update form
    setShowUpdateForm(true);

  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    // check if the updated inventoryId already exists in the inventory list with a different id
    const isDuplicate = inventory.some(
      (item) =>
        item.id !== updateData.id && item.inventoryId === updateData.inventoryId
    );
    if (isDuplicate) {
      alert("Inventory Id already exists!");
      return;
    }

    // update the item in Firebase
    database.ref("Inventory").child(updateData.id).update({
      inventoryId: updateData.inventoryId,
      productName: updateData.productName,
      quantity: updateData.quantity,
      cost: updateData.cost,
      weight: updateData.weight,
      expiry: updateData.expiry,
      mfg: updateData.mfg,
      category: updateData.category,
      storeName: updateData.storeName,
      city: updateData.city,
    });
    

    // hide the update form
    setShowUpdateForm(false);
  };

  const handleUpdateChange = (e) => {
    console.log("in update")
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };


  return (
    <>
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
          <th >Actions</th>
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
            <td>
              <Button variant="warning"  onClick={() => handleUpdate(item.id)} > 
                Update
              </Button>{" "}
              <Button variant="danger" onClick={() => handleDelete(item.id) }>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    <Modal show={showUpdateForm} onHide={() => setShowUpdateForm(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Update Inventory Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
  <Form onSubmit={handleUpdateSubmit}>
    <Form.Group controlId="formInventoryId">
      <Form.Label>Inventory Id</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter inventory id"
        name="inventoryId"
        value={updateData.inventoryId}
        onChange={handleUpdateChange}
        required
      />
    </Form.Group>

    <Form.Group controlId="formProductName">
      <Form.Label>Product Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter product name"
        name="productName"
        value={updateData.productName}
        onChange={handleUpdateChange}
        required
      />
    </Form.Group>

    <Form.Group controlId="formQuantity">
      <Form.Label>Quantity(/Case)</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter quantity"
        name="quantity"
        value={updateData.quantity}
        onChange={handleUpdateChange}
        required
      />
    </Form.Group>

    <Form.Group controlId="formCost">
      <Form.Label>Cost ($)</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter cost"
        name="cost"
        value={updateData.cost}
        onChange={handleUpdateChange}
        required
      />
    </Form.Group>

    <Form.Group controlId="formWeight">
      <Form.Label>Weight (lbs)</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter weight"
        name="weight"
        value={updateData.weight}
        onChange={handleUpdateChange}
        required
      />
    </Form.Group>

    <Form.Group controlId="formExpiry">
      <Form.Label>Expiry</Form.Label>
      <Form.Control
        type="date"
        placeholder="Enter expiry date"
        name="expiry"
        value={updateData.expiry}
        onChange={handleUpdateChange}
        required
      />
    </Form.Group>

    <Form.Group controlId="formMfg">
      <Form.Label>MFD</Form.Label>
      <Form.Control
        type="date"
        placeholder="Enter manufacturing date"
        name="mfg"
        value={updateData.mfg}
        onChange={handleUpdateChange}
        required
      />
    </Form.Group>

    <Form.Group controlId="formCategory">
      <Form.Label>Category</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter category"
        name="category"
        value={updateData.category}
        onChange={handleUpdateChange}
        required
      />
    </Form.Group>

    <Form.Group controlId="formStoreName">
      <Form.Label>Store Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter store name"
        name="storeName"
        value={updateData.storeName}
        onChange={handleUpdateChange}
        required
      />
    </Form.Group>

    <Form.Group controlId="formCity">
      <Form.Label>City</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter city"
        name="city"
        value={updateData.city}
        onChange={handleUpdateChange}
        required
      />
    </Form.Group>
<div>
<br />
</div>
    <Button variant="primary" type="submit">
      Update
    </Button>{" "}
    <Button variant="secondary" onClick={() => setShowUpdateForm(false)}>
      Cancel
    </Button>
  </Form>
   </Modal.Body>
   </Modal>
)
</>
)};

const dashboard = () => {
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
              <AddInventory />
              </div>
              <InventoryTable />
            </div>
          </Row>
        </Container>
      </div>
    </section>
  );
};
export default dashboard;
