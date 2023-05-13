import Head from 'next/head';
import Card from '../../components/UI/Card';
import { useRef, useState, useEffect } from 'react';
import LoginPageInput from '@/components/UI/LoginPageInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, removeTokenFromCookie } from '@/store/actions/userThunk';
import { AppDispatch, RootState } from '@/store/store';
import { errorGlobal } from '@/store/reducers/notificationsSlice';
import { PreventExtraSignIn } from '@/lib/HOC/PreventExtraSignIn';
import { useRouter } from 'next/router';
import neonBg from '../../../public/neonPattern.jpg';
import icon from '../../../public/favicon.ico'

export default function Login() {

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

    // Prevent extra sign in TODO TEST
    const router = useRouter();

    useEffect(()=>{
      if (user.data._id) router.push('/')
    }, [user.data._id, router]);


  const [actionType, setActionType] = useState<'login' | 'register'>('login');
  const actionTypeHandler = () => {
    setActionType(prevState => (prevState === 'login' ? 'register' : 'login'));
  };

  const nicknameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const clearInputs = () => {
    if (nicknameInput.current && passwordInput.current) {
      nicknameInput.current.value = '';
      passwordInput.current.value = '';
    }
  };

  const submitHandler = () => {
    if (user.loading) return;

    removeTokenFromCookie();

    const nickname = nicknameInput.current?.value;
    const password = passwordInput.current?.value;

    switch (actionType) {
      case 'login':
        if (nickname && password) {
          dispatch(
            loginUser({
              nickname,
              password,
            })
          );
        } else {
          dispatch(errorGlobal('Error while signing in'));
        }
        break;
        case 'register':
          if (nickname && password) {
          dispatch(
            registerUser({
              nickname,
              password,
            })
            );
          } else {
          dispatch(errorGlobal('Error while creating new user'));
        }

        break;
      default:
        throw new Error('Bad request');
    }

    clearInputs();
  };

  if (user.data._id) { // Prevent extra sign in
    return null;
  }

  return (
    <PreventExtraSignIn>
      <Head>
        <title>Login page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={icon.src} />
      </Head>
      <main className="flex min-h-screen justify-center" style={{backgroundImage: `url(${neonBg.src})`, backgroundRepeat:'repeat-y', backgroundPosition:'center'}}>
        <Card styles="mt-24 max-sm:w-5/6 max-sm:text-center dark:bg-black dark:border dark:border-white dark:border-2">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl">Welcome to QChat!</h1>
            <LoginPageInput inputConfig={{ type: 'text' }} style="mt-5" ref={nicknameInput} />
            <LoginPageInput inputConfig={{ type: 'password' }} style="mt-3" ref={passwordInput} />
            <button
              className={`${actionType === 'login' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-purple-500 hover:bg-purple-400'} py-2 px-4 mt-2 rounded-md w-full text-white duration-300`}
              type="submit"
              onClick={submitHandler}
            >
              {actionType[0].toUpperCase() + actionType.slice(1)}
            </button>
            <button onClick={actionTypeHandler} className="mt-2 underline duration-300">
              I want to {actionType === 'login' ? 'register' : 'login'}
            </button>
          </div>
        </Card>
      </main>
    </PreventExtraSignIn>
  );
}
