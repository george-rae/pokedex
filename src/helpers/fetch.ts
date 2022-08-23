async function fetchData(
  category: string,
  term: string | number
): Promise<unknown> {
  const response = await fetch(`https://pokeapi.co/api/v2/${category}/${term}`);
  return response.json();
}

export default fetchData;
