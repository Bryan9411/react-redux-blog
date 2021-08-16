import styled from 'styled-components/macro';
import { MainLayout } from '../../layouts/MainLayout';
import { AiOutlineDown, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { Loading, CategoryArticle } from '../../components';
import { setIsLoading } from '../../redux/reducers/loadingReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useCallback } from 'react';
import {
  getArticles,
  getCategories,
  getCategoryArticles,
} from '../../api/WebApi';
import { useEffect } from 'react';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 960px;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
`;
const ListHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  p {
    font-size: 22px;
  }
  .category_container {
    position: relative;
    .category_default {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 7px 45px 7px 15px;
      background-color: #008080;
      border-radius: 3px;
      cursor: pointer;
      color: #fff;
      .down_icon {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        font-size: 15px;
        cursor: pointer;
      }
    }
    .category_options {
      position: absolute;
      padding: 0;
      width: 100%;
      z-index: 1;
      .category {
        background-color: #008080;
        color: #fff;
        padding: 7px 15px 7px 15px;
        display: block;
      }
    }
  }
`;

const CategoryItem = styled.li`
  background-color: #008080;
  color: #fff;
  padding: 7px 15px 7px 15px;
  display: block;
`;

const ListBody = styled.div`
  margin: 0 0 30px 0;
  padding: 0;
`;
const ListFooter = styled.div`
  display: flex;
  margin: auto;
  .last {
    cursor: pointer;
  }
  .next {
    cursor: pointer;
  }
  .page {
    margin: 0 10px;
  }
`;

export const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 當前頁面
  const [totalPage, setTotalPage] = useState();
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('all'); // 當前分類
  const [isOpen, setIsOpen] = useState(false);
  const pageLimit = 5; // 一頁限制五筆文章

  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.loading.isLoading);

  // 獲取所有文章
  const getAllArticles = useCallback(
    (currentPage, pageLimit) => {
      dispatch(setIsLoading(true));

      const getAllArticlesData = async (currentPage, pageLimit) => {
        try {
          const res = await getArticles(currentPage, pageLimit);
          const articles = await res.json();
          const totalArticles = res.headers.get('x-total-count'); //文章總數

          setArticles(articles);
          setTotalPage(Math.ceil(totalArticles / pageLimit));
          dispatch(setIsLoading(false));
        } catch (error) {
          console.log(error);
          dispatch(setIsLoading(false));
        }
      };
      getAllArticlesData(currentPage, pageLimit);
    },
    [dispatch]
  );

  // 獲取分類所有文章
  const getAllCategoryArticles = useCallback(
    (currentPage, pageLimit, category) => {
      dispatch(setIsLoading(true));

      const getAllCategoryArticlesData = async (
        currentPage,
        pageLimit,
        category
      ) => {
        try {
          const res = await getCategoryArticles(
            currentPage,
            pageLimit,
            category
          );
          const categoryArticles = await res.json();
          const totalCategoryArticles = res.headers.get('x-total-count'); //分類頁數
          setArticles(categoryArticles);
          setTotalPage(Math.ceil(totalCategoryArticles / pageLimit));
          dispatch(setIsLoading(false));
        } catch (error) {
          console.log(error);
          dispatch(setIsLoading(false));
        }
      };
      getAllCategoryArticlesData(currentPage, pageLimit, category);
    },
    [dispatch]
  );

  // 分類選單開關
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  // 切換分類 option
  const handleSelectCategory = (e) => {
    const categoryName = e.target.dataset.category;
    setCurrentCategory(categoryName);
    setCurrentPage(1);
    setTotalPage();
    setIsOpen(false);

    if (categoryName === 'all') {
      getAllArticles(1, pageLimit);
    } else {
      getAllCategoryArticles(1, pageLimit, categoryName);
    }
  };

  // 切換至下一頁
  const handleNextPage = () => {
    // if (currentPage === totalPage) return;
    if (currentCategory === 'all') {
      getArticles(currentPage + 1, pageLimit)
        .then((res) => res.json())
        .then((articles) => {
          setCurrentPage(currentPage + 1);
          setArticles(articles);
        });
    }
    getCategoryArticles(currentPage + 1, pageLimit, currentCategory)
      .then((res) => res.json())
      .then((categoryArticles) => {
        setCurrentPage(currentPage + 1);
        setArticles(categoryArticles);
      });
  };

  // 切換至上一頁
  const handleLastPage = () => {
    if (currentPage === 1) return;
    if (currentCategory === 'all') {
      getArticles(currentPage - 1, pageLimit)
        .then((res) => res.json())
        .then((articles) => {
          setCurrentPage(currentPage - 1);
          setArticles(articles);
        });
    }
    getCategoryArticles(currentPage - 1, pageLimit, currentCategory)
      .then((res) => res.json())
      .then((categoryArticles) => {
        setCurrentPage(currentPage - 1);
        setArticles(categoryArticles);
      });
  };
  useEffect(() => {
    if (currentCategory === 'all') {
      getAllArticles(currentPage, pageLimit);
    }
    getCategories().then((data) => {
      setCategories(data);
    });
  }, [dispatch, currentPage, getAllArticles, currentCategory]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <MainLayout>
      <ListContainer>
        <ListHead>
          <p className="title">
            {currentCategory === 'all' ? '所有文章' : currentCategory}
          </p>
          <div className="category_container">
            <div className="category_default" onClick={handleIsOpen}>
              {currentCategory === 'all' ? '文章類別' : currentCategory}
              <AiOutlineDown className="down_icon" />
            </div>
            {isOpen && (
              <ul className="category_options">
                {/* <li className="category">所有文章</li> */}
                {categories.map((category) => (
                  <CategoryItem
                    onClick={handleSelectCategory}
                    data-category={category.name}
                  >
                    {category.name}
                  </CategoryItem>
                ))}
              </ul>
            )}
          </div>
        </ListHead>
        <ListBody>
          {articles.map((article) => (
            <CategoryArticle
              article={article}
              notHasImage={!article.coverImage}
            />
          ))}
        </ListBody>
        <ListFooter>
          {currentPage !== 1 && (
            <AiOutlineLeft className="last" onClick={handleLastPage} />
          )}
          <div className="page">{currentPage}</div>
          {currentPage !== totalPage && (
            <AiOutlineRight className="next" onClick={handleNextPage} />
          )}
        </ListFooter>
      </ListContainer>
    </MainLayout>
  );
};
