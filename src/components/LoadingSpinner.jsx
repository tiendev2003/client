const LoadingSpinner = () => {
  return (
    <div className="preloader">
      <div className="loader">
      {[...Array(20)].map((_, i) => (
          <span key={i} style={{ '--i': i + 1 }}></span>
        ))}
        <img src="../assets/img/logo/loader.png" className="loader-plane" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
