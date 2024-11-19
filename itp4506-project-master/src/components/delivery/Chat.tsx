import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button, InputGroup, Badge, Image } from 'react-bootstrap';
import { BsFillChatDotsFill, BsImageFill } from 'react-icons/bs';
import { Dropdown } from 'react-bootstrap';

type Message = {
  sender: 'user' | 'other';
  type: 'text' | 'image';
  content: string;
  timestamp: string;
};

const quickReplies = [
    "Hello, I am here!",
    "I am coming down now.",
    "I am on the way.",
    "I am here, please come down.",
    "I am here, please open the door.",
  ];  

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showQuickReplies, setShowQuickReplies] = useState(false);

  const handleNewMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const message = e.target.value;
    setNewMessage(message);

    // 显示快速回复选项当用户输入"/"
    setShowQuickReplies(message.startsWith("/"));
  };

  const handleQuickReply = (reply: string) => {
    addMessage('user', 'text', reply);
    setNewMessage('');
    setShowQuickReplies(false);
    simulateReply();
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      addMessage('user', 'text', newMessage);
      setNewMessage('');
      simulateReply();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          addMessage('user', 'image', e.target.result);
          simulateReply();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateReply = () => {
    setTimeout(() => {
      const timestamp = new Date().toLocaleTimeString();
      const replies: Message[] = [
        { sender: 'other', type: 'text', content: 'Got it, thanks!', timestamp },
        { sender: 'other', type: 'text', content: 'On my way now.', timestamp },
        { sender: 'other', type: 'text', content: 'Can you provide more details?', timestamp },
        { sender: 'other', type: 'text', content: 'Sure, give me a moment.', timestamp }
      ];
  
      // 随机选择一个回复
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      addMessage(randomReply.sender, randomReply.type, randomReply.content);
    }, 1000);
  };
  
  const addMessage = (sender: 'user' | 'other', type: 'text' | 'image', content: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setMessages(prevMessages => [...prevMessages, { sender, type, content, timestamp }]);
  };
  

  useEffect(() => {
    // 滚动到最新消息
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Container className="my-4">
      <Row>
        <Col md={6} className="mx-auto">
          <Card>
            <Card.Header>
              <BsFillChatDotsFill /> Chat with Customer
            </Card.Header>
            <ListGroup variant="flush" ref={chatBoxRef} style={{ height: '500px', overflowY: 'auto' }}>
              {messages.map((message, index) => (
                <ListGroup.Item key={index} className={`d-flex ${message.sender === 'user' ? 'justify-content-end' : ''}`}>
                  <div>
                    {message.type === 'text' ? (
                      <Badge pill bg={message.sender === 'user' ? 'primary' : 'secondary'}>
                        {message.content}
                      </Badge>
                    ) : (
                      <Image src={message.content} rounded style={{ maxWidth: '200px', maxHeight: '200px' }} />
                    )}
                    <div className="text-muted small text-end">{message.timestamp}</div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Card.Footer>
                <InputGroup>
                <Form.Control
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={handleNewMessageChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                {showQuickReplies && (
                    <Dropdown.Menu show>
                    {quickReplies.map((reply, index) => (
                        <Dropdown.Item key={index} onClick={() => handleQuickReply(reply)}>
                        {reply}
                        </Dropdown.Item>
                    ))}
                    </Dropdown.Menu>
                )}
                <Button variant="outline-secondary" onClick={() => fileInputRef.current?.click()}>
                    <BsImageFill />
                </Button>
                <Button variant="outline-secondary" onClick={handleSendMessage}>Send</Button>
                </InputGroup>
                <Form.Control
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageUpload}
                />
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
