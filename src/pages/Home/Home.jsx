import { Link } from 'react-router-dom';
import css from './Home.module.css';

export default function Home() {
  return (
    <main className={`${css.main} container`}>
      <h1 className={css.heading}>Campers of your dreams</h1>
      <p className={css.description}>
        You can find everything you want in our catalog
      </p>
      <Link to="/catalog" className="link">
        View Now
      </Link>
    </main>
  );
}
