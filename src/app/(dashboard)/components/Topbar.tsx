import Profile from "@/components/Profile";

const Topbar = () => {
  return (
    <div className="fixed pl-[230px] pr-8 top-0 h-[70px] bg-gray-100 flex items-center justify-end max-w-[1400px] w-full mx-auto">
      <div className="">
        <Profile />
      </div>
    </div>
  );
};

export default Topbar;
