import { useEffect, useState } from 'react';
import css from './CampersList.module.css';
import axios from 'axios';
import CamperItem from '../CamperItem/CamperItem.jsx';

export default function CampersList() {
  const [campersList, setCampersList] = useState([]);

  useEffect(() => {
    const fetchCampers = async () => {
      const { data } = await axios.get(
        'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers'
      );

      setCampersList(data.items);
    };
    fetchCampers();
  }, []);

  return (
    <ul className={css.campersList}>
      {campersList.map(camper => (
        <CamperItem key={camper.id} {...camper} />
      ))}
    </ul>
  );
}
