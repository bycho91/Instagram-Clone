import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import logo from "../assets/logo.png";
import FirebaseContext from "../context/firebase";
import { doesUsernameExist } from "../services/firebase";

const Signup = () => {
  const history = useHistory();

  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid =
    username === "" || name === "" || email === "" || password === ""
      ? true
      : false;

  const handleSubmit = async (e) => {
    e.preventDefault();

    //check if usernameExists by using function imported (truthy/falsy)
    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          name: name,
          emailAddress: email.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now(),
        });
      } catch (err) {
        setName("");
        changeErrorMessage(err.message);
      }
    } else {
      setUsername("");
      changeErrorMessage("That username is already taken, please try another!");
    }
  };

  // VALIDATES WHETHER USERNAME HAS SPACE OR NOT
  const validateUsername = (username) => {
    if (username.includes(" ")) {
      changeErrorMessage("No spaces allowed in username");
    } else {
      setUsername(username);
    }
  };

  // FUNCTION FOR CHANGING AND DELETING ERROR MESSAGE AFTER 3 SECONDS
  const changeErrorMessage = (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => setError(""), 3000);
  };

  useEffect(() => {
    document.title = "Sign Up - Instagram";
  }, []);

  return (
    <div className="container h-screen flex items-center mx-auto max-w-xs">
      <div className="flex flex-col">
        <div className="flex flex-col items-center bg-white p-4 mb-4 border">
          {/* LOGO SECTION */}
          <h1 className="flex justify-center w-full">
            <img src={logo} alt="Instagram Logo" className=" w-6/12" />
          </h1>

          {/* ERROR MESSAGE SHOWN */}
          {error && <p className="text-xs text-red-400 mb-4">{error}</p>}
          {/* SIGNUP FORM SECTION*/}
          <form method="POST" onSubmit={handleSubmit}>
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray px-4 py-5 h-2 bg-gray-background mb-2 border-2 rounded w-full"
              value={username}
              onChange={(e) => validateUsername(e.target.value.toLowerCase())}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full name"
              className="text-sm text-gray px-4 py-5 h-2 bg-gray-background mb-2 border-2 rounded w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              aria-label="Enter your email address"
              type="email"
              placeholder="Email address"
              className="text-sm text-gray px-4 py-5 h-2 bg-gray-background mb-2 border-2 rounded w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray px-4 py-5 h-2 bg-gray-background mb-2 border-2 rounded w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`text-white w-full bg-blue-500 font-bold rounded py-2 ${
                isInvalid && "cursor-not-allowed opacity-50"
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* SWITCH TO LOGIN SECTION */}
        <div className="flex bg-white border w-full mx-auto items-center justify-center py-5">
          <p className="text-sm">
            Have an account?{" "}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-700">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
