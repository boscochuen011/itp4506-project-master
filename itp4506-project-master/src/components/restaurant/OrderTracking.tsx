import React, { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import initialOrdersData from '../../json/order.json';

type OrderItemType = {
  name: string;
  quantity: number;
};

type OrderType = {
  id: number;
  customer: string;
  items: OrderItemType[];
  total: string;
  status: 'Pending' | 'Preparing' | 'Ready for Delivery' | 'Completed' | 'Rejected';
};

export function OrderTracking() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<OrderType | null>(null);
  const initialOrders: OrderType[] = initialOrdersData as OrderType[];

  useEffect(() => {
    if (orderId) {
      const selectedOrder = initialOrders.find(order => order.id.toString() === orderId);
      setOrder(selectedOrder || null);
    }
  }, [orderId]);

  useEffect(() => {
    if (order !== null) {
      // 当 order 不为 null 时执行定时器逻辑
      const interval = setInterval(() => {
        setOrder(currentOrder => {
          if (currentOrder && currentOrder.status === 'Preparing') {
            return { ...currentOrder, status: 'Ready for Delivery' };
          }
          return currentOrder;
        });
      }, 5000);
  
      return () => clearInterval(interval);
    }
  }, [order]);

  if (!order) {
    return <div>Order not found</div>;
  }

  const statusColors: { [key in OrderType['status']]: string } = {
    Pending: 'warning',
    Preparing: 'info',
    'Ready for Delivery': 'primary',
    Completed: 'success',
    Rejected: 'danger'
  };  
  
  return (
    <div className="OrderTracking" style={{ maxWidth: '600px', margin: '20px auto' }}>
      <Card>
        <Card.Header as="h5">Order Details (ID: {order.id})</Card.Header>
        <ListGroup className="list-group-flush">
          <ListGroupItem><strong>Customer:</strong> {order.customer}</ListGroupItem>
          <ListGroupItem>
            <strong>Items:</strong>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>{item.name} x {item.quantity}</li>
              ))}
            </ul>
          </ListGroupItem>
          <ListGroupItem><strong>Total:</strong> ${order.total}</ListGroupItem>
          <ListGroupItem>
            <strong>Status:</strong> <Badge bg={statusColors[order.status]}>{order.status}</Badge>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
}
