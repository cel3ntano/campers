import css from './CamperDescription.module.css';

export default function CamperDescription({ description }) {
  return (
    <div className={css.camperDescription}>
      <p>{description}</p>
    </div>
  );
}
