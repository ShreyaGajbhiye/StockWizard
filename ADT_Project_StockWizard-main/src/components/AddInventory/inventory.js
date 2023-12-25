import React, { forwardRef, useState, useRef } from "react";
import "./Inventory.css";
import { database } from '../../firebase_setup/firebase';
import { Form, Button, Modal } from "react-bootstrap";

const AddInventory = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [inventoryData, setInventoryData] = useState({
    inventoryId: "",
    storeName: "",
    city: "",
    productName: "",
    quantity: "",
    cost: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInventoryData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const inventoryRef = database.ref("Inventory");
  
    // Check if another item with the same inventoryId already exists
    inventoryRef.orderByChild("inventoryId")
      .equalTo(inventoryData.inventoryId)
      .once("value", snapshot => {
        if (snapshot.exists()) {
          alert("An item with the same inventoryId already exists.");
        } else {
          // Push the data to the database
          inventoryRef.push(inventoryData);
          setInventoryData({
            inventoryId: "",
            storeName: "",
            city: "",
            productName: "",
            quantity: "",
            cost: "",
            weight:"",
            expiry:"",
            mfg:"",
            category:""
          });
          handleClose();
        }
      });
  };
  
  return (
    <>
      <Button variant="primary" onClick={handleShow} id="Invbutton">
        Add Item
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Inventory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="inventoryId">
              <Form.Label>Inventory Id</Form.Label>
              <Form.Control
                type="text"
                name="inventoryId"
                value={inventoryData.inventoryId}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="storeName">
              <Form.Label>Store Name</Form.Label>
              <Form.Control
                type="text"
                name="storeName"
                value={inventoryData.storeName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={inventoryData.city}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                value={inventoryData.productName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={inventoryData.quantity}
                onChange={handleInputChange}
                min={0}
              />
            </Form.Group>
            <Form.Group controlId="cost">
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type="number"
                name="cost"
                value={inventoryData.cost}
                onChange={handleInputChange}
                min={0}
              />
            </Form.Group>
  
            <Form.Group controlId="weight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="number"
                name="weight"
                value={inventoryData.weight}
                onChange={handleInputChange}
                min={0}
              />
            </Form.Group>
  
            <Form.Group controlId="expiry">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                name="expiry"
                value={inventoryData.expiry}
                onChange={handleInputChange}
              />
            </Form.Group>
  
            <Form.Group controlId="mfg">
              <Form.Label>Manufacture Date</Form.Label>
              <Form.Control
                type="date"
                name="mfg"
                value={inventoryData.mfg}
                onChange={handleInputChange}
              />
            </Form.Group>
  
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={inventoryData.category}
                onChange={handleInputChange}
              />
            </Form.Group>
            <div>
            <br />
            </div>
  
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
// export const handleShow = handleShow;
export default AddInventory;

