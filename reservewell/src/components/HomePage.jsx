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
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "@/firebase/config";

const HomePage = () => {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchKeyWord, setSearchKeyword] = useState("");
  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantData, setRestaurantData] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [updatedCapacity, setUpdatedCapacity] = useState();

  let user;

  if (typeof window !== "undefined")
    user = JSON.parse(localStorage.getItem("user"));

  const userType = user?.type || "0";
  const userId = user?.uid;

  const getRestaurantData = async (id) => {
    const restaurantRef = doc(db, "restaurants", id);
    const restaurantSnapshot = await getDoc(restaurantRef);

    const q = query(
      collection(db, "reservations"),
      where("restaurant_id", "==", id)
    );
    const querySnapshot = await getDocs(q);
    let tempReservations = [];
    if (querySnapshot) {
      querySnapshot.forEach((doc) => tempReservations.push(doc.data()));
      setReservations(tempReservations);
    }

    if (restaurantSnapshot.exists()) {
      const restaurantData = restaurantSnapshot.data();
      setRestaurantData(restaurantData);
    }
  };

  useEffect(() => {
    if (userId) getRestaurantData(userId);
  }, [userId]);

  if (userType === "1") {
  }

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

  const editCapacity = async () => {
    const restaurantRef = doc(db, "restaurants", userId);

    const restaurantSnapshot = await getDoc(restaurantRef);

    if (restaurantSnapshot.exists()) {
      const updatedRestaurantData = restaurantSnapshot.data();

      if (updatedRestaurantData && updatedRestaurantData.capacityInfo) {
        Object.keys(updatedRestaurantData.capacityInfo).forEach((date) =>
          Object.keys(updatedRestaurantData.capacityInfo[date]).forEach(
            (timeSlot) =>
              (updatedRestaurantData.capacityInfo[date][timeSlot] =
                updatedCapacity)
          )
        );
        updatedRestaurantData.capacity = updatedCapacity;
        // Update the entire capacityInfo object in Firestore
        await updateDoc(restaurantRef, {
          capacity: updatedRestaurantData.capacity,
          capacityInfo: updatedRestaurantData.capacityInfo,
        });
        setRestaurantData({ ...restaurantData, capacity: updatedCapacity });
        alert("Capacity updated!");
      }
    }
  };

  const paginate = (pageNumber) => setCurrentPageNumber(pageNumber);
  const currentRestaurants = filteredRestaurants.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  console.log(restaurantData);
  return (
    <div>
      {userType === "0" && (
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
                        imageUrl={img}
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
      )}
      {userType === "1" && restaurantData && (
        <div className="grid grid-cols-2 gap-x-8 h-[screen/2] place-content-center space-y-12 bg-rwCadetGray px-36 py-24 text-center ">
          <h2 className="col-span-2 text-4xl font-bold">
            Restaurant Page for {restaurantData?.name}
          </h2>
          <div>
            <div className="text-left">
              <h4 className="text-2xl font-semibold mb-4">Reservations:</h4>
              <div className="">
                {reservations.map((res) => (
                  <ul className="grid grid-cols-3 gap-6 p-4 rounded-lg border-2 bg-rwSalmon">
                    <li>
                      <p className="font-semibold">Date:</p> {res.date}
                    </li>
                    <li>
                      <p className="font-semibold">Time Slot:</p> {res.timeSlot}
                    </li>
                    <li>
                      <p className="font-semibold">Group Size:</p>{" "}
                      {res.groupSize}
                    </li>
                    <li>
                      <p className="font-semibold">Phone Number:</p>{" "}
                      {res.phoneNumber}
                    </li>
                    <li>
                      <p className="font-semibold">Special Notes:</p>{" "}
                      {res.notes}
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
          <div className="text-left">
            <h4 className="text-2xl font-semibold mb-4">Restaurant Info</h4>
            <div className="flex space-x-4 items-center mb-4">
              <p className="font-semibold mr-1">Capacity:</p>
              {restaurantData.capacity}
              <button
                className="transition-all border-2 border-slate-500 p-2 font-semibold bg-rwSalmon rounded-lg disabled:bg-slate-400 disabled:text-slate-700"
                onClick={editCapacity}
                disabled={!updatedCapacity}
              >
                Edit Capacity:
              </button>
              <input
                onChange={(e) => setUpdatedCapacity(Number(e.target.value))}
                type="number"
                className="w-16 rounded-lg p-2"
              />
            </div>
            <div className="flex space-x-4 items-center">
              <p className="font-semibold mr-1">Working Hours:</p>
              {"10.00-0.00"}
              <button
                className="transition-all border-2 border-slate-500 p-2 font-semibold bg-rwSalmon rounded-lg disabled:bg-slate-400 disabled:text-slate-700"
                onClick={editCapacity}
              >
                Edit Working Hours:
              </button>
              <p>Coming soon</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

// workingHours = [
//   {
//     timeSlot: "10-12",
//     capacity: 40,
//   },
//   {
//     timeSlot: "12-14",
//     capacity: 30,
//   },
//   {
//     timeSlot: "14-16",
//     capacity: 25,
//   },
// ];
