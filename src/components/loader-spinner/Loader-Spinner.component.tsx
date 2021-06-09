import loadingSpinner from "../../assets/loadingSpinnder.svg";
import "./loader-spinner.scss";

const LoaderSpinnder = () => {
  return (
    <div className="loader-spinner-container">
      <img
        className="loader-spinner"
        src={loadingSpinner}
        alt="loading comet"
      />
    </div>
  );
};

export default LoaderSpinnder;
