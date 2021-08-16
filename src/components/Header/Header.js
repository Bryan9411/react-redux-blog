import styled from 'styled-components/macro';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { SearchBox } from '../SearchBox';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1500px;
  margin: auto;
  padding: 1rem;
  @media (max-width: 575px) {
    padding: 10px;
  }
  .header_left {
    margin: 10px 20px;
    .logo {
      text-decoration: none;
      font-size: 2rem;
      font-weight: bold;
      padding: 1rem;
      color: teal;
      @media (max-width: 575px) {
        padding: 10px;
      }
    }
  }
  .header_right {
    display: flex;
    align-items: center;
    margin: 10px 20px;
    .header_menu {
      position: relative;
      width: 50px;
      height: 50px;
      cursor: pointer;
      transition: all 0.3s ease 0s;
      margin-left: 30px;
      .header_menu_btn {
        position: absolute;
        font-size: 1.5rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: teal;
        font-weight: bold;
        font-size: 35px;
        margin-top: 3px;
      }
    }
  }
`;
const SideMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  width: 450px;
  height: 100%;
  background-color: #a2b59f;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  transition: 0.5s;
  z-index: 2;
  transform: ${(props) =>
    props.$isOpen ? 'translateX(0)' : 'translateX(100%)'};
  @media (max-width: 575px) {
    width: 360px;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 45px;
  right: 45px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 50px;
  color: #fff;
`;

const SideMenuList = styled.div`
  display: flex;
  flex-direction: column;
`;

const SideMenuItem = styled(Link)`
  font-size: 30px;
  color: #eff2f5;
  text-decoration: none;
  & + & {
    margin-top: 40px;
  }
`;

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 側邊欄選單打開
  const handleMenuOpen = () => {
    setIsOpen(true);
  };

  // 關閉側邊欄選單
  const handleCloseMenu = () => {
    setIsOpen(false);
  };
  return (
    <HeaderContainer>
      <div className="header_left">
        <a href="#/" className="logo">
          My Blog
        </a>
      </div>
      <div className="header_right">
        <SearchBox />
        <div className="header_menu">
          <div className="header_menu_btn" onClick={handleMenuOpen}>
            <FiMenu />
          </div>
        </div>
      </div>
      <SideMenu $isOpen={isOpen}>
        <CloseButton>
          <AiOutlineClose onClick={handleCloseMenu} />
        </CloseButton>
        <SideMenuList>
          <SideMenuItem to="/">Home</SideMenuItem>
          <SideMenuItem to="/">List</SideMenuItem>
          <SideMenuItem to="/">Add Post</SideMenuItem>
          <SideMenuItem to="/">SignIn</SideMenuItem>
        </SideMenuList>
      </SideMenu>
    </HeaderContainer>
  );
};
