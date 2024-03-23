import axios from "axios";
import { ARTICLE_BASEURLS, SOURCE_BASEURLS } from "../config";

//Util file to get responses from all the apis
export const fetchSources = async (categories) => {
  try {
    const response = await axios.get(`${SOURCE_BASEURLS[0]}&categories=${categories.join(',')}`);
    return response.data.sources;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export const requestsArticle = async ({page, keyword, category, from_date, to_date}) => {
  const responses = [];
  for(let i = 0; i < ARTICLE_BASEURLS.length; i++) {
    let endpoint = ARTICLE_BASEURLS[i];
    let from_dt = from_date || '';
    let to_dt = to_date || '';
    switch(i) {
      case 1:
        if(from_dt)
        endpoint = `${endpoint}&begin_date=${from_dt.replace(/-/g, "")}`;
      if(to_dt)
        endpoint = `${endpoint}&end_date=${to_dt.replace(/-/g, "")}`;
      break;
      case 2:
        if(from_dt)
          endpoint = `${endpoint}&from-date=${from_dt}`;
        if(to_dt)
          endpoint = `${endpoint}&to-date=${to_dt}`;
      break;
      default:
    }    
    try {
      const response = await axios.get(`${endpoint}&q=${keyword}&category=${category}&page=${page}`);
      if (response.data && response.status === 200) {
        responses.push(response.data);

      } else {
        responses.push(null);
      }
    } catch (error) { responses.push(null); }
  }
  return responses;
}

