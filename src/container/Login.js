import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Spinner from '../component/Spinner';
import { H1, Subtitle } from '../component/Typography';
import { useAuthContext } from '../context';
import Main from '../layout/Main';

function Login() {
  const { nearConfig, currentUser, wallet } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    wallet.requestSignIn(nearConfig.contractName, 'NEAR book wishes');
  };

  if (currentUser) {
    return <Redirect to="/library" />;
  }

  return (
    <Main className="flex items-stretch">
      <div className="container flex flex-col justify-center md:grid md:grid-cols-2 my-auto md:gap-16">
        <div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mindyksi.appspot.com/o/bookwishes%2Fsalyrocket.png?alt=media"
            alt=""
          />
        </div>
        <div className="flex flex-col md:justify-center">
          <div className="mb-6">
            <H1 className="mb-4 md:mb-6">Login and Enjoy Your Book</H1>
            <Subtitle>
              Get your favorite book and pick the book to read next
            </Subtitle>
          </div>
          <button
            className="btn btn-primary hover-effect bg-primary_gradient w-full border-none md:w-min whitespace-nowrap shadow-md"
            onClick={handleLogin}
            type="button"
          >
            Login with Near Wallet
          </button>
        </div>
      </div>
      {loading && <Spinner />}
    </Main>
  );
}

export default Login;
