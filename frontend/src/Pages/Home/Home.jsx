import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    // Fetch data from the backend using axios
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/user");
        // console.log(data);
        setUserInfo(data.data);
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.message) {
          toast.error(error.response.data.message);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="w-100 text-center text-white my-3">{userInfo.name}</h1>
      <h2 className="w-100 text-center text-white my-3">{userInfo.email}</h2>
    </div>
  );
};

export default Home;
