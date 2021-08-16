import styled from 'styled-components/macro';
import { AiOutlineFolder } from 'react-icons/ai';
import { MdDateRange } from 'react-icons/md';
import { Link } from 'react-router-dom';
const ArticleContainer = styled.li`
  display: flex;
  flex-direction: column;
  background-color: rgb(249, 249, 248);
  box-shadow: rgb(214 213 207) 0px 0px 20px 10px;
  color: #333;
  margin: 2rem auto;
  padding: 25px;
  border-radius: 10px;

  & + & {
    margin-top: 30px;
  }

  .article_title {
    width: fit-content;
    text-decoration: none;
    color: #333;
    font-size: 22px;
    font-weight: bold;
  }
  .article_body {
    margin-top: 10px;
    color: #333;
    p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 16px;
    }
  }
  .article_footer {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    .more_btn {
      color: teal;
      font-weight: bold;
    }
    .article_info {
      display: flex;
      justify-content: space-between;
      .article_date {
        display: flex;
        align-items: center;
        color: #333;
      }
      .article_category {
        display: flex;
        align-items: center;
        margin-left: 30px;
        .category {
          color: #333;
          text-decoration: none;
          cursor: pointer;
        }
      }
    }
  }
`;

export const Article = ({ article }) => {
  return (
    <ArticleContainer>
      <Link className="article_title" to={`/article/${article.id}`}>
        {article.title}
      </Link>
      <div className="article_body">
        <p>{article.body}</p>
      </div>
      <div className="article_footer">
        <Link to={`/article/${article.id}`} className="more_btn">
          Read More
        </Link>
        <div className="article_info">
          <div className="article_date">
            <MdDateRange />
            {new Date(article.createdAt).toLocaleDateString()}
          </div>
          <div className="article_category">
            <AiOutlineFolder />
            <Link to={`/category/${article.category}`} className="category">
              {article.category}
            </Link>
          </div>
        </div>
      </div>
    </ArticleContainer>
  );
};
