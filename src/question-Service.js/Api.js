 export const getQuestions = async ({ amount, category, difficulty, type }) => {
  let baseURL = `https://opentdb.com/api.php?amount=${amount}`;

  // category add only if not any
  if (category !== "any") {
    baseURL += `&category=${category}`;
  }

  // difficulty add only if not any
  if (difficulty !== "any") {
    baseURL += `&difficulty=${difficulty}`;
  }

  // type add only if not any
  if (type !== "any") {
    baseURL += `&type=${type}`;
  }

  const res = await fetch(baseURL);
  const data = await res.json();

  return data;
};
