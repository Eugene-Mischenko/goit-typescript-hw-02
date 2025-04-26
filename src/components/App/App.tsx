import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { RingLoader } from "react-spinners";
import css from "./App.module.css";

const ACCESS_KEY = "pIN1XVx_A2y3h8KrJCudTCRxWzbc1xTvIIOQXmdoj9s";
const BASE_URL = "https://api.unsplash.com/search/photos";

export interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string | null;
}

export const fetchImages = async (
  query: string,
  page = 1,
  perPage = 12
): Promise<UnsplashImage[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        query,
        page,
        per_page: perPage,
        client_id: ACCESS_KEY,
      },
    });

    return response.data.results.map((image: any) => ({
      ...image,
      urls: {
        small: image.urls.small,
        regular: image.urls.regular || image.urls.small,
      },
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

function App() {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const getImages = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const data = await fetchImages(query, page);
        setImages((prevImages) => [...prevImages, ...data]);
      } catch (err) {
        setError(err as Error);
      }
      setLoading(false);
    };

    getImages();
  }, [query, page]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
    setError(null);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image: UnsplashImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className={css.appcontainer}>
      <SearchBar onSubmit={handleSearch} />
      {loading && page === 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <RingLoader size={80} speedMultiplier={1} color="#000000" />
        </div>
      )}
      {error && <p>Oops... Something went wrong. Error: {error.message}</p>}
      {!loading && images.length === 0 && query && <p>No images found.</p>}
      {images.length > 0 && (
        <>
          <ImageGallery images={images} openModal={openModal} />
          <div style={{ textAlign: "center" }}>
            <LoadMoreBtn onClick={handleLoadMore} />
          </div>
        </>
      )}
      {loading && page > 1 && (
        <div style={{ textAlign: "center" }}>
          <RingLoader size={80} speedMultiplier={1} color="#000000" />
        </div>
      )}
      {selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          image={selectedImage}
        />
      )}
    </div>
  );
}

export default App;
