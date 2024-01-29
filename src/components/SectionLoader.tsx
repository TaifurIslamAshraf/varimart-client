import { ClipLoader } from "react-spinners";

const SectionLoader = () => {
  return (
    <div className="w-full flex justify-center">
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

export default SectionLoader;
