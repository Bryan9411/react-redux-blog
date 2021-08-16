import { MainLayout } from '../../layouts/MainLayout';
import styled from 'styled-components/macro';
import { AiOutlineUser, AiOutlineFolder } from 'react-icons/ai';
import { MdDateRange } from 'react-icons/md';
import { getSingleArticle as getSingleArticleData } from '../../api/WebApi';
import { setIsLoading } from '../../redux/reducers/loadingReducer/loadingReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Loading } from '../../components';

const SingleArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 960px;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(249, 249, 248);
  box-shadow: rgb(214 213 207) 0px 0px 20px 10px;
  padding: 25px;
  border-radius: 10px;
`;
const ArticleHead = styled.div`
  .title {
    font-size: 22px;
    font-weight: bold;
  }
  .info {
    display: flex;
    align-items: center;
    margin: 20px 0;
    .date {
      display: flex;
      align-items: center;
      margin-right: 15px;
      svg {
        margin-right: 3px;
      }
    }
    .author {
      display: flex;
      align-items: center;
      margin-right: 15px;
      cursor: pointer;
      text-decoration: none;
      color: #333;
      :hover {
        color: teal;
      }
      svg {
        margin-right: 3px;
      }
    }
    .category {
      display: flex;
      align-items: center;
      cursor: pointer;
      svg {
        margin-right: 3px;
      }
    }
  }
  .image {
    width: 500px;
    margin: 20px 0;
    img {
      max-width: 100%;
    }
  }
`;
const ArticleBody = styled.div`
  p {
    white-space: pre-wrap;
    line-height: 1.5;
    word-break: break-word;
    font-size: 20px;
  }
`;

export const SingleArticlePage = () => {
  const [singleArticle, setSingleArticle] = useState([]);

  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.loading.isLoading);
  const { id } = useParams();

  useEffect(() => {
    const getSingleArticle = async () => {
      dispatch(setIsLoading(true));
      try {
        const singleArticle = await getSingleArticleData(id);
        setSingleArticle(singleArticle);
        dispatch(setIsLoading(false));
      } catch (error) {
        console.log(error);
        dispatch(setIsLoading(false));
      }
    };
    getSingleArticle();
  }, [dispatch, id]);

  if (isLoading) {
    return <Loading />;
  }
  console.log(singleArticle);
  return (
    <MainLayout>
      <SingleArticleContainer>
        <ArticleHead>
          <div className="title">{singleArticle.title}</div>
          <div className="info">
            <div className="date">
              <MdDateRange />
              {new Date(singleArticle.createdAt).toLocaleString()}
            </div>
            {singleArticle.user && (
              <Link className="author" to={`/author/${singleArticle.user.id}`}>
                <AiOutlineUser />
                {singleArticle.user.nickname}
              </Link>
            )}
            <div className="category">
              <AiOutlineFolder />
              {singleArticle.category}
            </div>
          </div>
          <div className="image">
            <img src={singleArticle.coverImage} alt="" />
          </div>
        </ArticleHead>
        <ArticleBody>
          <p>{singleArticle.body}</p>
        </ArticleBody>
      </SingleArticleContainer>
    </MainLayout>
  );
};
