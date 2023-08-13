import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Props {
  result: string;
  message: string;
  color: string;
}

export const Message: React.FC<Props> = ({
  result,
  message,
  color,
}) => {
  //Show Alert
  const [show] = useState(true);
  const handleClose = () => window.location.reload();
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>{result}</Modal.Title>
        <Button variant="dark" onClick={handleClose}>
        <FontAwesomeIcon icon={faX} />
        </Button>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant={color} onClick={handleClose}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const MessageCart: React.FC<Props> = ({
  result,
  message,
  color,
}) => {
  const handleClose = () => window.location.reload();
  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>{result}</Modal.Title>
        <Button variant="dark" onClick={handleClose}>
        <FontAwesomeIcon icon={faX} />
        </Button>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant={color} onClick={() => window.location.assign("/react-vitalfresh/")}>
          Home
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const MessageConnection: React.FC<Props> = ({
  result,
  message,
  color,
}) => {
  //Show Alert
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  //Navigation
  const navigate = useNavigate();
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>{result}</Modal.Title>
        <Button variant="dark" onClick={handleClose}>
        <FontAwesomeIcon icon={faX} />
        </Button>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant={color} onClick={() => navigate("/react-vitalfresh/login")}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
