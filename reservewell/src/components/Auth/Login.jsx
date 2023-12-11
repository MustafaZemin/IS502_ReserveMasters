import React, { useState } from "react";
import { Alert, Snackbar, TextField } from "@mui/material";
import { signin } from "@/firebase/config";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(null);
  };

  const submitLogin = async (event) => {
    event.preventDefault();
    const user = await signin(email, password, setError);
    if (user) {
      router.push("/");
    }
  };

  return (
    <form onSubmit={submitLogin} className="grid place-content-center">
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
          <h3 className="font-semibold text-2xl mb-4">Login</h3>
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
        </div>
        <div className="flex items-center space-x-8 justify-between">
          <button
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
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
