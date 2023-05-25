
// dataFetcher.js
import axios from 'axios';

const fetchingData = async (responseType, path) => {
  try {
    const response = await axios.get(
      'https://raw.githubusercontent.com/VoidVariable/CrazyRamblings/main/src/Tools' + path,
      { 
        responseType: responseType
      }
    );

    return response.data;
  } catch (error) {
    // Handle any errors that occur during the fetch.
    console.error('Error fetching Markdown data:', error);
    throw error;
  }
};
export default fetchingData;
