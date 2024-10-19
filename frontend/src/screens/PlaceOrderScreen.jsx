import { useEffect } from "react";
//import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const order = await createOrder({
        orderItems: cart.cartItems.map((item) => ({
          product: item.id,
          quantity: item.qty,
        })),
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.cartItems.reduce(
          (acc, item) => acc + item.qty * item.price,
          0
        ),
        shippingPrice: cart.shippingAddress.country === "Brazil" ? 10.0 : 0,
        taxPrice: cart.cartItems.reduce(
          (acc, item) => acc + item.qty * item.price * 0.05,
          0
        ),
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      toast.success(`Pedido ${order.id} realizado com sucesso!`);
      navigate(`/order/${order.id}`);
    } catch (error) {
      toast.error(`Falha ao realizar o pedido: ${error.message}`);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Resumo do Pedido</h2>
              <p>
                <strong>Endereço: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Metodo Pagamento</h2>
              <strong>Metodo: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Produtos</h2>
              {cart.cartItems.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid />
                    </Col>
                    <Col md={6}>
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      R$ {item.price.toFixed(2)} x {item.qty} = R$
                      {(item.price * item.qty).toFixed(2)}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>

            {/* <ListGroup.Item>
              <h3>Subtotal ({cart.cartItems.reduce((acc, item) => acc + item.qty, 0)}) Itens</h3>
              <p>
                R$
                {cart.cartItems
                 .reduce((acc, item) => acc + item.price * item.qty, 0)
                 .toFixed(2)}
              </p>
            </ListGroup.Item> */}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Total</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>SubTotal:</Col>
                  <Col>
                    R$
                    {cart.cartItems
                      .reduce((acc, item) => acc + item.price * item.qty, 0)
                      .toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Frete:</Col>
                  <Col>
                    R$
                    {cart.shippingPrice}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Imposto:</Col>
                  <Col>
                    R$
                    {cart.taxPrice}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>
                    <b>R${cart.totalPrice}</b>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error.message}</Message>}
                {isLoading && <Loader />}
                {cart.cartItems.length === 0 && (
                  <Message>
                    Carrinho Vazio. Adicione produtos para finalizar o pedido.
                  </Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Finalizar Pedido
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
