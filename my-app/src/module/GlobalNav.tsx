import React from "react";
import { NavLink } from "react-router-dom";
import style from "./GlobalNav.module.css";

const GlobalNav = () => {
  const navLink = [
    {
      id: 1,
      to: '/',
      value: "Home"
    },
    {
      id: 2,
      to: '/add',
      value: "Add Music"
    },
    {
      id: 3,
      to: '/contact',
      value: "Contact"
    }
  ];

  return (
    <nav className={style.container}>
      {navLink.map((link) => (
        <NavLink
          key={link.id}  // Use unique id as the key
          to={link.to}
          end
          className={({ isActive }) => (isActive ? style.active : undefined)}
        >
          {link.value}
        </NavLink>
      ))}
    </nav>
  );
};

export default GlobalNav;
