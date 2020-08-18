import React,{ useEffect, useState } from 'react';
//RFC
import { Container } from './styles';

const scrollThresHold = 300;

declare global {
  interface Window {
    toggleActiveMenu: (() => void) | undefined;

  }
}

const SideMenu: React.FC = ({children}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {

    function onScroll() {
      setScrollY(window.scrollY);
      setIsActive(false);

    }
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll)
  }, []);

  const classes = [
    isActive ? 'open': '',
    scrollY <= scrollThresHold ? 'scrollOpen' : '',
  ];
  const className = classes.join(' ').trim();

  function toggleActiveMenu() {
    setIsActive(!isActive);

  }

  window.toggleActiveMenu = toggleActiveMenu;


  return (
    <Container className={className}>
      {children}
    </Container>
  );
}

export default SideMenu;