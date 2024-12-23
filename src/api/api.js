import axios from 'axios';

const apiKey = import.meta.env.VITE_mockapiPrefix;
const baseURL = `https://${apiKey}mockapi.io`;
export const mockapi = axios.create({
  baseURL,
});

export const ITEMS_PER_PAGE = 5;
