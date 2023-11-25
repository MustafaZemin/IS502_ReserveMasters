import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import Searchbar from "./custom-components/Searchbar/Searchbar";
import PageNumbers from "./PageNumbers";
import RestaurantItem from "./Restaurant/RestaurantItem";
import DoubleArrowDown from "@mui/icons-material/KeyboardDoubleArrowDown";
import { collection, getDocs } from "firebase/firestore";
import db from "@/firebase/config";

// const restaurants = [
//   {
//     name: "Tasty Burger Joint",
//     id: "1",
//     cuisine: "Fast Food",
//     slug: "tasty-burger-joint",
//     rating: 7.5,
//     description:
//       "Indulge in a mouthwatering array of burgers, from classic beef to gourmet creations, paired with crispy fries and refreshing beverages. A go-to spot for delicious and juicy burgers.",
//     img: "https://picsum.photos/200/300",
//   },
//   {
//     name: "Sushi Delight",
//     id: "2",
//     cuisine: "Far East",
//     slug: "sushi-delight",
//     rating: 9.2,
//     description:
//       "Immerse yourself in the artistry of Japanese cuisine with a diverse selection of meticulously prepared sushi rolls, sashimi, and tempura dishes. Experience the authentic flavors of Japan with our sushi.",
//     img: "https://picsum.photos/200/300",
//   },
//   {
//     name: "Le Petit Bistro",
//     id: "3",
//     cuisine: "French",
//     slug: "le-petit-bistro",
//     rating: 8.0,
//     description:
//       "Transport yourself to Paris with every bite at Le Petit Bistro. Our menu showcases classic French dishes served with a modern twist, complemented by an extensive wine selection.",
//     img: "https://picsum.photos/200/300",
//   },
//   {
//     name: "Spice Kingdom",
//     id: "4",
//     cuisine: "Far East",
//     slug: "spice-kingdom",
//     rating: 7.9,
//     description:
//       "Embark on a culinary journey through the Far East with our vibrant and aromatic dishes. From fragrant curries to sizzling stir-fries, Spice Kingdom tantalizes your taste buds with bold flavors.",
//     img: "https://picsum.photos/200/300",
//   },
//   {
//     name: "Rustic BBQ Haven",
//     id: "5",
//     cuisine: "Steakhouse",
//     slug: "rustic-bbq-haven",
//     rating: 8.5,
//     description:
//       "Savor the essence of American BBQ culture with our slow-smoked meats, tangy sauces, and hearty sides. Whether it's ribs, brisket, or pulled pork, every bite is a flavorful celebration.",
//     img: "https://picsum.photos/200/300",
//   },
//   {
//     name: "Café Bella Italia",
//     id: "6",
//     cuisine: "Italian",
//     slug: "cafe-bella-italia",
//     rating: 9.0,
//     description:
//       "Experience the warmth of Italy right in your neighborhood. Indulge in traditional pasta dishes, wood-fired pizzas, and decadent desserts at Café Bella Italia.",
//     img: "https://picsum.photos/200/300",
//   },
//   {
//     name: "The Veggie Patch",
//     id: "7",
//     cuisine: "Vegetarian",
//     slug: "the-veggie-patch",
//     rating: 8.3,
//     description:
//       "Celebrating the flavors of farm-fresh produce, The Veggie Patch offers a diverse menu of vegetarian delights. From vibrant salads to innovative plant-based dishes, enjoy guilt-free indulgence.",
//     img: "https://picsum.photos/200/300",
//   },
//   {
//     name: "Fusion Frenzy",
//     id: "8",
//     cuisine: "Fusion",
//     slug: "fusion-frenzy",
//     rating: 7.7,
//     description:
//       "Get ready for an explosion of flavors! Fusion Frenzy brings together the best of various cuisines, creating unique and innovative dishes that redefine culinary boundaries.",
//     img: "https://picsum.photos/200/300",
//   },
//   // Italian Restaurants
//   {
//     name: "Pasta Paradiso",
//     id: "9",
//     cuisine: "Italian",
//     slug: "pasta-paradiso",
//     rating: 8.7,
//     description:
//       "Discover a taste of Italy at Pasta Paradiso, where homemade pastas, rich sauces, and traditional Italian flavors transport you to the streets of Rome.",
//     img: "https://picsum.photos/200/300",
//   },
//   {
//     name: "Ristorante Rustico",
//     id: "10",
//     cuisine: "Italian",
//     slug: "ristorante-rustico",
//     rating: 9.5,
//     description:
//       "Experience the essence of rustic Italian cuisine with a menu featuring hearty pizzas, creamy risottos, and delectable desserts at Ristorante Rustico.",
//     img: "https://picsum.photos/200/300",
//   },
//   {
//     name: "Trattoria Bella",
//     id: "11",
//     cuisine: "Italian",
//     slug: "trattoria-bella",
//     rating: 8.4,
//     description:
//       "Discover the rustic charm of Italian dining at Trattoria Bella. Indulge in homemade pasta dishes, wood-fired pizzas, and authentic Italian desserts that evoke the essence of Italian countryside flavors.",
//     img: "https://picsum.photos/200/300",
//   },

