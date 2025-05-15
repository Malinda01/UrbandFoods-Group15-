import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Card, Modal } from "react-bootstrap";
import ProductService from "../../services/ProductService";

const AddProduct = () => {
  const supplierId = localStorage.getItem("supplierId");

  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
    imageUrl: "",
    supplierId: localStorage.getItem("supplierId") || "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (id) {
      ProductService.getProductById(id)
        .then((response) =>
          setProduct({
            name: response.data.name,
            price: response.data.price,
            quantity: response.data.quantity,
            category: response.data.category,
            description: response.data.description,
            imageUrl: response.data.imgUrl,
            supplierId: response.data.supplierId,
          })
        )
        .catch(() => {
          setModalMessage("Failed to load product details.");
          setShowModal(true);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: product.name,
      price: parseFloat(product.price),
      quantity: parseInt(product.quantity),
      category: product.category,
      description: product.description,
      imgUrl: product.imageUrl,
      supplierId: product.supplierId,
    };

    try {
      const response = id
        ? await ProductService.updateProduct(id, payload)
        : await ProductService.createProduct(payload);

      setModalMessage(
        response.status === 200 || response.status === 201
          ? `Product ${id ? "updated" : "added"} successfully!`
          : "Failed to save product. Please try again."
      );
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setModalMessage(
        "An error occurred while saving the product. Please try again."
      );
    }
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/products");
  };

  return (
    <div className="container mt-4">
      <Card className="p-4">
        <h2>{id ? "Update Product" : "Add Product"}</h2>
        <Form onSubmit={handleSubmit}>
          {["name", "price", "quantity", "description", "imageUrl"].map(
            (field) => (
              <Form.Group className="mb-3" key={field}>
                <Form.Label>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Form.Label>
                <Form.Control
                  type={
                    field === "price" || field === "quantity"
                      ? "number"
                      : field === "description"
                      ? "textarea"
                      : "text"
                  }
                  name={field}
                  value={product[field]}
                  onChange={handleChange}
                  placeholder={`Enter product ${field}`}
                  required={field === "name" || field === "price"}
                />
              </Form.Group>
            )
          )}

          {/* Category Select */}
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {[
                "fruits",
                "vegetables",
                "dairy",
                "baked goods",
                "handmade crafts",
              ].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button variant="success" type="submit" className="me-2">
            {id ? "Update" : "Add"}
          </Button>
          <Button variant="secondary" onClick={() => navigate("/products")}>
            Cancel
          </Button>
        </Form>
      </Card>

      {/* Modal for feedback */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMessage.includes("successfully") ? "Success" : "Error"}
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

export default AddProduct;
