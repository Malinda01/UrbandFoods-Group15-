import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Form } from "react-bootstrap";
import ProductService from "../../services/ProductService";

const DisplayProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchProducts = () => {
    const supplierId = localStorage.getItem("supplierId");
    console.log("Retrieved supplierId:", supplierId);

    if (!supplierId) {
      console.error("No supplier ID found in localStorage!");
      return;
    }

    ProductService.getProductsBySupplier(supplierId)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setProducts([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    ProductService.deleteProduct(id)
      .then(() => {
        setProducts(products.filter((product) => product.productId !== id));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const handleRefresh = () => {
    fetchProducts();
  };

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="products-title">Products</h2>
        <div className="d-flex">
          <Button
            variant="success"
            size="lg"
            onClick={() => navigate("/add-product")}
            className="me-2"
          >
            Add Product
          </Button>
          <Button variant="secondary" size="lg" onClick={handleRefresh}>
            Refresh
          </Button>
        </div>
      </div>
      <Form className="mb-4 d-flex">
        <Form.Control
          type="text"
          placeholder="Search products by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="me-2"
        />
        <Button variant="primary" onClick={fetchProducts}>
          Search
        </Button>
      </Form>

      {/* Display products */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            {/* <th>Image</th> */}
            <th>Supplier ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product.productId}>
              <td>{index + 1}</td>
              <td>{product.productId}</td>
              <td>{product.name || "Unnamed Product"}</td>
              <td>{product.category || "N/A"}</td>
              <td>${product.price?.toFixed(2) || "N/A"}</td>
              <td>{product.quantity ?? "N/A"}</td>
              <td>{product.description || "N/A"}</td>
              {/* <td>
                {product.imgUrl ? (
                  <img
                    src={product.imgUrl}
                    alt="Product"
                    style={{ width: "60px", height: "60px" }}
                  />
                ) : (
                  "No Image"
                )}
              </td> */}
              <td>{product.supplierId || "N/A"}</td>
              <td>
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={() =>
                    navigate(`/update-product/${product.productId}`)
                  }
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  className="me-2"
                  onClick={() => handleDelete(product.productId)}
                >
                  Delete
                </Button>
                {/* <Button
                  variant="warning"
                  onClick={() =>
                    navigate(`/restock-product/${product.productId}`)
                  }
                >
                  Restock
                </Button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DisplayProducts;
