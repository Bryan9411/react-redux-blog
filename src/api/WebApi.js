const BASE_URL = 'https://lidemy-blog-api.herokuapp.com';

// 獲取所有文章
export const getArticles = (page, limit) => {
  return fetch(
    `${BASE_URL}/articles?_sort=createdAt&_order=desc&_expand=user&_page=${page}&_limit=${limit}`
  );
};

// 獲取單篇文章
export const getSingleArticle = (id) => {
  return fetch(`${BASE_URL}/articles/${id}?_expand=user`).then((res) =>
    res.json()
  );
};

// 獲取所有分類
export const getCategories = () => {
  return fetch(`${BASE_URL}/categories`).then((res) => res.json());
};

// 獲取所有分類文章
export const getAllCategoryArticles = (category) => {
  return fetch(
    `${BASE_URL}/articles?_sort=createdAt&_order=desc&_expand=user&category=${category}`
  ).then((res) => res.json());
};

// 獲取分類文章(limit)
export const getCategoryArticles = (page, limit, category) => {
  return fetch(
    `${BASE_URL}/articles?_sort=createdAt&_order=desc&_expand=user&_page=${page}&_limit=${limit}&category=${category}`
  );
};

// 獲取指定分類
export const getAssignCategory = (category) => {
  return fetch(`${BASE_URL}/categories?name=${category}`).then((res) =>
    res.json()
  );
};

// 獲取 user 發佈的文章
export const getAuthorArticles = (userId) => {
  return fetch(
    `${BASE_URL}/articles?userId=${userId}&_sort=createdAt&_order=desc&_expand=user`
  ).then((res) => res.json());
};
