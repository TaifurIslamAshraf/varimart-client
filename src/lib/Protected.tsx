"use client";

const Protected = ({ children }: { children: React.ReactNode }) => {
  // const { auth } = useSelector((state: any) => state);
  // console.log(auth);
  return <div>{children}</div>;
};

export default Protected;
