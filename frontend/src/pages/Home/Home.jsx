import { useEffect, useState } from "react";

const Home = () => {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  return (
    <div className="container">
      <h1 className="w-100 text-center text-white my-3">{userInfo.name}</h1>
      <h2 className="w-100 text-center text-white my-3">{userInfo.email}</h2>
    </div>
  );
};

export default Home;
