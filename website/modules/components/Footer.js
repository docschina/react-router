import React from "react";
import { Block, Inline } from "jsxstyle";
import { DARK_GRAY, BRIGHT_GRAY, LIGHT_GRAY } from "../Theme";
import MailingListSignup from "./MailingListSignup";

const FooterLink = ({ href, ...rest }) => (
  <Inline component="a" props={{ href }} {...rest} textDecoration="underline" />
);

const ReactTraining = () => (
  <FooterLink href="https://reacttraining.com">React Training</FooterLink>
);

const Docschina = () => (
  <FooterLink href="https://docschina.org">
    <b>印记中文</b>
  </FooterLink>
);

const Contributors = () => (
  <FooterLink href="https://github.com/ReactTraining/react-router/graphs/contributors">
    contributors
  </FooterLink>
);

const ContributorsCN = () => (
  <FooterLink href="https://github.com/docschina/react-router.cn/graphs/contributors">
    contributors
  </FooterLink>
);

const CC = () => (
  <FooterLink href="https://creativecommons.org/licenses/by/4.0/">
    CC 4.0
  </FooterLink>
);

const year = new Date().getFullYear();

const Footer = () => (
  <Block>
    <MailingListSignup />
    <Block
      background={DARK_GRAY}
      color={BRIGHT_GRAY}
      padding="40px"
      textAlign="center"
      fontSize="80%"
    >
      <Block component="p">
        React Router 由 <ReactTraining /> 以及数百名的 <Contributors />{" "}
        构建和维护。
      </Block>
      <Block component="p">
        React Router 中文网由 <Docschina /> 以及参与翻译的 <ContributorsCN />{" "}
        构建和维护。
      </Block>
      <Block marginTop="20px" color={LIGHT_GRAY}>
        &copy; {year} 印记中文
      </Block>
      <Block color={LIGHT_GRAY}>
        代码示例以及文档都遵循 <CC />
      </Block>
    </Block>
  </Block>
);

export default Footer;
