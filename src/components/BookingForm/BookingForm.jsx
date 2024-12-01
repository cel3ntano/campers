import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';
import css from './BookingForm.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../catalog/Button/Button.jsx';
import clsx from 'clsx';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required field')
    .min(2, 'Name should be at least 2 characters')
    .matches(/^[A-Za-z\s]+$/, 'Name should only contain letters'),
  email: yup
    .string()
    .required('Email is required field')
    .email('Invalid email address'),
  bookingDate: yup
    .date()
    .required('Please choose a booking date')
    .min(new Date(), 'Booking date cannot be in the past'),
  comment: yup.string().max(500, 'Comment should not exceed 500 characters'),
});

export default function BookingForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    console.log(data);
    toast.success('Booking request sent successfully!');
    reset();
  };

  return (
    <div className={css.formWrapper}>
      <h2 className={css.title}>Book your campervan now</h2>
      <p className={css.description}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputsContainer}>
          <div className={css.formGroup}>
            <label htmlFor="name" className="visually-hidden">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name*"
              className={css.input}
              {...register('name')}
            />
            {errors.name && (
              <span className={css.error}>{errors.name.message}</span>
            )}
          </div>

          <div className={css.formGroup}>
            <label htmlFor="email" className="visually-hidden">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email*"
              className={css.input}
              {...register('email')}
            />
            {errors.email && (
              <span className={css.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={css.formGroup}>
            <label htmlFor="bookingDate" className="visually-hidden">
              Booking Date
            </label>
            <Controller
              control={control}
              name="bookingDate"
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={date => field.onChange(date)}
                  dateFormat="MM/dd/yyyy"
                  minDate={new Date()}
                  className={css.input}
                  placeholderText="Booking date*"
                />
              )}
            />
            {errors.bookingDate && (
              <span className={css.error}>{errors.bookingDate.message}</span>
            )}
          </div>

          <div className={css.formGroup}>
            <label htmlFor="comment" className="visually-hidden">
              Comment
            </label>
            <textarea
              id="comment"
              placeholder="Comment"
              className={`${css.input} ${css.textarea}`}
              {...register('comment')}
            />
            {errors.comment && (
              <span className={css.error}>{errors.comment.message}</span>
            )}
          </div>
        </div>

        <Button type="submit" className={clsx(css.button, css.submitButton)}>
          Send
        </Button>
      </form>
    </div>
  );
}
