import axios from "axios";
import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [userSearch, setUserSearch] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=151%27"
      );
      console.log({ data: response.data.results });
      if (response.status === 200) {
        setData(response?.data?.results);
      }
    } catch (e) {
      console.error(e);
    }
  };

  let filteredData = data;

  if (userSearch) {
    filteredData = data.filter(({ name }) =>
      name.toLowerCase().startsWith(userSearch)
    );
  }

  const debouncedFunction = (func) => {
    let delay = 500;
    let timeOutId;
    return (value) => {
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {
        func(value);
      }, delay);
    };
  };

  const debouncedSetUserSearch = debouncedFunction(setUserSearch);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      <input
        type="search"
        placeholder="name"
        onChange={(e) => debouncedSetUserSearch(e.target.value)}
      />
      <ul>
        {filteredData.map(({ name, url }, index) => (
          <li key={index}>
            Name: {name}, URL: {url}
          </li>
        ))}
      </ul>
    </div>
  );
}
