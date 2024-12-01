import css from './Reviews.module.css';
import { useSelector } from 'react-redux';
import { selectCamperDetails } from '../../redux/campers/selectors.js';
import icons from '@src/assets/sprite.svg';

export default function Reviews() {
  const { reviews = [] } = useSelector(selectCamperDetails) || {};

  return (
    <ul className={css.reviewsList}>
      {reviews.map((review, index) => (
        <li key={index}>
          <div className={css.review}>
            <div className={css.avatar}>
              {review.reviewer_name.split('')[0]}
            </div>
            <div className={css.reviewerName}>
              <h3 className={css.name}>{review.reviewer_name}</h3>
              <div className={css.stars}>
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <svg
                    key={starIndex}
                    className={`${css.starIcon} ${
                      starIndex < review.reviewer_rating ? css.filled : ''
                    }`}
                    width="16"
                    height="16"
                  >
                    <use href={`${icons}#icon_star`}></use>
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <p className={css.comment}>{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}
