// src/components/product/UpdateProduct.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Card, Modal } from "react-bootstrap";
import ProductService from "../../services/ProductService";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
    // imgUrl: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const supplierId = localStorage.getItem("supplierId");

  useEffect(() => {
    if (id && supplierId) {
      ProductService.getProductById(id, supplierId)
        .then((response) => {
          const data = response.data;
          setProduct({
            name: data.name || "",
            price: data.price || "",
            quantity: data.quantity || "",
            category: data.category || "",
            description: data.description || "",
            // imgUrl: data.imgUrl || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setModalMessage("Failed to load product details.");
          setShowModal(true);
        });
    }
  }, [id, supplierId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: product.name,
        price: parseFloat(product.price),
        quantity: parseInt(product.quantity),
        category: product.category,
        description: product.description,
        // imgUrl: product.imgUrl,
      };

      const response = await ProductService.updateProduct(
        id,
        supplierId,
        payload
      );

      if (response && response.status === 200) {
        setModalMessage("Product updated successfully!");
      } else {
        setModalMessage("Failed to update product. Please try again.");
      }
      setShowModal(true);
    } catch (error) {
      console.error("Error updating product:", error);
      setModalMessage(
        "An error occurred while updating the product. Please try again."
      );
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (modalMessage === "Product updated successfully!") {
      navigate("/products");
    }
  };

  return (
    <div className="container mt-4">
      <Card className="p-4">
        <h2>Update Product</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </Form.Group>

          {/* <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="imgUrl"
              value={product.imgUrl}
              onChange={handleChange}
            />
          </Form.Group> */}

          <Button variant="success" type="submit" className="me-2">
            Update
          </Button>
          <Button variant="secondary" onClick={() => navigate("/products")}>
            Cancel
          </Button>
        </Form>
      </Card>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMessage === "Product updated successfully!"
              ? "Success"
              : "Error"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateProduct;
