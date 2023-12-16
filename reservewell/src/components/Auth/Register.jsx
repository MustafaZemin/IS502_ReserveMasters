import { Alert, Autocomplete, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import { signup } from "../../firebase/config";
import { useRouter } from "next/router";
import db from "../../firebase/config";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
// import { useForm } from "react-hook-form";

const cuisineOptions = [
  "Fast Food",
  "Far East",
  "French",
  "American",
  "Italian",
  "Vegetarian",
  "Fusion",
  "Steak",
  "Other",
];

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [selectedUserType, setSelectedUserType] = useState("diner");
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState();
  const [maxGroupSize, setMaxGroupSize] = useState();
  const router = useRouter();

  const usersCollectionRef = collection(db, "users");

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(null);
  };
  const submitRegisterDiner = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords should match!");
      return;
    }

    setError(null);
    const user = await signup(email, password, username, "0", setError);
    console.log(user);
  };
  const submitRegisterRestaurant = async (event, data) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords should match!");
      return;
    }

    setError(null);
    const restaurantData = {
      name: restaurantName,
      cuisine: selectedCuisine,
      capacity: Number(capacity),
      description: description,
      maxGroupSize: maxGroupSize,
    };
    const user = await signup(
      email,
      password,
      username,
      "1",
      setError,
      restaurantData
    );
    // console.log(user);

    // console.log(email, password, confirmPassword);
  };

  return (
    <div className="grid place-content-center">
      <Snackbar
        autoHideDuration={2500}
        open={error}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" className="items-center text-lg font-semibold">
          {error}
        </Alert>
      </Snackbar>

      <div className="w-[600px] min-h-[600px] flex flex-col justify-between gap-y-4 rounded-lg bg-white mt-12 p-8">
        <div className="flex flex-col gap-y-8">
          <h3 className="font-semibold text-2xl ">Register</h3>

          <div className="w-full flex items-center justify-around">
            <button
              type="button"
              className={`text-center text-lg font-semibold px-8 py-2 rounded-full transition-all ${
                selectedUserType === "diner" && "bg-rwBlack text-white"
              }`}
              onClick={() => setSelectedUserType("diner")}
            >
              As a diner
            </button>
            <button
              type="button"
              className={`text-center text-lg font-semibold px-8 py-2 rounded-full transition-all ${
                selectedUserType === "restaurant" && "bg-rwBlack text-white"
              }`}
              onClick={() => setSelectedUserType("restaurant")}
            >
              As a restaurant
            </button>
          </div>
          {selectedUserType === "diner" && (
            <form
              onSubmit={submitRegisterDiner}
              className="flex flex-col gap-y-8"
            >
              <TextField
                label="e-mail"
                name="email"
                className="w-full"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                // error={methods.formState.errors.email}
                // helperText={methods.formState.errors?.email?.message}
                // {...methods.register("email")}
              />
              <TextField
                label="Username"
                name="username"
                className="w-full"
                type="text"
                required
                onChange={(e) => setUsername(e.target.value)}

                // error={methods.formState.errors.email}
                // helperText={methods.formState.errors?.email?.message}
                // {...methods.register("email")}
              />
              <TextField
                label="Phone Number (Optional)"
                name="phoneNumber"
                className="w-full"
                type="text"
                // error={methods.formState.errors.email}
                // helperText={methods.formState.errors?.email?.message}
                // {...methods.register("email")}
              />
              <TextField
                label="Password"
                name="password"
                className="w-full"
                type="password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}

                // error={methods.formState.errors.email}
                // helperText={methods.formState.errors?.email?.message}
                // {...methods.register("email")}
              />
              <TextField
                label="Confirm Password"
                name="password"
                className="w-full"
                type="password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}

                // error={methods.formState.errors.email}
                // helperText={methods.formState.errors?.email?.message}
                // {...methods.register("email")}
              />
              <div className="flex items-center space-x-8 justify-between">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="p-4 w-full rounded-lg  bg-rwCadetGray hover:brightness-110 transition-all font-semibold text-lg bottom-0"
                  // onClick={() => router.push("/")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="p-4 w-full rounded-lg disabled:text-slate-600 disabled:bg-slate-300 disabled:hover:brightness-100 bg-rwSalmon hover:brightness-110 transition-all font-semibold text-lg bottom-0"
                  // onClick={() => setCurrentReservationStep(1)}
                  // disabled={!selectedDate || !selectedPersonCount || !selectedTimeSlot}
                >
                  Register
                </button>
              </div>
            </form>
          )}
          {selectedUserType === "restaurant" && (
            <form
              onSubmit={submitRegisterRestaurant}
              className="flex flex-col gap-y-8"
            >
              <TextField
                label="Restaurant Name"
                name="restaurantName"
                className="w-full"
                type="text"
                onChange={(e) => setRestaurantName(e.target.value)}
                // error={methods.formState.errors.email}
                // helperText={methods.formState.errors?.email?.message}
                // {...methods.register("email")}
              />
              <Autocomplete
                name="Cuisine"
                value={selectedCuisine || ""}
                options={cuisineOptions}
                className="w-full"
                required
                onChange={(_, selectedValue) =>
                  setSelectedCuisine(selectedValue)
                }
                renderInput={(params) => (
                  <TextField {...params} label="Cuisine" />
                )}
              />
              <div className="flex items-center space-x-2">
                <TextField
                  label="Capacity (Customers)"
                  name="capacity"
                  className="w-1/2"
                  type="number"
                  required
                  onChange={(e) => {
                    setCapacity(e.target.value);
                    if (Number(e.target.value) < Number(maxGroupSize))
                      setMaxGroupSize(e.target.value);
                  }}
                  // error={methods.formState.errors.email}
                  // helperText={methods.formState.errors?.email?.message}
                  // {...methods.register("email")}
                />
                <TextField
                  label="Max Group Size"
                  name="maxGroupSize"
                  className="w-1/2"
                  type="number"
                  required
                  inputProps={{ max: capacity }}
                  onChange={(e) => {
                    if (Number(e.target.value) > Number(capacity)) {
                      setMaxGroupSize(capacity);
                    } else {
                      setMaxGroupSize(e.target.value);
                    }
                  }}
                  value={maxGroupSize}
                  // error={methods.formState.errors.email}
                  // helperText={methods.formState.errors?.email?.message}
                  // {...methods.register("email")}
                />
              </div>
              <TextField
                label="Short Description about the Restaurant (max. 250 characters)"
                name="description"
                className="w-full"
                type="text"
                rows={4}
                inputProps={{ maxLength: 250 }}
                multiline
                placeholder="e.g: Indulge in a mouthwatering array of burgers, from classic beef to gourmet creations, paired with crispy fries and refreshing beverages. A go-to spot for delicious and juicy burgers."
                onChange={(e) => setDescription(e.target.value)}
                // error={methods.formState.errors.email}
                // helperText={methods.formState.errors?.email?.message}
                // {...methods.register("email")}
              />
              <TextField
                label="e-mail"
                name="email"
                className="w-full"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                // error={methods.formState.errors.email}
                // helperText={methods.formState.errors?.email?.message}
                // {...methods.register("email")}
              />
              <TextField
                label="Username"
                name="username"
                className="w-full"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                required
                // error={methods.formState.errors.email}
                // helperText={methods.formState.errors?.email?.message}
                // {...methods.register("email")}
              />

              <TextField
                label="Password"
                name="password"
                className="w-full"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}

                // error={methods.formState.errors.email}
                // helperText={methods.formState.errors?.email?.message}
                // {...methods.register("email")}
              />
              <TextField
                label="Confirm Password"
                name="password"
                className="w-full"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}

                // error={methods.formState.errors.email}
                // helperText={methods.formState.errors?.email?.message}
                // {...methods.register("email")}
              />
              <div className="flex flex-col items-center space-y-4 justify-between">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="p-4 w-full rounded-lg  bg-rwCadetGray hover:brightness-110 transition-all font-semibold text-lg bottom-0"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="p-4 w-full rounded-lg disabled:text-slate-600 disabled:bg-slate-300 disabled:hover:brightness-100 bg-rwSalmon hover:brightness-110 transition-all font-semibold text-lg bottom-0"
                  onClick={() => router.push("/login")}
                  // disabled={!selectedDate || !selectedPersonCount || !selectedTimeSlot}
                >
                  Register & Create Restaurant
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
