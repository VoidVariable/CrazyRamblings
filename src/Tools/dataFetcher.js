
// dataFetcher.js
import axios from 'axios';

//I probably shouldnt be storing data in a file 
//But screw the rules
var selectedRep = 'https://raw.githubusercontent.com/VoidVariable/CrazyRamblings/main/src/Tools';
export var selectedVault = 'Obsidian';
var temp = "/Vaults/"

export function setRep(link, repName){
  selectedRep = link;
  selectedVault = repName;
}

const fetchingData = async (responseType, path, useExtra = false) => {
  try 
  {
    var thisTemp = '';
    if(useExtra)
       thisTemp = selectedRep + temp + selectedVault;
    else
    {
      thisTemp = path;
    }

    const response = await axios.get(
      thisTemp,
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
