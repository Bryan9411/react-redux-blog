import { createSlice } from '@reduxjs/toolkit';

export const getArticlesReducer = createSlice({
  name: 'getPosts',
  initialState: {
    isLoading: false,
    articles: [],
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
  },
});

export const { setIsLoading, setArticles } = getArticlesReducer.actions;

// export const getArticles = (pageNumber, pageLimit) => (dispatch) => {
//   getArticlesApi(pageNumber, pageLimit).then((res) => {
//     dispatch(setIsLoading(true));
//     dispatch(setArticles(res));
//     dispatch(setIsLoading(false));
//   });
// };

export default getArticlesReducer.reducer;
