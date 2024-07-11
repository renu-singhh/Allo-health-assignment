import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import SearchResult from "./components/SearchResult/SearchResult";
import Header from './components/Header';
import Auth from './components/Auth'; // Import Auth component
import Signup from './components/Signup';


export const BASE_URL = "http://localhost:9000/";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch the data");
        setLoading(false); // Ensure loading state is cleared on error
      }
    };
    fetchFoodData();
  }, []);

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage data={data} filter={filter} setFilter={setFilter} />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Signup/>} />

        <Route path="/home" element={<HomePage data={data} filter={filter} setFilter={setFilter} />} />
      </Routes>
    </Router>
  );
};

const HomePage = ({ data, filter, setFilter }) => {
  return (
    <Container>
      <FilterContainer>
        {["All", "Pork", "Seafood", "Chicken", "Beef", "Vegetarian", "Kids", "Breakfast", "Chinese"].map((category) => (
          <Button key={category} onClick={() => setFilter(category)}>
            {category}
          </Button>
        ))}
      </FilterContainer>
      <SearchResult data={data} filter={filter} />
    </Container>
  );
};

export default App;

const Container = styled.div`
  padding: 20px;
`;

const FilterContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
