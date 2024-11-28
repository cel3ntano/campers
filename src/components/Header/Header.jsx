import css from './Header.module.css';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Header() {
  return (
    <header className={`${css.header} container`}>
      <Link to="/">
        <img
          className={css.headerLogoImage}
          src="/logo_TravelTrucks.svg"
          width="136"
          height="16"
          alt="Travel Trucks Logo"
        ></img>
      </Link>
      <nav className={css.headerNav}>
        <NavLink className={buildLinkClass} to="/">
          Home
        </NavLink>
        <NavLink className={buildLinkClass} to="/catalog">
          Catalog
        </NavLink>
      </nav>
    </header>
  );
}
