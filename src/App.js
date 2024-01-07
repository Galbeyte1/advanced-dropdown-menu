import React from "react";
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as BoltIcon } from './icons/bolt.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as CogItem } from './icons/cog.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';

import {useState} from "react";

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

        <DropdownMenu/>

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
 * */
function DropdownMenu() {

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item">
        <span className="icon-button">{props.leftIcon}</span>
        
        { props.children }

        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown">
      <DropdownItem>My Profile</DropdownItem>
      <DropdownItem 
        leftIcon={<CogItem/>}
        rightIcon={<ChevronIcon/>}>

      </DropdownItem>

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
