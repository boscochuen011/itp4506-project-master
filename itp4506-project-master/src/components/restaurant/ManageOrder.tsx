import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import initialOrdersData from '../../json/order.json';
import { Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

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

const statusColors: { [key in OrderType['status']]: string } = {
  Pending: 'warning',
  Preparing: 'info',
  'Ready for Delivery': 'primary',
  Completed: 'success',
  Rejected: 'danger'
};

const initialOrders : OrderType[] = initialOrdersData as OrderType[];

export function ManageOrder() {
  const [orders, setOrders] = useState<OrderType[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newOrderAlert, setNewOrderAlert] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'accept' | 'reject' | null>(null);
  const [orderToModify, setOrderToModify] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // 检查是否有新订单
    const hasNewOrder = orders.some(order => order.status === 'Pending');
    setNewOrderAlert(hasNewOrder);
  }, [orders]);

  const handleStatusClick = (orderId: number) => {
    navigate(`/order-tracking/${orderId}`);
  };

  const handleStatusChange = (orderId: number, newStatus: string) => {
    const validStatuses = ['Pending', 'Preparing', 'Ready for Delivery', 'Completed', 'Rejected'];
    if (!validStatuses.includes(newStatus)) {
      console.error('Invalid status:', newStatus);
      return;
    }
  
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus as OrderType['status'] } : order
    ));
  };  

  const getOrderItemsString = (items: OrderItemType[]): string => {
    return items.map(item => `${item.name} x${item.quantity}`).join(', ');
  };

  const handleOpenConfirmationModal = (orderId: number, action: 'accept' | 'reject') => {
    setOrderToModify(orderId);
    setConfirmAction(action);
    setShowConfirmationModal(true);
  };
  
  const handleConfirmAction = () => {
    if (confirmAction === 'accept') {
      handleAcceptOrder(orderToModify, estimatedTime);
      setEstimatedTime(''); // 重置预计时间
    } else if (confirmAction === 'reject') {
      handleRejectOrder(orderToModify, rejectReason);
    }
    setShowConfirmationModal(false);
    setRejectReason(''); // 清空拒绝理由
  };
  

  const handleAcceptOrder = (orderId: number | null, estimatedTime: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'Preparing' } : order
    ));
  };

  const handleRejectOrder = (orderId: number | null, reason: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'Rejected' } : order
    ));
  };

  const confirmOrder = (orderId: number, accept: boolean) => {
    const newStatus = accept ? 'Preparing' : 'Rejected';
    handleStatusChange(orderId, newStatus);
    // 向客户发送订单确认或拒绝的信息
  };

  const openOrderModal = (order: OrderType) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeOrderModal = () => {
    setShowModal(false);
  };

  return (
    <div className="ManageOrder">
      {newOrderAlert && <Alert variant="info">You have new orders!</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{getOrderItemsString(order.items)}</td>
              <td>${order.total}</td>
              <td>
                <span className={`badge bg-${statusColors[order.status]}`} style={{cursor: 'pointer'}} onClick={() => handleStatusClick(order.id)}>
                  {order.status}
                </span>
              </td>
              <td>
                {order.status === 'Pending' && (
                  <>
                    <Button variant="success" onClick={() => handleOpenConfirmationModal(order.id, 'accept')}>Accept</Button>
                    <Button variant="danger" onClick={() => handleOpenConfirmationModal(order.id, 'reject')}>Reject</Button>
                  </>
                )}
                {order.status !== 'Pending' && (
                  <Button variant="primary" onClick={() => openOrderModal(order)}>Manage</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* 订单详情和状态管理模态框 */}
      <Modal show={showModal} onHide={closeOrderModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control type="text" readOnly defaultValue={selectedOrder.customer} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Order Items</Form.Label>
                <ul>
                  {selectedOrder.items.map((item, index) => (
                    <li key={index}>{item.name} x{item.quantity}</li>
                  ))}
                </ul>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Total Price</Form.Label>
                <Form.Control type="text" readOnly defaultValue={`$${selectedOrder.total}`} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select 
                  defaultValue={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Ready for Delivery">Ready for Delivery</option>
                  <option value="Completed">Completed</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeOrderModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Order Acceptance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {confirmAction === 'accept' && (
            <Form.Group className="mb-3">
              <Form.Label>Estimated Preparation Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter estimated time (e.g., 30 minutes)"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
              />
            </Form.Group>
          )}
          {confirmAction === 'reject' && (
            <Form.Group className="mb-3">
              <Form.Label>Reason for Rejection</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter reason"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </Form.Group>
          )}
          Are you sure you want to {confirmAction === 'accept' ? 'accept' : 'reject'} this order?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Cancel
          </Button>
          <Button variant={confirmAction === 'accept' ? 'success' : 'danger'} onClick={handleConfirmAction}>
            {confirmAction === 'accept' ? 'Accept' : 'Reject'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
