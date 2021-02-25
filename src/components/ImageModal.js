import { Modal, Image, Button } from "react-bootstrap";

function ImageModal(props) {
  return (
    <Modal
      {...props}
      centered
      size="lg"
      aria-labelledby="contained-modal-title-vcenter">
      <Modal.Body className="image-center">
        <Image src={props.item.urls.small} />
      </Modal.Body>
      <Modal.Footer>
        <Button color="success" onClick={props.downloadImage}>Download</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ImageModal;
