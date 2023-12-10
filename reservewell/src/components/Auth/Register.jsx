import { Alert, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import { signup } from "../../firebase/config";
import { useRouter } from "next/router";
import db from "../../firebase/config";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
// import { useForm } from "react-hook-form";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatchError, setIsPasswordMatchError] = useState(false);
  const router = useRouter();

  const usersCollectionRef = collection(db, "users");

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsPasswordMatchError(false);
  };
  const submitRegister = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setIsPasswordMatchError(true);
      return;
    }

    setIsPasswordMatchError(false);
    const user = await signup(email, password);
    console.log(user);
    if (user) {
      const usersRef = doc(usersCollectionRef);

      const reqBody = {
        id: user.uid,
        email: user.email,
        username: user.displayName || "user",
        reservationCounter: 0,
        createdAt: user.metadata.creationTime || "",
      };
      await setDoc(usersRef, reqBody);

      //   router.push("/login");
    }

    // console.log(email, password, confirmPassword);
  };

  return (
    <form onSubmit={submitRegister} className="grid place-content-center">
      <Snackbar
        autoHideDuration={2500}
        open={isPasswordMatchError}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" className="items-center text-lg font-semibold">
          Passwords should match!
        </Alert>
      </Snackbar>
      <div className="w-[600px] min-h-[600px] flex flex-col justify-between gap-y-4 rounded-lg bg-white mt-12 p-8">
        <div className="flex flex-col gap-y-8">
          <h3 className="font-semibold text-2xl mb-4">Register</h3>
          <TextField
            label="e-mail"
            name="email"
            className="w-full"
            type="email"
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
        </div>
        <div className="flex items-center space-x-8 justify-between">
          <button
            className="p-4 w-full rounded-lg  bg-rwCadetGray hover:brightness-110 transition-all font-semibold text-lg bottom-0"
            // onClick={() => router.push("/")}
          >
            Cancel
          </button>
          <button
            className="p-4 w-full rounded-lg disabled:text-slate-600 disabled:bg-slate-300 disabled:hover:brightness-100 bg-rwSalmon hover:brightness-110 transition-all font-semibold text-lg bottom-0"
            // onClick={() => setCurrentReservationStep(1)}
            // disabled={!selectedDate || !selectedPersonCount || !selectedTimeSlot}
          >
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
