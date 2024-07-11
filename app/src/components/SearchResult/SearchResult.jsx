import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const SearchResult = ({ filter }) => {
  const [meals, setMeals] = useState([]);
  const [labels, setLabels] = useState([]);
  const [cart, setCart] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [paymentMade, setPaymentMade] = useState(false);

  const fetchMeals = async () => {
    try {
      const res = await axios.get("http://localhost:9000/");
      const data = res.data;
      setMeals(data.meals);
      setLabels(data.labels);
    } catch (error) {
      console.error("Error fetching meals data:", error);
    }
  };

  const fetchMealById = async (id) => {
    try {
      const res = await axios.get(`http://localhost:9000/meals/${id}`);
      const data = res.data;
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === data.id);
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === data.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevCart, { ...data, quantity: 1 }];
        }
      });
    } catch (error) {
      console.error("Error fetching meal by id:", error);
    }
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    setPaymentMade(false); // Reset payment state when a new item is added
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.id === id);
      if (item.quantity > 1) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCart.filter((item) => item.id !== id);
      }
    });
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setFilteredMeals(meals);
    } else {
      setFilteredMeals(meals.filter((meal) => meal.labels.includes(filter.toLowerCase())));
    }
  }, [meals, filter]);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePayment = () => {
    setPaymentMade(true);
    setCart([]);
  };

  return (
    <FoodCardContainer>
      <FoodCards>
        {filteredMeals.map((meal) => (
          <FoodCard key={meal.id}>
            <Foodimg src={meal.img} alt={meal.title} />
            <h3>{meal.title}</h3>
            <p>Starter: {meal.starter}</p>
            <p>Desert: {meal.desert}</p>
            <p>Price: ${meal.price}</p>
            <AddButton onClick={() => addToCart(meal)}>Add Meal to Cart</AddButton>
            <DrinkSection>
              <h4>Drinks</h4>
              {meal.drinks.map((drink) => (
                <Drink key={drink.id}>
                  <span>{drink.title}</span>
                  <DrinkButton onClick={() => addToCart({ ...drink, id: `${meal.id}-${drink.id}` })}>
                    ${drink.price}
                  </DrinkButton>
                </Drink>
              ))}
            </DrinkSection>
          </FoodCard>
        ))}
      </FoodCards>
      <Cart>
        <h2>Cart</h2>
        {cart.map((item) => (
          <CartItem key={item.id}>
            <span>{item.title}</span>
            <span>Quantity: {item.quantity}</span>
            <span>Price: ${(item.price * item.quantity).toFixed(2)}</span>
            <RemoveButton onClick={() => removeFromCart(item.id)}>Remove</RemoveButton>
          </CartItem>
        ))}
        <TotalPrice>Total Price: ${totalPrice.toFixed(2)}</TotalPrice>
        {cart.length > 0 && (
          <PaymentButton onClick={handlePayment}>Make Payment</PaymentButton>
        )}
        {paymentMade && <ThankYouMessage>Thanks for ordering from Food-App!</ThankYouMessage>}
      </Cart>
    </FoodCardContainer>
  );
};

const FoodCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
`;

const FoodCards = styled.div`
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FoodCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 1rem;
  width: calc(33.333% - 1rem);
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  color: black;

  &:hover {
    transform: scale(1.02);
  }
`;

const Foodimg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const DrinkSection = styled.div`
  margin-top: 1rem;
`;

const Drink = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const AddButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: #45a049;
  }
`;

const DrinkButton = styled(AddButton)`
  background-color: #008cba;

  &:hover {
    background-color: #007bb5;
  }
`;

const Cart = styled.div`
  flex: 0.75;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  margin-left: 1rem;
  color: black;
  height : 600px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: black;
`;

const RemoveButton = styled.button`
  background-color: #f44336;
  color: black;
  border: none;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: #da190b;
  }
`;

const TotalPrice = styled.div`
  font-weight: bold;
  margin-top: 1rem;
`;

const PaymentButton = styled(AddButton)`
  background-color: #ff9800;

  &:hover {
    background-color: #e68a00;
  }
`;

const ThankYouMessage = styled.div`
  margin-top: 1rem;
  font-size: 18px;
  color: #4caf50;
  font-weight: bold;
`;

export default SearchResult;
