import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallety.module.css";
import { UnsplashImage } from "../App/App";

interface ImageGalleryProps {
  images: UnsplashImage[];
  openModal: (image: UnsplashImage) => void;
}

function ImageGallery({ images, openModal }: ImageGalleryProps) {
  return (
    <ul className={css.gallery}>
      {images.map((image) => (
        <li key={image.id} className={css.imageCard}>
          <ImageCard
            src={image.urls.small}
            alt={image.alt_description || "Image"}
            onClick={() => openModal(image)}
          />
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery;
