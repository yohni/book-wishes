import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useAuthContext } from '../context';
import Spinner from './Spinner';

const schema = yup
  .object({
    title: yup.string().required(),
    status: yup.string().required(),
    description: yup.string().required(),
    image: yup.string().required(),
  })
  .required();

// "book":{"description":"Tutorial for mechanics","image":"https://example.com","title":"Motorcycle Mechanics 101","status":"List"}}'

const BookForm = ({ bookData }) => {
  const { contract } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setLoading(true);
    if (!bookData) {
      contract
        .add_book({
          book: data,
        })
        .then(() => setLoading(false))
        .then(() => toast.success('Book added! 🤘'))
        .then(() => window.location.reload(false));
    } else {
      contract.update_book({
        book_id: bookData.id,
        ...data,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            {...register('title')}
            type="text"
            placeholder="title"
            className="input input-bordered"
            value={bookData?.title}
          />
          <p className="text-error text-sm">{errors.title?.message}</p>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Status</span>
          </label>
          <select {...register('status')} class="select select-bordered w-full">
            <option selected>List</option>
            <option>Read</option>
            <option>Finished</option>
          </select>
          <p className="text-error text-sm">{errors.status?.message}</p>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            {...register('description')}
            type="text"
            placeholder="description"
            className="input input-bordered"
          />
          <p className="text-error text-sm">{errors.description?.message}</p>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Image Link</span>
          </label>
          <input
            {...register('image')}
            type="text"
            placeholder="eg.https://example.png"
            className="input input-bordered"
          />
          <p className="text-error text-sm">{errors.image?.message}</p>
        </div>
        <div className="modal-action">
          <input
            for="bookwish__modal"
            className="btn btn-accent bg-bookwishes"
            type="submit"
          />
          <label for="bookwish__modal" className="btn">
            Close
          </label>
        </div>
      </form>
      {loading && <Spinner />}
    </>
  );
};

export default BookForm;
