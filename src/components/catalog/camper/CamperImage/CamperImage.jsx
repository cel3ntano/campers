import css from './CamperImage.module.css';

export default function CamperImage({ image, alt }) {
  return <img className={css.camperImage} src={image} alt={alt}></img>;
}
