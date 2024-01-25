import { FadeLoader } from "react-spinners";

const PageLoader = () => {
  return (
    <div className="max-w-[1400px] mx-auto w-full h-screen flex items-center justify-center">
      <FadeLoader
        className="h-[50px]"
        color={"#000"}
        loading={true}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={3}
      />
    </div>
  );
};

export default PageLoader;
