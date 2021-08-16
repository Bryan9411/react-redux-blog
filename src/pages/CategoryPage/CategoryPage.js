import styled from 'styled-components/macro';
import { MainLayout } from '../../layouts/MainLayout';
import { AiOutlineFolder } from 'react-icons/ai';
import { Article, Loading } from '../../components';
import { getAllCategoryArticles, getAssignCategory } from '../../api/WebApi';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setIsLoading } from '../../redux/reducers/loadingReducer';
import { useDispatch, useSelector } from 'react-redux';
const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 960px;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
`;
const CategoryHead = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  span {
    font-size: 22px;
    margin-left: 10px;
    font-weight: bold;
  }
`;
const CategoryBody = styled.div``;

export const CategoryPage = () => {
  const [articles, setArticles] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.loading.isLoading);

  let { categoryName } = useParams();

  useEffect(() => {
    dispatch(setIsLoading(true));

    getAssignCategory(categoryName).then((data) => {
      setCurrentCategory(categoryName);
      dispatch(setIsLoading(false));
    });
  }, [dispatch, categoryName]);

  useEffect(() => {
    dispatch(setIsLoading(true));

    async function getArticles(categoryName) {
      try {
        const data = await getAllCategoryArticles(categoryName);
        if (data.length === 0) {
          setArticles('');
          dispatch(setIsLoading(false));
          return;
        } else {
          setArticles(data);
          dispatch(setIsLoading(false));
        }
      } catch (error) {
        console.log('錯誤：' + error);
        dispatch(setIsLoading(false));
      }
    }
    getArticles(categoryName);
  }, [dispatch, categoryName]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <MainLayout>
      <CategoryContainer>
        <CategoryHead>
          <AiOutlineFolder />
          <span>{currentCategory}</span>
        </CategoryHead>
        <CategoryBody>
          {articles &&
            articles.map((article) => (
              <Article key={article.id} article={article} />
            ))}
        </CategoryBody>
      </CategoryContainer>
    </MainLayout>
  );
};
