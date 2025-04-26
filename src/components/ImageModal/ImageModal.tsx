import Modal from "react-modal";

// Типизация
interface UnsplashImage {
  urls: {
    regular: string;
  };
  alt_description: string | null;
}

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image: UnsplashImage;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onRequestClose,
  image,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: "0",
          border: "none",
          background: "transparent",
        },
      }}
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description || "Large view"}
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </Modal>
  );
};

Modal.setAppElement("#root");

export default ImageModal;
