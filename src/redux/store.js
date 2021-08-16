import { configureStore } from '@reduxjs/toolkit';
import getArticlesReducer from './reducers/getArticlesReducer/getArticlesReducer';
import loadingReducer from './reducers/loadingReducer/loadingReducer';
export default configureStore({
  reducer: {
    articles: getArticlesReducer,
    loading: loadingReducer,
  },
});
