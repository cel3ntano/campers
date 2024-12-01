import CampersFilters from '../../components/catalog/CampersFilters/CampersFilters.jsx';
import CampersList from '../../components/catalog/CampersList/CampersList.jsx';
import css from './Catalog.module.css';

export default function Catalog() {
  return (
    <div className={`${css.catalogPage} container`}>
      <h1 className="visually-hidden">Campers catalog</h1>
      <CampersFilters />
      <CampersList />
    </div>
  );
}
