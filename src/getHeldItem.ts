import fetchData from './fetchData';

const getHeldItem = async (url: string) => {
  const itemData = await fetchData(url);
  const result = {
    name: itemData.name,
    sprite: itemData.sprites.default,
  };

  return result;
};

export default getHeldItem;
