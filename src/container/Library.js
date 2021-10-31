import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '../component/Card';
import Spinner from '../component/Spinner';
import { Paragraph } from '../component/Typography';
import { useAuthContext } from '../context';
import Main from '../layout/Main';
import Modal from '../component/Modal';
import BookForm from '../component/BookForm';

const Library = () => {
  const { contract, nearConfig, currentUser, wallet } = useAuthContext();
  const STATUSES = ['All', 'List', 'Read', 'Finished'];
  const [status, setStatus] = useState('All');
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const changeStatus = (newStatus) => () => {
    setStatus(newStatus);
  };

  const fetchBooks = ({ skip, limit }) => {
    setLoading(true);
    contract
      .get_books({ account_id: currentUser.account_id, skip, limit })
      .then((resp) => {
        setBooks([...books, ...resp]);
      })
      .then(() => setLoading(false))
      .catch((error) => {
        setLoading(false);
        setHasMore(false);
        console.log(error);
        if (!String(error).includes('please use a smaller skip'))
          toast.error('Failed to fetch data 😢');
      });
  };

  const fetchDataMore = () => {
    setSkip(skip + 10);
  };

  useEffect(() => {
    fetchBooks({ skip, limit });
  }, [skip, limit]);

  useEffect(() => {
    const payload = { skip, limit };
    fetchBooks(payload);
  }, []);

  useEffect(() => {
    setLoading(true);

    if (status === 'All') setFiltered(books);
    else {
      const temp = books.filter((item) => item.status === status);
      setFiltered(temp);
    }
    setLoading(false);
  }, [books, status]);

  return (
    <Main>
      <div className="tabs tabs-boxed container mt-9 mb-5">
        {STATUSES.map((item, key) => (
          <button
            key={key}
            type="button"
            onClick={changeStatus(item)}
            className={classNames(
              'tab rounded-lg transition-colors duration-200',
              {
                'bg-bookwishes text-white': status === item,
              }
            )}
          >
            <Paragraph>{item}</Paragraph>
          </button>
        ))}
      </div>
      <InfiniteScroll
        dataLength={filtered.length} //This is important field to render the next data
        next={fetchDataMore}
        hasMore={hasMore}
        loader={
          <h4 className="text-center text-lg text-gray-400">
            Catching more books...
          </h4>
        }
      >
        <div className="container py-6 md:py-9">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-9">
            {filtered.map((item, key) => (
              <div key={key} className="h-full flex flex-col">
                <Card id={key} {...item} />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
      {!loading && filtered.length < 1 && (
        <div className="w-full h-96 flex flex-col justify-center items-center text-xl">
          <div>🙅🏻‍♂️</div>
          <div className="text-neutral opacity-60 font-bold">
            Books not found!
          </div>
        </div>
      )}
      <Modal
        noAction
        text="&#x2B; New Book"
        className="fixed bottom-8 right-8 shadow-2xl"
      >
        <BookForm />
      </Modal>
      {loading && <Spinner />}
    </Main>
  );
};

export default Library;
