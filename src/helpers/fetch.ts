async function fetchData(
  category: string,
  term: string | number
): Promise<unknown> {
  const data: any = await fetch(
    `https://pokeapi.co/api/v2/${category}/${term}`
  ).then((response) => response.json());
  return data;
}

export default fetchData;
