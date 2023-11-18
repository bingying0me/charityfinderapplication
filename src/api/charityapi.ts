import axios from "axios";

const CHARITY_API_URL = `${import.meta.env.VITE_BASE_URL}`;
const CHARITY_API_KEY = `${import.meta.env.VITE__API_KEY}`;

const generateRandomWord = (): string => {
  const words: string[] = [
    "aapi-led",
    "adoption",
    "afghanistan",
    "animals",
    "art",
    "athletics",
    "autism",
    "black-led",
    "buddhism",
    "cancer",
    "cats",
    "christianity",
    "climate",
    "conservation",
    "coronavirus",
    "culture",
    "dance",
    "disabilities",
    "disease",
    "dogs",
    "education",
    "environment",
    "filmandtv",
    "food-security",
    "freepress",
    "gender-equality",
    "health",
    "hinduism",
    "housing",
    "humans",
    "hurricane-ian",
    "immigrants",
    "indigenous-led",
    "indigenous-peoples",
    "islam",
    "judaism",
    "justice",
    "latine-led",
    "legal",
    "lgbt",
    "libraries",
    "mental-health",
    "museums",
    "music",
    "oceans",
    "parks",
    "poverty",
    "racial-justice",
    "radio",
    "refugees",
    "religion",
    "research",
    "science",
    "seniors",
    "space",
    "theater",
    "transgender",
    "ukraine",
    "veterans",
    "votingrights",
    "water",
    "wildfires",
    "wildlife",
    "women-led",
    "womens-health",
    "youth",
  ];
  const randomIndex: number = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

export const getCharitiesList = async (searchWord: string) => {
  const randomWord: string = generateRandomWord();
  const GET_CHARITIES_ENDPOINT: string = `${CHARITY_API_URL}/${searchWord ? searchWord : randomWord}?take=30&apiKey=${CHARITY_API_KEY}`;

  try {
    const response = await axios.get(GET_CHARITIES_ENDPOINT);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
