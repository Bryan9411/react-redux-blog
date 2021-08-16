import styled from 'styled-components/macro';
import { AiOutlineUser } from 'react-icons/ai';
import { MdDateRange } from 'react-icons/md';
import { Link } from 'react-router-dom';

const CategoryArticleContainer = styled.div`
  display: flex;
  padding: 25px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  box-shadow: rgb(214 213 207) 0px 0px 20px 10px;
  background-color: rgb(249, 249, 248);
  & + & {
    margin-top: 30px;
  }
`;
const ArticleInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.notHasImage ? '100%' : 'calc(100% - 185px)')};

  .article_head {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .label {
      padding: 8px 10px;
      margin-bottom: 2px;
      background-color: #f0f0f0;
      border-radius: 3px;
      font-size: 15px;
      font-weight: bold;
      width: 70px;
    }
    .title {
      margin-left: 15px;
      font-size: 22px;
      font-weight: bold;
      text-decoration: none;
      color: #333;
    }
  }
  .article_body {
    margin-top: 10px;
    color: #333;
    p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .article_footer {
    display: flex;
    align-items: center;
    margin-top: 20px;
    .date {
      display: flex;
      align-items: center;
      cursor: pointer;
      span {
        margin-left: 2px;
      }
    }
    .author {
      display: flex;
      align-items: center;
      margin-left: 15px;
      cursor: pointer;
      text-decoration: none;
      color: #333;
      :hover {
        color: teal;
      }
      span {
        margin-left: 2px;
      }
    }
  }
`;
const ArticleImage = styled.div`
  margin-left: 20px;
  width: 150px;
  height: 100px;
  background-color: #fff;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.3s;
  }
  :hover {
    img {
      transform: scale(1.1);
    }
  }
`;

export const CategoryArticle = ({ article, notHasImage }) => {
  return (
    <CategoryArticleContainer>
      <ArticleInfo notHasImage={notHasImage}>
        <div className="article_head">
          <div className="label">{article.category}</div>
          <Link className="title" to={`/article/${article.id}`}>
            {article.title}
          </Link>
        </div>
        <div className="article_body">
          <p>{article.body}</p>
        </div>
        <div className="article_footer">
          <div className="date">
            <MdDateRange />
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
          </div>
          <Link className="author" to={`/author/${article.user.id}`}>
            <AiOutlineUser />
            <span>{article.user.nickname}</span>
          </Link>
        </div>
      </ArticleInfo>
      <ArticleImage>
        <Link to={`/article/${article.id}`}>
          <img src={article.coverImage} alt="Article Cover" />
        </Link>
      </ArticleImage>
    </CategoryArticleContainer>
  );
};
