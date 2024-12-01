import css from './CamperDescription.module.css';

export default function CamperDescription({
  description,
  variant = 'default',
}) {
  return (
    <div className={`${css.camperDescription} ${css[variant]}`}>
      <p>{description}</p>
    </div>
  );
}
