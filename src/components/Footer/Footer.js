import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { AiFillGithub, AiOutlineMail } from 'react-icons/ai';

const FooterContainer = styled.div`
  padding: 0 0 30px 0;
  .footer_info {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const GitHubIcon = styled(Link)`
  margin: 5px 0 0 10px;
  color: #333;
  :hover {
    color: teal;
  }
`;
const MailIcon = styled(Link)`
  margin: 5px 0 0 10px;
  color: #333;
  :hover {
    color: teal;
  }
`;
const Source = styled(Link)`
  font-size: 14px;
  text-decoration: none;
  color: #333;
  letter-spacing: 0.1em;
  margin: 10px 0 0 10px;
  :hover {
    color: teal;
  }
`;
export const Footer = () => {
  return (
    <FooterContainer>
      <div className="footer_info">
        <p>© Bryan Wang</p>
        <GitHubIcon target="_blank">
          <AiFillGithub />
        </GitHubIcon>
        <MailIcon target="_blank">
          <AiOutlineMail />
        </MailIcon>
      </div>
      <div className="footer_info">
        <Source>Icons Source </Source>
        <Source>Source Code</Source>
      </div>
    </FooterContainer>
  );
};
