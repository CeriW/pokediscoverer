import { fetchData } from './fetchData';

const getHeldItem = async (url: string) => {
  const itemData = await fetchData(url);
  console.log(itemData);

  const result = {
    name: itemData.name,
    sprite: itemData.sprites.default,
  };

  return result;

  // return fetch(url)
  //   .then(async (response) => {
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const info = await response.json();

  //     const result = {
  //       name: info.name,
  //       sprite: info.sprites.default,
  //     };

  //     return result;
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //     throw error;
  //   });
};

export default getHeldItem;
