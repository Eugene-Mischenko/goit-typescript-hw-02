interface LoadMoreBtnProps {
  onClick: () => void;
}

function LoadMoreBtn({ onClick }: LoadMoreBtnProps) {
  return <button onClick={onClick}>Load more</button>;
}

export default LoadMoreBtn;
