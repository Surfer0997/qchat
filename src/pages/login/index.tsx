import Head from "next/head";
import { Inter } from "next/font/google";
import Card from "../../components/UI/Card";
import { useRef, useState } from "react";
import LoginPageInput from "@/components/UI/LoginPageInput";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "@/store/actions/userThunk";
import { AppDispatch, RootState } from "@/store/store";
import { errorGlobal } from "@/store/reducers/notificationsSlice";
import { useRouter } from 'next/router'
import { PreventExtraSignIn } from "@/lib/HOC/PreventExtraSignIn";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  const [actionType, setActionType] = useState<"login" | "register">("login");
  const actionTypeHandler = () => {
    setActionType((prevState) =>
      prevState === "login" ? "register" : "login"
    );
  };

  const nicknameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const clearInputs = () => {
    if (nicknameInput.current && passwordInput.current) {
      nicknameInput.current.value = "";
      passwordInput.current.value = "";
    }
  };

  const submitHandler = () => {
    if (user.loading) return;

    const nickname = nicknameInput.current?.value;
    const password = passwordInput.current?.value;

    switch (actionType) {
      case "login":
        if (nickname && password) {
          dispatch(
            loginUser({
              nickname,
              password,
            })
          );
        } else {
          dispatch(errorGlobal("Error while creating new user"));
        }
        break;
      case "register":
        if (nickname && password) {
          dispatch(
            registerUser({
              nickname,
              password,
            })
          );
        } else {
          dispatch(errorGlobal("Error while signing in"));
        }

        break;
      default:
        throw new Error("Bad request");
    }

    clearInputs();
  };
  return (
    <PreventExtraSignIn>
      <Head>
        <title>Login page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen justify-center">
        <Card styles="mt-24">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl">Welcome to QChat!</h1>
            <LoginPageInput
              inputConfig={{ type: "text" }}
              style="mt-5"
              ref={nicknameInput}
            />
            <LoginPageInput
              inputConfig={{ type: "password" }}
              style="mt-3"
              ref={passwordInput}
            />
            <button
              className="bg-blue-600 py-2 px-4 mt-2 rounded-md w-full text-white"
              type="submit"
              onClick={submitHandler}
            >
              {actionType[0].toUpperCase() + actionType.slice(1)}
            </button>
            <button onClick={actionTypeHandler} className="mt-2 underline">
              I want to {actionType === "login" ? "register" : "login"}
            </button>
          </div>
        </Card>
      </main>
    </PreventExtraSignIn>
  );
}
