import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Button, Badge, ToggleButton, Alert, Modal } from 'react-bootstrap';
import { FaMapMarkedAlt } from 'react-icons/fa';

type Order = {
  id: number;
  details: string;
  status: 'Waiting' | 'En route' | 'Delivered';
};

const mockOrders: Order[] = [
  { id: 1, details: 'Order 1 details', status: 'Delivered' },
  { id: 2, details: 'Order 2 details', status: 'Delivered' },
  { id: 3, details: 'Order 3 details', status: 'En route' },
  { id: 4, details: 'Order 4 details', status: 'Waiting' },
  { id: 5, details: 'Order 5 details', status: 'Waiting' },
];

export function OrderUpdates() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [isAvailable, setIsAvailable] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const handleEmergencyClick = () => {
    setShowEmergencyModal(true);
  };

  const closeEmergencyModal = () => {
    setShowEmergencyModal(false);
  };

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <FaMapMarkedAlt /> Delivery Queue
              <ToggleButton
                className="float-end"
                id="toggle-availability"
                type="checkbox"
                variant="outline-secondary"
                checked={isAvailable}
                value="check"
                onChange={toggleAvailability}
              >
                {isAvailable ? 'Available' : 'Not Available'}
              </ToggleButton>
            </Card.Header>
            <ListGroup variant="flush">
              {orders.map(order => (
                <ListGroup.Item key={order.id}>
                  {order.details}
                  <Badge bg={order.status === 'En route' ? 'primary' : 'secondary'} className="ms-2">
                    {order.status}
                  </Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
          {showAlert && (
            <Alert variant="success" className="mt-3">
              {isAvailable ? 'You are now available to take orders.' : 'You are now unavailable.'}
            </Alert>
          )}
        </Col>
        <Col>
        <Button variant="warning" className="mb-3" onClick={handleEmergencyClick}>
          Emergency Contact
        </Button>
          <Card>
            <Card.Header>Today's Stats</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Deliveries Completed: 5</ListGroup.Item>
              <ListGroup.Item>Total Distance: 20 miles</ListGroup.Item>
              {/* 更多统计数据 */}
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <Modal show={showEmergencyModal} onHide={closeEmergencyModal}>
        <Modal.Header closeButton>
          <Modal.Title>Emergency Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          If you are in an emergency situation, please follow these steps:
          <ol>
            <li>Immediately call the emergency number: 123-456-7890</li>
            <li>Inform the restaurant about the situation</li>
            <li>Stay safe and follow the instructions of emergency services</li>
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEmergencyModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
