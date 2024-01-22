import { ClipLoader } from "react-spinners";

const ComponentLoader = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <ClipLoader
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

export default ComponentLoader;
