import styled from 'styled-components/macro';
import { ImSearch } from 'react-icons/im';

const SearchBoxContainer = styled.div`
  display: flex;
  font-size: 16px;
  input {
    padding: 8px 10px 8px 20px;
    width: 90px;
    height: 40px;
    background-color: rgb(0, 128, 128);
    color: rgb(244, 236, 188);
    border: transparent;
    border-radius: 20px 0px 0px 20px;
    outline: none;
    transition: 0.5s ease-in-out;
    ::placeholder {
      color: rgb(244, 236, 188);
      opacity: 0.5;
    }
    :focus {
      width: 150px;
      transition: 0.5s ease-in-out;
    }
  }
  a {
    display: flex;
    align-items: center;
    padding: 0px 20px 0px 0px;
    background-color: rgb(0, 128, 128);
    color: rgb(244, 236, 188);
    border: transparent;
    border-radius: 0px 20px 20px 0px;
    cursor: pointer;
  }
`;
export const SearchBox = () => {
  return (
    <SearchBoxContainer>
      <input type="serch" placeholder="Type to search" />
      <a href="##" alt="search">
        <ImSearch />
      </a>
    </SearchBoxContainer>
  );
};
