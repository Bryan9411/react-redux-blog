import styled from 'styled-components/macro';
import { MainLayout } from '../../layouts/MainLayout';
import { AiOutlineUser } from 'react-icons/ai';
import { Loading, Article } from '../../components';
import { getAuthorArticles } from '../../api/WebApi';
import { setIsLoading } from '../../redux/reducers/loadingReducer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const AuthorContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 960px;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
`;
const AuthorHead = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  span {
    font-size: 22px;
    margin-left: 10px;
    font-weight: bold;
  }
`;
const AuthorBody = styled.div``;

const NotFound = styled.p`
  font-size: 22px;
  color: teal;
  text-align: center;
  margin-top: 100px;
  letter-spacing: 0.3em;
`;

export const AuthorPage = () => {
  const [articles, setArticles] = useState([]);
  const [AuthorNickname, setAuthorNickname] = useState();
  const [hasAuthor, setHasAuthor] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.loading.isLoading);
  let { userId } = useParams();

  async function getArticles(userId) {
    dispatch(setIsLoading(true));
    try {
      const data = await getAuthorArticles(userId);
      setHasAuthor(true);
      setArticles(data);
      setAuthorNickname(data[0].user.nickname);
      dispatch(setIsLoading(false));
    } catch (error) {
      console.log(error);
      setHasAuthor(false);
      dispatch(setIsLoading(false));
    }
  }

  useEffect(() => {
    dispatch(setIsLoading(true));
    getArticles(userId);
  }, [dispatch, userId]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <MainLayout>
      <AuthorContainer>
        {hasAuthor ? (
          <>
            <AuthorHead>
              <AiOutlineUser />
              <span>{AuthorNickname}發表的所有文章</span>
            </AuthorHead>

            <AuthorBody>
              {articles.map((article) => (
                <Article article={article} key={article.id} />
              ))}
            </AuthorBody>
          </>
        ) : (
          <NotFound>找不到使用者資料</NotFound>
        )}
      </AuthorContainer>
    </MainLayout>
  );
};
