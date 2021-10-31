import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useAuthContext } from '../context';
import Spinner from './Spinner';
import { Paragraph, Subtitle } from './Typography';
import Modal from './Modal';

const schema = yup
  .object({
    title: yup.string().required(),
    status: yup.string().required(),
    description: yup.string().required(),
    image: yup.string().required(),
  })
  .required();

// "book":{"description":"Tutorial for mechanics","image":"https://example.com","title":"Motorcycle Mechanics 101","status":"List"}}'

const BookForm = ({ bookData, id }) => {
  const { contract } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      return bookData;
    }, [bookData]),
  });

  useEffect(() => {
    reset(bookData);
  }, [bookData]);

  const removeBook = () => {
    setLoading(true);
    if (bookData) {
      contract
        .delete_book({ book_id: bookData.book_id })
        .then(() => setLoading(false))
        .then(() => toast.success('Book removed! 🤧'))
        .then(() => window.location.reload(false))
        .catch((error) => {
          console.log(error);
          setLoading(false);
          toast.error('Failed to remove the book! 😢');
        });
    }
  };

  const onSubmit = (data) => {
    setLoading(true);
    if (!bookData) {
      contract
        .add_book({
          book: data,
        })
        .then(() => setLoading(false))
        .then(() => toast.success('Book added! 🤘'))
        .then(() => window.location.reload(false))
        .catch((error) => {
          console.log(error);
          setLoading(false);
          toast.error('Failed to add the book! 😢');
        });
    } else {
      contract
        .update_book({
          book_id: bookData.book_id,
          ...data,
        })
        .then(() => toast.success('Book updated! 🤘'))
        .then(() => window.location.reload(false))
        .catch((error) => {
          console.log(error);
          setLoading(false);
          toast.error('Failed to update the book! 😢');
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Subtitle className="mb-4">
          {bookData ? 'Book Detail' : 'Add new book'}
        </Subtitle>
        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            {...register('title')}
            type="text"
            placeholder="title"
            className="input input-bordered"
            value={bookData?.title}
            disabled={bookData?.title}
          />
          <p className="text-error text-sm">{errors.title?.message}</p>
        </div>

        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            {...register('description')}
            type="text"
            placeholder="description"
            className="textarea h-24 textarea-bordered"
            value={bookData?.description}
            disabled={bookData?.description}
          ></textarea>
          <p className="text-error text-sm">{errors.description?.message}</p>
        </div>

        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text">Image Link</span>
          </label>
          <input
            {...register('image')}
            type="text"
            placeholder="eg.https://example.png"
            className="input input-bordered"
            value={bookData?.image}
            disabled={bookData?.image}
          />
          <p className="text-error text-sm">{errors.image?.message}</p>
        </div>

        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text">Status</span>
          </label>
          <select
            {...register('status')}
            className="select select-bordered w-full"
          >
            <option selected={bookData?.status === 'List'}>List</option>
            <option selected={bookData?.status === 'Read'}>Read</option>
            <option selected={bookData?.status === 'Finished'}>Finished</option>
          </select>
          <p className="text-error text-sm">{errors.status?.message}</p>
        </div>

        {bookData && (
          <div>
            <div className="divider opacity-20"></div>
            <Modal
              id={`remove${id}`}
              text="Remove the book"
              actionText="Yes"
              className="btn-outline btn-error w-full "
              handleClick={() => removeBook()}
            >
              <Paragraph className="mt-5">
                Do you want to remove the book{' '}
                <b className="text-error">{bookData.title}</b>?
              </Paragraph>
            </Modal>
          </div>
        )}

        <div className="modal-action">
          <input
            for={`bookwish__modal${id}`}
            className="btn btn-accent bg-bookwishes"
            type="submit"
            value="Save"
          />
          <label for={`bookwish__modal${id}`} className="btn">
            Close
          </label>
        </div>
      </form>

      {loading && <Spinner />}
    </>
  );
};

export default BookForm;
