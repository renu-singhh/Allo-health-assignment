import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/images", express.static(path.join(__dirname, "../public/images")));

const foodData = {
    "labels": [
        { "id": "pork", "label": "Pork" },
        { "id": "seafood", "label": "Seafood" },
        { "id": "kids", "label": "Kids" },
        { "id": "chicken", "label": "Chicken" },
        { "id": "beef", "label": "Beef" },
        { "id": "vegetarian", "label": "Vegetarian" },
        { "id": "breakfast", "label": "Breakfast" },
    ],
    "meals": [
        {
            "id": "meal1",
            "title": "3 course chicken",
            "starter": "Lorem Ipsum",
            "desert": "Cake",
            "price": 9.99,
            "labels": ["chicken", "breakfast"],
            "img": "https://gospelchops.com/wp-content/uploads/2019/12/AdobeStock_220301986-scaled.jpeg",
            "drinks": [
                { "id": "drink-1", "title": "Vine", "price": 4.99 },
                { "id": "drink-2", "title": "Juice", "price": 5.99 },
                { "id": "drink-3", "title": "Beer", "price": 6.99 },
            ],
        },
        {
            "id": "meal2",
            "title": "3 course Beef",
            "starter": "Lorem Ipsum",
            "desert": "Cake",
            "price": 19.99,
            "labels": ["beef"],
            "img": "https://cdn.pixabay.com/photo/2015/10/24/19/44/culinary-1004857_960_720.jpg",
            "drinks": [
                { "id": "drink-1", "title": "Vine", "price": 4.99 },
                { "id": "drink-2", "title": "Juice", "price": 5.99 },
                { "id": "drink-3", "title": "Beer", "price": 6.99 },
            ],
        },
        {
            "id": "meal3",
            "title": "3 course Vegetarian",
            "starter": "Lorem Ipsum",
            "desert": "Cake",
            "price": 79.99,
            "labels": ["vegetarian"],
            "img": "https://nomadparadise.com/wp-content/uploads/2020/08/brazilian-food-06.jpg",
            "drinks": [
                { "id": "drink-1", "title": "Vine", "price": 4.99 },
                { "id": "drink-2", "title": "Juice", "price": 5.99 },
                { "id": "drink-3", "title": "Beer", "price": 6.99 },
            ],
        },
        {
            "id": "meal4",
            "title": "3 course Seafood",
            "starter": "Lorem Ipsum",
            "desert": "Cake",
            "price": 49.99,
            "labels": ["seafood"],
            "img": "https://tse3.mm.bing.net/th?id=OIP.kSfwlJPBOk7gICzI1ap-pgHaE8&pid=Api&P=0&h=180",
            "drinks": [
                { "id": "drink-1", "title": "Vine", "price": 4.99 },
                { "id": "drink-2", "title": "Juice", "price": 5.99 },
                { "id": "drink-3", "title": "Beer", "price": 6.99 },
            ],
        },
        {
            "id": "meal5",
            "title": "3 course Pork",
            "starter": "Lorem Ipsum",
            "desert": "Cake",
            "price": 39.99,
            "labels": ["pork"],
            "img": "https://tse4.mm.bing.net/th?id=OIP.w7qg5Q7qLUHvj4og2XLmdQHaE8&pid=Api&P=0&h=180",
            "drinks": [
                { "id": "drink-1", "title": "Vine", "price": 4.99 },
                { "id": "drink-2", "title": "Juice", "price": 5.99 },
                { "id": "drink-3", "title": "Beer", "price": 6.99 },
            ],
        },
        {
            "id": "meal6",
            "title": "3 course Kids",
            "starter": "Lorem Ipsum",
            "desert": "Cake",
            "price": 29.99,
            "labels": ["kids", "breakfast"],
            "img": "https://tse2.mm.bing.net/th?id=OIP.WMjyCF-vu9qaVT28rOyGFwHaE8&pid=Api&P=0&h=180",
            "drinks": [
                { "id": "drink-1", "title": "Vine", "price": 4.99 },
                { "id": "drink-2", "title": "Juice", "price": 5.99 },
                { "id": "drink-3", "title": "Beer", "price": 6.99 },
            ],
        },
        {
            "id": "meal7",
            "title": "3 course Chicken 2",
            "starter": "Lorem Ipsum",
            "desert": "Cake",
            "price": 19.99,
            "labels": ["chicken"],
            "img": "https://tse4.mm.bing.net/th?id=OIP.kivmD0Ici5ra5_PBap6rEQHaLG&pid=Api&P=0&h=180",
            "drinks": [
                { "id": "drink-1", "title": "Vine", "price": 4.99 },
                { "id": "drink-2", "title": "Juice", "price": 5.99 },
                { "id": "drink-3", "title": "Beer", "price": 6.99 },
            ],
        },
    ],
};

app.get("/", (req, res) => {
    res.json(foodData);
});

app.get("/meals/:id", (req, res) => {
    const meal = foodData.meals.find((meal) => meal.id === req.params.id);
    if (meal) {
        res.json(meal);
    } else {
        res.status(404).send("Meal not found");
    }
});

app.listen(9000, () => {
    console.log("Server is running on port 9000");
});
