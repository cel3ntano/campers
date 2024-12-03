import css from './CamperDetails.module.css';
import { Suspense, useEffect } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCamperById } from '../../redux/campers/operations.js';
import CamperGeneralInfo from '../../components/catalog/camper/CamperGeneralInfo/CamperGeneralInfo.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import CamperImage from '../../components/catalog/camper/CamperImage/CamperImage.jsx';
import CamperDescription from '../../components/catalog/camper/CamperDescription/CamperDescription.jsx';
import { getNavlinkClass } from '../../helpers/getNavLinkClass.js';
import BookingForm from '../../components/BookingForm/BookingForm.jsx';
import {
  selectCamperDetails,
  selectIsError,
  selectIsLoading,
} from '../../redux/campers/selectors.js';

export default function CamperDetails() {
  const { id: camperId } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const camperDetails = useSelector(selectCamperDetails);

  useEffect(() => {
    dispatch(fetchCamperById(camperId));
  }, [dispatch, camperId]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <p className={css.errorMessage}>
        Something went wrong, please try reloading the page
      </p>
    );
  }

  if (!camperDetails) {
    return <p className={css.errorMessage}>No camper details found</p>;
  }

  const { id, price, rating, location, reviews, gallery, name, description } =
    camperDetails;

  return (
    <div className={`${css.camperDetails} container`}>
      <CamperGeneralInfo
        {...{ id, price, rating, location, reviews, name }}
        variant="details"
        showFavoriteButton={false}
      />
      {gallery && gallery.length > 0 ? (
        <ul className={css.camperImagesGallery}>
          {gallery.map((image, index) => (
            <li key={index}>
              <CamperImage
                image={image.thumb}
                alt={`${name}-photo-${index + 1}`}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No images available</p>
      )}
      <div className={css.description}>
        <CamperDescription description={description} variant="details" />
      </div>
      <div className={css.additionalInfoWpadpper}>
        <ul className={css.additionalInfoButtons}>
          <li>
            <NavLink
              to="features"
              className={({ isActive }) => getNavlinkClass(css, { isActive })}
            >
              Features
            </NavLink>
          </li>
          <li>
            <NavLink
              to="reviews"
              className={({ isActive }) => getNavlinkClass(css, { isActive })}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={css.bottomContainer}>
        <div className={css.additionalInfoWrapper}>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
        <div className={css.bookingFormWrapper}>
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
