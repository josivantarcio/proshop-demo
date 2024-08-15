import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import products from "../products";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const product = products.find((p) => p._id === productId);

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Voltar
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} avaliações`}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              Preço: R${product.price.toFixed(2).replace(".", ",")}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Descrição:</strong> {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Preço:</Col>
                  <Col>
                    <strong>
                      R${product.price.toFixed(2).replace(".", ",")}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0
                        ? "Em Estoque"
                        : "Fora de Estoque"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="text-center">
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock <= 0}
                >
                  Incluir no Carrinho
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
