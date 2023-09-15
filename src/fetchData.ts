const fetchData = async (url: string) => {
  // const apiUrl = appendPath ? `https://pokeapi.co/api/v2/${url}` : url;

  // Make a GET request to the API
  return fetch(url)
    .then((response) => {
      // Check if the response status is OK (status code 200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response and return it
      return response.json();
    })
    .then((data) => {
      // Return the data from the API
      console.log(data);
      return data;
    })
    .catch((error) => {
      // Handle any errors that occur during the fetch
      console.error('Error fetching data:', error);
    });
};

export default fetchData;
