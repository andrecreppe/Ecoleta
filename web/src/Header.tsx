import React from 'react';

interface HeaderProps {
  title: string;
  //propriedade obrigatória
  //title?: string >> propriedade opcional
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header>
      <h1>{ props.title }</h1>
    </header>
  );
}

export default Header;
