import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
//import products from "../products";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        console.log(data); // Verifique se os dados estão corretos
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
  
    fetchProducts();
  }, []);
  

  return (
    <>
      <h1>Últimos Produtos</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;