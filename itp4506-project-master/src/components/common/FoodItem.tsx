import React, { useState } from "react";
import { Card, Button, FormControl, Modal } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

type FoodItemProps = {
    id: number;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    onDelete?: (id: number) => void;
    onSave?: (id: number, name: string, description: string, price: number, imgUrl: string) => void;
}

export function FoodItem({ id, name, description, price, imgUrl, onDelete, onSave }: FoodItemProps) {
    const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeFromCart } = useShoppingCart();
    const quantity = getItemQuantity(id);

    const [isEditMode, setIsEditMode] = useState(false);
    const [editableName, setEditableName] = useState(name);
    const [editableDescription, setEditableDescription] = useState(description);
    const [editablePrice, setEditablePrice] = useState(price);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [editableImgUrl, setEditableImgUrl] = useState(imgUrl);

    const userType = localStorage.getItem('userType');
    const username = localStorage.getItem('username');

    const toggleEditMode = () => setIsEditMode(!isEditMode);

    const openConfirmModal = () => setShowConfirmModal(true);
    const closeConfirmModal = () => setShowConfirmModal(false);
    const openDeleteConfirmModal = () => setShowDeleteConfirmModal(true);
    const closeDeleteConfirmModal = () => setShowDeleteConfirmModal(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const newImgUrl = URL.createObjectURL(file);
            setEditableImgUrl(newImgUrl);
        }
    };

    const saveChanges = () => {
        if (onSave) {
            onSave(id, editableName, editableDescription, editablePrice, editableImgUrl);
        }
        setIsEditMode(false);
        closeConfirmModal();
    };

    const confirmDelete = () => {
        if (onDelete) {
            onDelete(id);
        }
        closeDeleteConfirmModal();
    };

    return (
        <>
            {userType === 'customer' ? (
                <>
                    <Card className="h-100">
                        <Card.Img 
                            variant="top"
                            src={imgUrl}
                            alt={name}
                            height="200px"
                            style={{ objectFit: "cover" }}
                        />
                        <Card.Body className="d-flex flex-column">
                            <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                                <span className="fs-2">{name}</span>
                                <span className="ms-2 text-muted">{formatCurrency(price)}</span>
                            </Card.Title>
                            <Card.Title className="text-muted" style={{ fontSize: '.90rem' }}>{description}</Card.Title>
                            <div className="mt-auto">
                                {quantity === 0 ? (
                                    <Button className="w-100" onClick={() => increaseItemQuantity(id)}>+ Add To Cart</Button>
                                ) : <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
                                    <div className="d-flex align-items-center flex-center" style={{ gap: ".5rem" }}>
                                        <Button onClick={() => decreaseItemQuantity(id)}>-</Button>
                                            <div>
                                                <span className="fs-3">{quantity}</span> in cart
                                            </div>
                                        <Button onClick={() => increaseItemQuantity(id)}>+</Button>
                                    </div>
                                    <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>
                                        Remove
                                    </Button>
                                </div>}
                            </div>
                        </Card.Body>
                    </Card>
                </>
            ) : (
                <>
                    <Card className="h-100">
                        {/* Existing Card Implementation */}
                        <Card.Body className="d-flex flex-column">
                            <Button variant="outline-secondary" size="sm" onClick={toggleEditMode} className="mb-2">
                                {isEditMode ? "Cancel" : "Edit"}
                            </Button>
                            {isEditMode ? (
                                <>
                                    <img
                                        src={editableImgUrl}
                                        alt={name}
                                        height="200px"
                                        style={{ objectFit: "cover", marginBottom: '1rem' }}
                                    />
                                    <FormControl type="file" onChange={handleFileChange} />
                                    <div className="mb-3">
                                        <label>Name:</label>
                                        <FormControl
                                            type="text"
                                            value={editableName}
                                            onChange={(e) => setEditableName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Description:</label>
                                        <FormControl
                                            as="textarea"
                                            value={editableDescription}
                                            onChange={(e) => setEditableDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Price:</label>
                                        <FormControl
                                            type="number"
                                            value={editablePrice}
                                            onChange={(e) => setEditablePrice(parseFloat(e.target.value))}
                                        />
                                    </div>
                                    <Button style={{marginBottom: '1rem'}} variant="primary" onClick={openConfirmModal}>Save Changes</Button>
                                    {onDelete && (
                                        <Button variant="danger" onClick={openDeleteConfirmModal}>
                                            Delete Item
                                        </Button>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Card.Img 
                                    variant="top"
                                    src={imgUrl}
                                    alt={name}
                                    height="200px"
                                    style={{ objectFit: "cover" }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                                        <span className="fs-2">{editableName}</span>
                                        <span className="ms-2 text-muted">{formatCurrency(editablePrice)}</span>
                                    </Card.Title>
                                    <Card.Title className="text-muted" style={{ fontSize: '.90rem' }}>{editableDescription}</Card.Title>
                                </Card.Body>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </>
            )}

            <Modal show={showConfirmModal} onHide={closeConfirmModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Changes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to save the changes?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeConfirmModal}>Cancel</Button>
                    <Button variant="primary" onClick={saveChanges}>Save Changes</Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteConfirmModal} onHide={closeDeleteConfirmModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this item?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDeleteConfirmModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
