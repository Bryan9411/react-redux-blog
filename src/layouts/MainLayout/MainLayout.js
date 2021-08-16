import { Header, Footer } from '../../components';
import styled from 'styled-components/macro';

const Container = styled.div`
  background-color: #eeede7;
`;

export const MainLayout = ({ children }) => {
  return (
    <Container>
      <Header />
      {/* 內容*/}
      <div>{children}</div>
      <Footer />
    </Container>
  );
};
