import styled from "styled-components";
import logo from "../images/logo4.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Logo = styled.div`
display: flex;
align-items: flex-end;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #333333;
  max-height: 100px;
  color: white;
  flex-grow: 1;
`;

const Body = styled.div`
  flex-grow: 2;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #333333;
  max-height: 100px;
  color: white;
  flex-grow: 1;
`;

const Img = styled.img`
  height: 50px;
  margin: 0 0 0 25px;
`;

const Title = styled.span`
  font-size: 20px;
`;

const PageTitle = styled.p`
  font-size: 20px;
  margin-right: 100px;
`;

const Frame = ({ children, footer, title }) => {
  return (
    <Wrapper>
      <Header>
        <Logo>
          <Img src={logo}></Img>
          <Title>банные принадлежности</Title>
        </Logo>

        <PageTitle>{title}</PageTitle>
      </Header>
      <Body>{children}</Body>
      <Footer>{footer}</Footer>
    </Wrapper>
  );
};

export default Frame;
