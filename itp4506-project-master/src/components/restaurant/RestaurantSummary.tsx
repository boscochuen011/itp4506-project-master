import React from 'react';
import { Card, Table, Badge, Container, Row, Col } from 'react-bootstrap';

const totalRevenue = "50,000";
const totalOrders = 1200;
const averageOrderValue = (50000 / 1200).toFixed(2);

const mockOrders = [
    { id: 1, date: "2023-03-01", total: "120.00" },
    { id: 2, date: "2023-03-02", total: "98.50" },
    { id: 3, date: "2023-03-03", total: "76.00" },
    { id: 4, date: "2023-03-04", total: "65.00" },
    { id: 5, date: "2023-03-05", total: "120.00" },
    { id: 6, date: "2023-03-06", total: "98.50" },
    { id: 7, date: "2023-03-07", total: "76.00" },
    { id: 8, date: "2023-03-08", total: "65.00" },
    { id: 9, date: "2023-03-09", total: "120.00" },
    { id: 10, date: "2023-03-10", total: "98.50" },
    { id: 11, date: "2023-03-11", total: "76.00" },
    { id: 12, date: "2023-03-12", total: "65.00" },
    { id: 13, date: "2023-03-13", total: "120.00" },
    { id: 14, date: "2023-03-14", total: "98.50" },
    { id: 15, date: "2023-03-15", total: "76.00" }
];

export function RestaurantSummary() {
  return (
    <Container className="RestaurantSummary mt-4">
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Revenue</Card.Title>
              <Card.Text>
                <Badge bg="success">${totalRevenue}</Badge>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <Card.Text>
                <Badge bg="info">{totalOrders}</Badge>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Average Order Value</Card.Title>
              <Card.Text>
                <Badge bg="warning">${averageOrderValue}</Badge>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card>
        <Card.Header as="h5">Recent Orders</Card.Header>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>${order.total}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