//   {
//     name: "La Maison du Fromage",
//     id: "12",
//     cuisine: "French",
//     slug: "la-maison-du-fromage",
//     rating: 8.3,
//     description:
//       "Embark on a gastronomic journey to France with an assortment of exquisite cheeses, succulent meats, and divine desserts at La Maison du Fromage.",
//     img: "https://picsum.photos/200/300",
//   },
//   {
//     name: "Boulangerie Belle Vie",
//     id: "13",
//     cuisine: "French",
//     slug: "boulangerie-belle-vie",
//     rating: 7.9,
//     description:
//       "Indulge in the charm of a French bakery offering artisanal bread, delicate pastries, and delightful confections at Boulangerie Belle Vie.",
//     img: "https://picsum.photos/200/300",
//   },

//   {
//     name: "Prime Cuts Grill",
//     id: "14",
//     cuisine: "Steakhouse",
//     slug: "prime-cuts-grill",
//     rating: 8.6,
//     description:
//       "Savor the finest cuts of steak expertly prepared to your liking, accompanied by indulgent sides and a curated selection of wines at Prime Cuts Grill.",
//     img: "https://picsum.photos/200/300",
//   },
//   {
//     name: "Green Eats",
//     id: "15",
//     cuisine: "Vegan",
//     slug: "green-eats",
//     rating: 9.3,
//     description:
//       "Experience a haven of plant-based goodness with our innovative vegan dishes, crafted with fresh, sustainable ingredients at Green Eats.",
//     img: "https://picsum.photos/200/300",
//   },
//   {
//     name: "Crispy Crunch",
//     id: "16",
//     cuisine: "Fast Food",
//     slug: "crispy-crunch",
//     rating: 7.8,
//     description:
//       "Satisfy your cravings with our crispy delights! From crunchy fried chicken to golden fries, Crispy Crunch offers a variety of fast food favorites that never disappoint.",
//     img: "https://picsum.photos/200/300",
//   },
//   {
//     name: "Mega Burger Co.",
//     id: "17",
//     cuisine: "Fast Food",
//     slug: "mega-burger-co",
//     rating: 8.2,
//     description:
//       "Go big with our mega-sized burgers! Sink your teeth into towering burgers packed with premium ingredients and bold flavors at Mega Burger Co.",
//     img: "https://picsum.photos/200/300",
//   },
//   {
//     name: "Taco Haven",
//     id: "18",
//     cuisine: "Fast Food",
//     slug: "taco-haven",
//     rating: 7.5,
//     description:
//       "Experience the authentic taste of Mexico with our savory tacos, loaded nachos, and zesty burritos at Taco Haven.",
//     img: "https://picsum.photos/200/300",
//   },
//   {
//     name: "Wings & Things",
//     id: "19",
//     cuisine: "Fast Food",
//     slug: "wings-and-things",
//     rating: 8.9,
//     description:
//       "Get ready to wing it! Dive into a world of flavor with our crispy chicken wings, tantalizing sauces, and a variety of delicious sides at Wings & Things.",
//     img: "https://picsum.photos/200/300",
//   },
//   {
//     name: "Noodle World",
//     id: "20",
//     cuisine: "Far East",
//     slug: "noodle-world",
//     rating: 8.1,
//     description:
//       "Journey through a world of noodles at our restaurant. From steaming bowls of ramen to delicate hand-pulled noodles, Noodle World brings the essence of Far East flavors to your table.",
//     img: "https://picsum.photos/200/300",
//   },
//   {
//     name: "La Belle Epoque",
//     id: "21",
//     cuisine: "French",
//     slug: "la-belle-epoque",
//     rating: 9.1,
//     description:
//       "Step into a world of elegance and refinement at La Belle Epoque. Indulge in the sophistication of French cuisine with our exquisite dishes crafted with the finest ingredients.",
//     img: "https://picsum.photos/200/300",
//   },
//   {
//     name: "Sizzle & Grill",
//     id: "22",
//     cuisine: "Steak",
//     slug: "sizzle-and-grill",
//     rating: 8.7,
//     description:
//       "Experience the sizzle of perfection! Our steakhouse offers prime cuts expertly grilled to your preference, paired with delectable sides and an ambiance of culinary delight.",
//     img: "https://picsum.photos/200/300",
//   },
//   {
//     name: "Garden Greens",
//     id: "23",
//     cuisine: "Vegetarian",
//     slug: "garden-greens",
//     rating: 8.4,
//     description:
//       "Explore the lush flavors of nature at Garden Greens. Our menu boasts a bounty of plant-based dishes, from hearty salads to innovative vegetarian entrees, all crafted with fresh and seasonal produce.",
//     img: "https://picsum.photos/200/300",
//   },
//   {
//     name: "Herb Haven",
//     id: "24",
//     cuisine: "Vegetarian",
//     slug: "herb-haven",
//     rating: 9.2,
//     description:
//       "Discover the aromatic wonders of herbs at Herb Haven. Indulge in a variety of flavorful vegetarian dishes infused with a blend of fresh herbs and spices for a delightful dining experience.",
//     img: "https://picsum.photos/200/300",
//   },
//   {
//     name: "Global Fusion Grill",
//     id: "25",
//     cuisine: "Fusion",
//     slug: "global-fusion-grill",
//     rating: 8.6,
//     description:
//       "Embark on a global culinary journey with our fusion delights. Our menu blends flavors from around the world, creating innovative dishes that marry diverse cuisines in every bite.",
//     img: "https://picsum.photos/200/300",
//   },
//   {
//     name: "Eclectic Eats",
//     id: "26",
//     cuisine: "Fusion",
//     slug: "eclectic-eats",
//     rating: 7.8,
//     description:
//       "Experience a symphony of tastes at Eclectic Eats. Our fusion creations bring together unexpected combinations, showcasing the best of different cuisines for a unique dining adventure.",
//     img: "https://picsum.photos/200/300",
//   },
// ];

