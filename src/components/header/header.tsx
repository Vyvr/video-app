import { FC } from 'react';

import './header.css';

interface HeaderProps {
  children: React.ReactNode;
}

const Header: FC<HeaderProps> = (props) => {
  return <div id="header-container">{props.children}</div>;
};

export default Header;
