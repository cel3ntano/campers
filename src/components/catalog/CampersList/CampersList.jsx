import { useEffect, useCallback } from 'react';
import css from './CampersList.module.css';
import CamperItem from '../CamperItem/CamperItem.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCampers,
  selectHasNextPage,
  selectIsError,
  selectIsLoading,
  selectPage,
} from '../../../redux/campers/selectors.js';
import toast from 'react-hot-toast';
import Loader from '../../Loader/Loader.jsx';
import Button from '../Button/Button.jsx';
import { fetchCampers } from '../../../redux/campers/operations.js';
import clsx from 'clsx';
import { setPage } from '../../../redux/campers/slice.js';

export default function CampersList() {
  const dispatch = useDispatch();
  const campersList = useSelector(selectCampers) ?? [];
  const page = useSelector(selectPage);
  const hasNextPage = useSelector(selectHasNextPage);
  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchCampers({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong. Try reloading the page');
    }
  }, [isError]);

  useEffect(() => {
    if (!hasNextPage && page > 1) {
      toast.success("You've reached the end of the list!", {
        position: 'bottom-center',
        duration: 3000,
      });
    }
  }, [hasNextPage, page]);

  const handleLoadMore = useCallback(() => {
    dispatch(setPage(page + 1));

    setTimeout(() => {
      const listElement = document.querySelector(`.${css.campersList}`);
      const newItems = listElement?.querySelectorAll('li');
      if (newItems && newItems.length > 0) {
        try {
          const cardHeight = newItems[0].offsetHeight;
          window.scrollBy({
            top: cardHeight,
            behavior: 'smooth',
          });
        } catch (error) {
          console.error('Scroll error:', error);
        }
      }
    }, 200);
  }, [dispatch, page]);

  if (isLoading && campersList.length === 0) {
    return <Loader />;
  }

  return (
    <div>
      <ul className={css.campersList}>
        {campersList.map(camper => (
          <CamperItem key={camper.id} {...camper} />
        ))}
      </ul>
      {hasNextPage && (
        <Button
          className={clsx(css.button, css.loadMoreButton)}
          onClick={handleLoadMore}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load more'}
        </Button>
      )}
    </div>
  );
}
