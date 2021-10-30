import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import Card from '../component/Card';
import Spinner from '../component/Spinner';
import { H1, H2, Paragraph, Subtitle } from '../component/Typography';
import { useAuthContext } from '../context';
import Main from '../layout/Main';

const Home = () => {
  const { contract, nearConfig, currentUser, wallet } = useAuthContext();
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogin = () => {
    setLoading(true);
    if (currentUser) {
      setTimeout(() => {
        history.push('/library');
        return;
      }, 3000);
    } else {
      wallet.requestSignIn(nearConfig.contractName, 'NEAR book wishes');
    }
  };

  const fetchBook = () => {
    setLoading(true);
    try {
      contract
        .get_books({ account_id: currentUser.account_id, skip: 0, limit: 5 })
        .then((resp) => setBooks(resp))
        .then(() => setLoading(false));
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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

        {/* best seller */}
        <div className="py-7 md:py-9">
          <div className="container text-center mb-6">
            <H2 className="mb-2">Best Seller</H2>
            <Subtitle className="">Almost read by a lot of reader</Subtitle>
          </div>
          <div className="mx-auto container px-4">
            <Slider {...settings}>
              {books?.map((item, key) => (
                <div key={key} className="p-4 h-full">
                  <Card {...item} status="Best Seller" />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* section feature */}
      </div>
      {loading && <Spinner />}
    </Main>
  );
};

export default Home;