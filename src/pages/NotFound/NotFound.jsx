import { Link } from 'react-router-dom';
import css from './NotFound.module.css';

export default function NotFound() {
  return (
    <main className={`${css.main} container`}>
      <div className={css.content}>
        <h1 className={css.heading}>Page not found</h1>
        <Link to="/" className="link">
          Return Home
        </Link>
      </div>
    </main>
  );
}
