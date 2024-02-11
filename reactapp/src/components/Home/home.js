import { useEffect, useState } from "react";
import ShowData from "./showdata";

const Home = () => {
  const [data, setData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(30);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`https://hacker-news2-o.onrender.com/api/fetch`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const resData = await res.json();
        setData(resData); // Set data state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleLoadMore = () => {
    setItemsPerPage((prevItemsPerPage) => prevItemsPerPage + 30);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center bg-gray-100 rounded-lg p-6 mb-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-500 mb-4">Hacker New 2.0</h1>
      </div>
      {Object.keys(data).slice(0, itemsPerPage).map((index) => (
        <ShowData key={index} element={data[index]} />
      ))}
      {data.length > itemsPerPage && (
        <div className="flex justify-center mt-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded p-5" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
