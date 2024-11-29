import clsx from 'clsx';
import css from './Button.module.css';

export default function Button({
  children,
  type = 'button',
  className = '',
  noBaseStyles = false,
  onClick = () => {},
}) {
  return (
    <button
      className={clsx(!noBaseStyles && css.button, className)}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
