import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import map from '../../images/map.png';
import { useNavigate } from 'react-router-dom';

// 假设的订单数据
const mockOrder = {
  id: 1,
  items: [
    { name: "Pizza", quantity: 1 },
    { name: "Soda", quantity: 2 }
  ],
  pickupLocation: "Restaurant ABC, 123 Street",
  specialInstructions: "No onions on the pizza, please.",
  customerETA: "15 minutes",
  customerAddress: "456 Park Avenue",
  deliveryStatus: "En route"
};

export function DeliveryInstructions() {
  const [orderReady, setOrderReady] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState(mockOrder.deliveryStatus);
  const [currentETA, setCurrentETA] = useState(mockOrder.customerETA);
  const [showETAMessage, setShowETAMessage] = useState(false);

  const navigate = useNavigate();

  const handleChatWithCustomer = () => {
    // 导航到聊天页面
    navigate('/chat');
  };

  useEffect(() => {
    // 模拟订单准备通知
    const timer = setTimeout(() => {
      setOrderReady(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleUpdateETA = () => {
    // 随机生成一个新的ETA
    const newETA = Math.floor(Math.random() * 20) + 10; // 随机10到30分钟
    setCurrentETA(`${newETA} minutes`);

    // 显示一个消息表示ETA已更新
    setShowETAMessage(true);
    setTimeout(() => setShowETAMessage(false), 3000); // 3秒后隐藏消息
  };

  const handleUpdateDeliveryStatus = (newStatus: string) => {
    setDeliveryStatus(newStatus);
  };

  return (
    <Container className="DeliveryInstructions mt-4">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>Order Details</Card.Header>
            <ListGroup variant="flush">
              {mockOrder.items.map((item, index) => (
                <ListGroup.Item key={index}>{item.name} x {item.quantity}</ListGroup.Item>
              ))}
              <ListGroup.Item><strong>Pickup Location:</strong> {mockOrder.pickupLocation}</ListGroup.Item>
              <ListGroup.Item><strong>Special Instructions:</strong> {mockOrder.specialInstructions}</ListGroup.Item>
            </ListGroup>
          </Card>
          <Card className="mt-3">
            <Card.Header>Delivery Status</Card.Header>
            <Card.Body>
              <p>Current Status: {deliveryStatus}</p>
              <Button variant="primary" onClick={() => handleUpdateDeliveryStatus("Delivered")}>Mark as Delivered</Button>
              <Button variant="secondary" onClick={handleChatWithCustomer}>Chat with Customer</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          {orderReady ? (
            <Alert variant="success">Order #{mockOrder.id} is ready for pickup!</Alert>
          ) : (
            <Alert variant="info">Waiting for order to be ready...</Alert>
          )}
          <Card className="mt-3">
            <Card.Header>Customer Communication</Card.Header>
            <Card.Body>
              <p>Estimated Time of Arrival (ETA) to customer: {currentETA}</p>
              <p>Delivery to: {mockOrder.customerAddress}</p>
              <Button variant="primary" onClick={handleUpdateETA}>Update ETA</Button>
              {showETAMessage && <Alert variant="success" className="mt-2">ETA Updated!</Alert>}
            </Card.Body>
          </Card>
          <div className="mt-3">
            <Alert variant="secondary"><img src={map} style={{width: '100%'}}></img></Alert>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
