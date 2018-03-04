import React from "react";
import { Link } from "react-router-dom";
import { Block, Flex, Row, Inline } from "jsxstyle";
import { SMALL_SCREEN, LIGHT_GRAY, BRIGHT_GRAY } from "../../Theme";
import Logo from "../Logo";
import SmallScreen from "../SmallScreen";

const NavLink = ({ href, ...props }) => (
  <Block component="a" props={{ href }} margin="0 10px" {...props} />
);

const Button = ({ to, small, ...props }) => (
  <Block
    component={Link}
    activeBoxShadow="2px 2px 4px rgba(0,0,0,.25)"
    activeTop="5px"
    background="white"
    borderRadius="100px"
    boxShadow={
      small ? "0 5px 15px rgba(0, 0, 0, .25)" : "0 10px 30px rgba(0, 0, 0, .25)"
    }
    cursor="pointer"
    flex="1"
    fontSize="10px"
    fontWeight="bold"
    hoverBoxShadow={
      small ? "0 5px 10px rgba(0, 0, 0, .25)" : "0 10px 25px rgba(0, 0, 0, .25)"
    }
    hoverTop="1px"
    marginRight={small ? "10px" : "20px"}
    padding={small ? "10px" : "15px 25px"}
    position="relative"
    props={{ to }}
    textAlign="center"
    textTransform="uppercase"
    top="0"
    userSelect="none"
    whiteSpace="nowrap"
    {...props}
  />
);

const NavBar = () => (
  <Row textTransform="uppercase" fontWeight="bold" width="100%">
    <Block flex="1" fontSize="14px">
      <Inline component="a" props={{ href: "https://reacttraining.com" }}>
        React Training
      </Inline>
      <Inline> && </Inline>
      <Inline component="a" props={{ href: "https://docschina.org" }}>
        docschina
      </Inline>
      <Inline> / </Inline>
      <Inline
        component="a"
        props={{ href: "https://github.com/docschina/react-router.cn" }}
        color={LIGHT_GRAY}
      >
        React Router 中文文档
      </Inline>
    </Block>
    <Row fontSize="12px">
      <NavLink style={{ color: "red" }} href="https://docschina.org">
        <b>印记中文</b>
      </NavLink>
      <NavLink href="https://github.com/docschina/react-router.cn">
        Github
      </NavLink>
      <NavLink href="https://www.npmjs.com/package/react-router">NPM</NavLink>
      <NavLink href="https://reacttraining.com" margin="0">
        训练营
      </NavLink>
    </Row>
  </Row>
);

const Banner = () => (
  <SmallScreen>
    {isSmallScreen => (
      <Row width="100%">
        {!isSmallScreen && (
          <Block flex="1">
            <Logo />
          </Block>
        )}
        <Block flex="1">
          <Block lineHeight="1">
            <Block
              textTransform="uppercase"
              fontSize={isSmallScreen ? "80%" : "120%"}
              fontWeight="bold"
            >
              一次学习，随时随地 Route
            </Block>
            <Block
              component="h2"
              textTransform="uppercase"
              fontSize={isSmallScreen ? "200%" : "350%"}
              fontWeight="bold"
            >
              React Router
            </Block>
          </Block>

          <Block
            margin={`${isSmallScreen ? 20 : 20}px 0`}
            fontSize={isSmallScreen ? "80%" : null}
          >
            组件是 React 的核心功能，其拥有非常强大的声明式编程模型。React
            Router 是
            <b>
              导航组件
            </b>的集合，可与你的应用程序进行声明式的组合。无论你是想为你的 Web
            应用程序添加<b>书签</b>，还是在 <b>React Native</b>{" "}
            中进行组件化导航，React Router 都可以在 React 的任何位置渲染使用 -
            所以请考虑使用！
          </Block>

          <Row>
            <Button to="/web" small={isSmallScreen}>
              Web
            </Button>
            <Button to="/native" small={isSmallScreen}>
              Native
            </Button>
            <Button to="/core" small={isSmallScreen}>
              Anywhere
            </Button>
          </Row>
        </Block>
      </Row>
    )}
  </SmallScreen>
);

const Header = () => (
  <SmallScreen query={SMALL_SCREEN}>
    {isSmallScreen => (
      <Block background="linear-gradient(125deg, #fff, #f3f3f3 41%, #ededed 0, #fff)">
        <Block padding="20px" maxWidth="1000px" margin="auto">
          {!isSmallScreen && <NavBar />}
          <Block height={isSmallScreen ? "20px" : "40px"} />
          <Banner />
          <Block height="20px" />
        </Block>
      </Block>
    )}
  </SmallScreen>
);

export default Header;
