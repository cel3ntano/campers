import css from './CamperItemSkeleton.module.css';

export default function CamperItemSkeleton() {
  return (
    <li className={css.skeletonItem}>
      <div className={css.skeletonImage}></div>
      <div className={css.infoSection}>
        <div className={css.header}>
          <div className={css.titleRow}>
            <div className={css.skeletonTitle}></div>
            <div className={css.skeletonPrice}></div>
            <div className={css.skeletonHeart}></div>
          </div>
          <div className={css.metaRow}>
            <div className={css.skeletonRating}></div>
            <div className={css.skeletonLocation}></div>
          </div>
        </div>

        <div className={css.skeletonDescription}></div>
        <div>
          <ul className={css.equipmentList}>
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <li key={index} className={css.skeletonEquipmentItem}>
                  <div className={css.skeletonIcon}></div>
                  <div className={css.skeletonLabel}></div>
                </li>
              ))}
          </ul>
        </div>

        <div className={css.skeletonButton}></div>
      </div>
    </li>
  );
}
