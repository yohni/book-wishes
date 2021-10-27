import React, { useEffect, useState } from 'react';
import { H1, Subtitle } from '../component/Typography';
import { useAuthContext } from '../context';
import Main from '../layout/Main';

const Home = () => {
  const { contract, nearConfig, currentUser, wallet } = useAuthContext();
  const [books, setBooks] = useState(null);

  const handleLogin = () => {
    wallet.requestSignIn(nearConfig.contractName, 'NEAR book wishes');
  };

  const fetchBook = () => {
    contract.get_book({ book_id: 1 }).then((resp) => setBooks(resp));
    console.log(books);
  };

  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <Main>
      <div>
        {/* section 1 */}
        <div className="container flex flex-col justify-center md:grid md:grid-cols-2 md:gap-x-16 my-auto py-9 md:py-24 min-h-splash">
          <div className="flex flex-col md:justify-center">
            <div className="mb-6">
              <Subtitle className="mb-4">Online Book Stores</Subtitle>
              <H1 className="mb-4 md:mb-6">
                Collect Your Most Wish Book by{' '}
                <span className="bg-primary_gradient bg-clip-text text-transparent">
                  One Click
                </span>
              </H1>
              <Subtitle>
                Get your favorite book and pick the book to read next
              </Subtitle>
            </div>
            <button
              className="btn btn-primary bg-secondary_gradient hover-effect btn-lg w-full border-none md:w-min whitespace-nowrap shadow-md"
              onClick={handleLogin}
              type="button"
            >
              Sign Up Now
            </button>
          </div>

          <div>
            <img
              className="max-w-2xl w-full mt-9"
              src="https://firebasestorage.googleapis.com/v0/b/mindyksi.appspot.com/o/bookwishes%2Fsalyread.png?alt=media"
              alt=""
            />
          </div>
        </div>
        <div>
          <button className="btn">Test</button>
        </div>
      </div>
    </Main>
  );
};

export default Home;
