import css from "./ImageCard.module.css";

interface ImageCardProps {
  src: string;
  alt: string;
  onClick: () => void;
}

function ImageCard({ src, alt, onClick }: ImageCardProps) {
  return (
    <div onClick={onClick} className={css.card} style={{ cursor: "pointer" }}>
      <img src={src} alt={alt} />
    </div>
  );
}

export default ImageCard;
