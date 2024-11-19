import React, { useState, useEffect } from 'react';
import users from '../../json/users.json';
import { Container, Row, Col, Table, Button, Modal, Form, Alert } from 'react-bootstrap';

type User = {
  type: string;
  username: string;
  email?: string;
  address?: string;
  phone: string;
  password: string;
  restaurantName?: string;
  RestaurantAccessRightsNumber?: string;
};

export function ManageUser() {
  const [userList, setUserList] = useState<User[]>([]);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');

  // 初始化，从users.json读取用户列表
  useEffect(() => {
    setUserList(users.users as User[]);
  }, []);

  // 创建用户
  const createUser = (user: User) => {
    setUserList([...userList, user]);
  };

  // 更新用户
  const updateUser = (username: string, updatedUser: User) => {
    setUserList(userList.map(user => user.username === username ? updatedUser : user));
    setShowUpdateModal(false);
  };

  // 删除用户
  const deleteUser = (username: string) => {
    setUserList(userList.filter(user => user.username !== username));
    setShowDeleteModal(false);
  };

  // 显示更新用户的模态框
  const handleUpdateUser = (user: User) => {
    setCurrentUser(user);
    setShowUpdateModal(true);
  };

  // 显示删除用户的模态框
  const handleDeleteUser = (user: User) => {
    setCurrentUser(user);
    setShowDeleteModal(true);
  };

  const filteredUserList = userList.filter(user => selectedType === 'all' ? true : user.type === selectedType);

  return (
    <Container className="ManageUser">
      <Row>
        <Col>
          <Form.Select aria-label="Filter by Type" onChange={(e) => setSelectedType(e.target.value)}>
            <option value="all">All</option>
            <option value="customer">Customer</option>
            <option value="restaurant">Restaurant</option>
            <option value="delivery">Delivery</option>
          </Form.Select>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUserList.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleUpdateUser(user)}>Update</Button>{' '}
                    <Button variant="danger" onClick={() => handleDeleteUser(user)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {currentUser && 
        <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Update User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={(event) => {
                event.preventDefault();
                updateUser(currentUser.username, { ...currentUser, username: 'New Username' });
            }}>
                <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" defaultValue={currentUser.username} onChange={(event) => setCurrentUser({ ...currentUser, username: event.target.value })} />
                </Form.Group>
                <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" defaultValue={currentUser.email} onChange={(event) => setCurrentUser({ ...currentUser, email: event.target.value })} />
                </Form.Group>
                <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" defaultValue={currentUser.address} onChange={(event) => setCurrentUser({ ...currentUser, address: event.target.value })} />
                </Form.Group>
                <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" defaultValue={currentUser.phone} onChange={(event) => setCurrentUser({ ...currentUser, phone: event.target.value })} />
                </Form.Group>
                <Button variant="primary" type="submit">Update</Button>
            </Form>
            </Modal.Body>
        </Modal>
        }

      {currentUser && 
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete {currentUser.username}?</p>
            <Button variant="danger" onClick={() => deleteUser(currentUser.username)}>Delete</Button>
          </Modal.Body>
        </Modal>
      }
    </Container>
  );
}