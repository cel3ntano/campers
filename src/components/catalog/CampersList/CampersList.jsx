import { useEffect, useCallback } from 'react';
import css from './CampersList.module.css';
import CamperItem from '../CamperItem/CamperItem.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCampers,
  selectHasNextPage,
  selectIsLoading,
  selectPage,
} from '../../../redux/campers/selectors.js';
import toast from 'react-hot-toast';
import Button from '../Button/Button.jsx';
import { fetchCampers } from '../../../redux/campers/operations.js';
import clsx from 'clsx';
import { setPage } from '../../../redux/campers/slice.js';
import { selectFilters } from '../../../redux/filters/selectors.js';
import CamperItemSkeleton from '../CamperItemSkeleton/CamperItemSkeleton.jsx';

export default function CampersList() {
  const dispatch = useDispatch();
  const campersList = useSelector(selectCampers) ?? [];
  const page = useSelector(selectPage);
  const hasNextPage = useSelector(selectHasNextPage);
  const isLoading = useSelector(selectIsLoading);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(fetchCampers({}));
  }, [dispatch]);

  useEffect(() => {
    if (!hasNextPage && page > 1) {
      toast.success("You've reached the end of the list!", {
        position: 'bottom-center',
        duration: 3000,
      });
    }
  }, [hasNextPage, page]);

  const handleLoadMore = useCallback(() => {
    const nextPage = page + 1;
    dispatch(setPage(nextPage));
    dispatch(fetchCampers({ filters, page: nextPage }));
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
  }, [dispatch, filters, page]);

  const skeletonItems = Array(5)
    .fill(null)
    .map((_, index) => <CamperItemSkeleton key={index} />);

  return (
    <div className={css.campersListWrapper}>
      <ul className={css.campersList}>
        {isLoading && page === 1
          ? skeletonItems
          : campersList.map(camper => (
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
