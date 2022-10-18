async function fetchData(
  category: string,
  term: string | number
): Promise<unknown> {
  let data;
  await fetch(`https://pokeapi.co/api/v2/${category}/${term}`).then(
    (response) => (data = response.json())
  );
  return data;
}

export default fetchData;
