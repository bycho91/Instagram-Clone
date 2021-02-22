import React, { useEffect, useState, useContext } from "react";
import * as ROUTES from "../constants/routes";
import { Link, useHistory } from "react-router-dom";
import igImage from "../assets/heart.jpg";
import logo from "../assets/logo.png";
import FirebaseContext from "../context/firebase";

const Login = () => {
  const history = useHistory();

  const { firebase } = useContext(FirebaseContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || email === "" ? true : false;

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  //USER ACTIONS
  //HAPPY / Sad scenarios

  //what happens when a user clicks login? -> make a call to firebase
  //function that can handle login
  //handle a successful login with
  //await firebase.auth().signInWithEmailAndPassword(emailAddress,password);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error.message);
    }
  };

  //IF not successful---
  //wrap the await function call to firebase in a try/catch
  //error: catch(error)
  //setError(error.message);

  //extra learnings: test.com
  //handle the email address validation client side
  //this removes a network call that is unnecessary.

  return (
    <div className="container mx-auto flex items-center h-screen max-w-screen-md">
      {/* Left Image on login page */}
      <div className="flex w-3/5 justify-center">
        <img
          src={igImage}
          alt="Instagram Heart"
          className="rounded-3xl object-cover w-4/5 shadow-sm"
        />
      </div>

      {/* Sign-in Form */}
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col border p-4 mb-4">
          <h1 className="flex justify-center w-full">
            <img src={logo} alt="Instagram Logo" className="mt-2 w-6/12" />
          </h1>

          {error && (
            <p className="text-xs text-red-400 text-center mb-4">{error}</p>
          )}

          <form method="POST" onSubmit={(e) => handleLogin(e)}>
            <input
              type="text"
              aria-label="Enter your email address"
              className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              aria-label="Enter your password"
              className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${
                isInvalid && "cursor-not-allowed opacity-50"
              }`}
            >
              Log In
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to={ROUTES.SIGN_UP} className="font-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
