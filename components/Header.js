import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";

import { linkResolver } from "../prismicio";

export const Header = ({ navigation, settings }) => {

  function toggleMenu() {
    var element = document.getElementById("navItems");
    element.classList.toggle("active");

    var element2 = document.getElementById("toggle");
    element2.classList.toggle("active");
  }

  return (
    <header>
      <div className="hamburger" onClick={toggleMenu} id="toggle"></div>
      <div className="nav-items" id="navItems">
        {navigation.data.menu_items.map((item, i) => {
          return(
            <PrismicLink key={`menulink${i}`} field={item.link}>{item.title}</PrismicLink>
          )
        })}
      </div>
    </header>
  );
};