const HomePage = () => {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchKeyWord, setSearchKeyword] = useState("");
  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [restaurants, setRestaurants] = useState([]);

  const RESTAURANTS_PER_PAGE = 9;

  const indexOfLastItem = currentPageNumber * RESTAURANTS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - RESTAURANTS_PER_PAGE;

  const getRestaurantsFromDb = async () => {
    const querySnapshot = await getDocs(collection(db, "restaurants"));
    let tempRestaurants = [];
    querySnapshot.forEach((doc) => {
      const restaurantData = doc.data();
      tempRestaurants.push({ id: doc.id, ...restaurantData });
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
    });
    setRestaurants([...tempRestaurants]);
    setFilteredRestaurants([...tempRestaurants]);
  };
  useEffect(() => {
    getRestaurantsFromDb();
  }, []);

  useEffect(() => {
    const tagsSet = new Set();
    restaurants.forEach((restaurant) => {
      tagsSet.add(restaurant.cuisine);
    });
    const tagsArray = [...tagsSet];
    setCuisines(tagsArray);
  }, [restaurants]);

  useEffect(() => {
    if (selectedCuisine)
      setFilteredRestaurants(
        restaurants.filter((restaurant) =>
          restaurant.cuisine.includes(selectedCuisine)
        )
      );
    else setFilteredRestaurants(restaurants);
  }, [selectedCuisine]);

  useEffect(() => {
    if (searchKeyWord) {
      //   setSelectedCuisine("");
      setFilteredRestaurants(
        restaurants.filter((restaurant) =>
          restaurant.name.toLowerCase().includes(searchKeyWord.toLowerCase())
        )
      );
    } else setFilteredRestaurants(restaurants);
  }, [searchKeyWord]);

  const handleCuisineChange = (event) => {
    const searchBarComponent = document.getElementById("restaurantSearchBar");
    if (searchBarComponent) searchBarComponent.value = "";
    setSearchKeyword("");
    if (event.target.value === "All") setSelectedCuisine("");
    else setSelectedCuisine(event.target.value);
  };

  const paginate = (pageNumber) => setCurrentPageNumber(pageNumber);
  const currentRestaurants = filteredRestaurants.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  return (
    <div className="">
      <div className="block h-[screen/2] place-content-center space-y-12 bg-rwCadetGray px-72 py-24 text-center ">
        <div className="text-5xl font-semibold">
          <h2 className="mb-4">Reserve a table</h2>
          <h2 className="mb-4">from your favourite restaurant!</h2>
        </div>
        <Searchbar
          setSearchKeyword={setSearchKeyword}
          label={"Search Restaurants"}
          id={"restaurantSearchBar"}
        />
        <div className="flex items-center justify-center">
          <div className="border-r border-gray-300 px-8">
            <p className="text-3xl font-semibold">100+</p>
            <p className="text-lg brightness-75">Fine Restaurants</p>
          </div>
          <div className="border-r border-gray-300 px-8">
            <p className="text-3xl font-semibold">12+</p>
            <p className="text-lg brightness-75">Different Cuisines</p>
          </div>
          <div className="px-8">
            <p className="text-3xl font-semibold">500+</p>
            <p className="text-lg brightness-75">Good Reviews</p>
          </div>
        </div>
        <DoubleArrowDown
          className="bg-rwScarlet rounded-full text-amber-200 cursor-pointer"
          sx={{ height: "72px", width: "72px" }}
          onClick={() =>
            window.scrollTo({
              top: window.innerHeight, // Scroll down by half of the viewport height + 96 pixels
              behavior: "smooth", // Optional: Add smooth scrolling animation
            })
          }
        />
      </div>
      <div className=" bg-rwSalmon px-32 py-16">
        <div className="mt-16 grid grid-cols-4">
          <div className="col-span-1 pr-8">
            <div className="grid rounded-lg bg-white p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Filter</h4>
                <button
                  onClick={() => {
                    setSelectedCuisine("");
                    setSearchKeyword("");
                  }}
                  className="border-2 border-rwBlack bg-rwKhaki font-semibold p-2 rounded-md"
                >
                  Clear Filters
                </button>
              </div>
              <hr className="my-4 w-full border-t-2 border-slate-200" />
              <FormControl>
                <FormLabel
                  id="radio-group-label-categories"
                  className="mb-2 font-semibold"
                >
                  Category
                </FormLabel>
                <RadioGroup
                  aria-labelledby="radio-group-categories"
                  defaultValue="All"
                  name="radio-buttons-group"
                  onChange={handleCuisineChange}
                >
                  <FormControlLabel
                    key="allCategories"
                    value="All"
                    control={<Radio />}
                    label="All"
                    checked={selectedCuisine === ""}
                  />
                  {cuisines.map((cuisine, i) => (
                    <FormControlLabel
                      key={i}
                      value={cuisine}
                      control={<Radio />}
                      label={cuisine}
                      checked={selectedCuisine === cuisine}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className="col-span-3 grid grid-cols-3 gap-6">
            <h5 className="col-span-3 h-fit font-semibold">
              {filteredRestaurants.length} restaurant
              {filteredRestaurants.length > 1 && <>s</>} found
            </h5>
            {currentRestaurants.length > 0 ? (
              currentRestaurants.map(
                (
                  { name, rating, cuisine, img, slug, description, id },
                  index
                ) => (
                  <RestaurantItem
                    key={index}
                    slug={slug || id}
                    name={name}
                    rating={rating}
                    imageUrl={img || "https://picsum.photos/200/300"}
                    cuisine={cuisine}
                    shortDescription={description}
                  />
                )
              )
            ) : (
              <p className="col-span-3 -mt-32 text-center text-lg font-semibold">
                No Restaurants Found!
              </p>
            )}
            {currentRestaurants.length > 0 && (
              <div className="col-span-3 flex justify-end">
                <PageNumbers
                  paginate={paginate}
                  itemsPerPage={RESTAURANTS_PER_PAGE}
                  totalItems={filteredRestaurants.length}
                  currentPageNumber={currentPageNumber}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
