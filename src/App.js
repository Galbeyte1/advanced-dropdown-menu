import React from "react";
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as BoltIcon } from './icons/bolt.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as CogItem } from './icons/cog.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';

import {useState, useEffect, useRef} from "react";
import { CSSTransition } from "react-transition-group";
/**
 *  An animated multilevel dropdown
 * npm install react-transition-group
 * 
 * CSSTransition package - help us control the conditional logic 
 * for rendering multiple menus and transitioing between them
 * when they are added and removed from the application
 * 
 * *CSSTransition doesn't actuallly animate anything directly. Instead adds or removes
 *  class based on the state of the animation, so you can handle the
 * the animations in your CSS*
 */

function App() {

  /* 
    In order to open and close a dropdown the navitem will
    have to have some state. We can manage state using a 
    hook called useState
  */
  return (
    <Navbar>
      <NavItem icon={<PlusIcon />} />
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<MessengerIcon />} />

      <NavItem icon={<CaretIcon />}>
        <DropdownMenu></DropdownMenu>
      </NavItem>

    </Navbar>
  );
}


/**
 * Similar to a NavBar
 * A dropdown has multiple dropdown items. In this ex we
 * will nest the dropdown items comp in dropdown menu. The
 * dropdown item will simply be a link, and props.children
 * will control the text of that link
 * 
 * Some dropdown items will have icons on the l and r
 * we can handle that in a flexiable way by having slots
 * for a left icon and a right icon. If blank it wont render
 * anything.
 * 
 * A basic dropdown item will take some text as a child
 * 
 * We will give out drop down menu some state to specify which
 * menu is currently visible. We will set the main menu as the
 * default and show a settings and animal also. Review
 * activeMenu : name of state
 * setActivemenu : how we change the state
 * 
 * */
function DropdownMenu() {
   const [activeMenu, setActiveMenu] = useState('main'); // setting, animal

  // A dynamic way to manage the height, since menu between state
  //  change may not instantly be removed the DOM by the time
  //    the new menu is visible
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null)

  /**
   * 
   * We will create a function called calculate height that
   * takes a DOM element as its argument. Because a DOM element
   * has the property called offset heigh which contains the num
   * of pixels of that that element
   */

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height)
  }

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])




  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        
        { props.children }

        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    // CSSTransition is expecting a prop of in, when true will animate its
    // children into the UI.
    // Unmount on exit will remove the children when not active
    // we set a timeout that will set a limit for the duration
    <div className="dropdown" style={{height: menuHeight}} ref={dropdownRef}>

      <CSSTransition 
        in={activeMenu === 'main'} 
        unmountOnExit 
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
        >
        <div className="menu">
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem 
            leftIcon={<CogItem/>}
            rightIcon={<ChevronIcon/>}
            goToMenu="settings"
            >
            Settings
            </DropdownItem>
            <DropdownItem
              leftIcon="🦧"
              rightIcon={<ChevronIcon />}
              goToMenu="animals"
              >
              Animals
            </DropdownItem>
        </div>
      </CSSTransition>


      <CSSTransition 
      in={activeMenu === 'settings'} 
      timeout={500}
      unmountOnExit
      classNames="menu-secondary"
      onEnter={calcHeight}
      >  
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />} >
            <h2>My Tutorial</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>HTML</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>CSS</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>JavaScript</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Awesome!</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'animals'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  )
}

/* 
  Passing data from parent to child via props
  Props has a built in property names childre
  It will project any UI element that you pass
  inside the actual tags of that component
*/
function Navbar(props) {
  return (
    <nav className='navbar'>
      <ul className='navbar-nav'>
        { props.children }
      </ul>
    </nav>
  );
}

/*
  Here NavItem returns a list element meant
  to be used inside of NavBar (justified to R)
  Props uses a custom property we define "icon"
*/
function NavItem(props) {

  const [open, setOpen] = useState(false); // returns 2 values in an array
  // the first value is a boolean state to tell us "open"
  // the second value is a func used to change the state
  // by derfault we've set the state to be false (closed)
  // the event onClick will be handled by the handler setOpen
  //  to negate/flip what the open value currently is
  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        { props.icon }
      </a>

      {open && props.children}
    </li>
  )
}

export default App;
