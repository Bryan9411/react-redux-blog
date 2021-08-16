import { MainLayout } from '../../layouts/MainLayout';
import { ReactComponent as BannerImage } from '../../assets/Banner.svg';
import styled from 'styled-components/macro';
import { Article, Loading } from '../../components';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { getArticles } from '../../api/WebApi';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading } from '../../redux/reducers/loadingReducer';

const BannerContainer = styled.div`
  max-width: 1100px;
  margin: 100px auto;
  padding: 0px 80px;
  & > svg {
    width: 100%;
    max-width: 900px;
    @media (max-width: 1280px) {
      max-width: 900px;
    }
  }
  @media (max-width: 1280px) {
    margin: 0;
    padding: 0 30px;
  }
`;
const ArticlesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  max-width: 960px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  & > li {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: calc(50% - 15px);
    @media (max-width: 768px) {
      width: calc(100% - 30px);
    }
  }
  & > li:last-child {
    width: 100%;
    @media (max-width: 1280px) {
      width: calc(100% - 30px);
    }
  }
`;

const ReadMoreBtn = styled(Link)`
  display: flex;
  align-items: center;
  margin: 50px auto 50px auto;
  padding: 12px 20px 12px 20px;
  border-radius: 20px;
  background-color: teal;
  text-decoration: none;
  color: rgb(255, 255, 255);
  max-width: 145px;
  width: 100%;
  transition: 0.5s ease-in-out;

  span {
    font-size: 16px;
    transition: 0.5s ease-in-out;
    color: #fff;
    :hover {
      color: rgb(244, 236, 188);
      transition: 0.5s ease-in-out;
    }
  }
  svg {
    font-size: 20px;
    margin-left: 10px;
    transition: 0.5s ease-in-out;
    :hover {
      width: 30px;

      color: rgb(244, 236, 188);
      transition: 0.5s ease-in-out;
    }
  }
`;

export const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.loading.isLoading);

  const pageNumber = 1;
  const pageLimit = 3;

  async function getAllArticles(pageNumber, pageLimit) {
    try {
      const response = await getArticles(pageNumber, pageLimit);
      const data = await response.json();
      setArticles(data);
      dispatch(setIsLoading(false));
    } catch (error) {
      console.log('錯誤：' + error);
      dispatch(setIsLoading(true));
    }
  }
  useEffect(() => {
    dispatch(setIsLoading(true));
    getAllArticles(pageNumber, pageLimit);
  }, [dispatch, pageNumber, pageLimit]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <MainLayout>
        <BannerContainer>
          <BannerImage />
        </BannerContainer>
        <ArticlesContainer>
          {articles.map((article) => (
            <Article article={article} key={article.id} />
          ))}
        </ArticlesContainer>
        <ReadMoreBtn to="./articlesPage">
          <span>全部文章</span>
          <BsArrowRight />
        </ReadMoreBtn>
      </MainLayout>
    </>
  );
};
