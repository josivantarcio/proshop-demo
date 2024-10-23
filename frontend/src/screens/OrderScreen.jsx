import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  //console.log(order);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" />
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Detalhes do Pedido</h2>
              <p>
                <strong>Nome: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <p>
                <strong>Endereço: </strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">Entregue</Message>
              ) : (
                <Message variant="danger">Não Entregue</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Metodo de Pagamento</h2>
              <p>
                <strong>Método: </strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Pago {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Não Pago</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Itens Pedido</h2>
              {order.orderItems.map((item, index) => (
                <ListGroupItem key={index}>
                  <Row>
                    <Col md={1}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      ></Image>
                    </Col>
                    <Col md={5}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x {item.price} = R${item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Resumo Pedido</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Itens</Col>
                  <Col>RS{order.itemsPrice}</Col>
                </Row>

                <Row>
                  <Col>Entrega</Col>
                  <Col>RS{order.shippingPrice}</Col>
                </Row>

                <Row>
                  <Col>Imposto</Col>
                  <Col>RS{order.taxPrice}</Col>
                </Row>

                <Row>
                  <Col>Total</Col>
                  <Col>R${order.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              { /* PAY ORDER PLACEHOLDER */}
              { /* MARK AS DELIVERED PLACEHOLDER */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
