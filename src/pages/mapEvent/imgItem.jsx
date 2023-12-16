import React from "react";
import Paldea1 from "@imgs/paldea/1.png";
import Paldea2 from "@imgs/paldea/2.png";
import Paldea3 from "@imgs/paldea/3.png";
import Paldea4 from "@imgs/paldea/4.png";
import Paldea5 from "@imgs/paldea/5.png";
import Paldea6 from "@imgs/paldea/6.png";
import Paldea7 from "@imgs/paldea/7.png";
import Paldea8 from "@imgs/paldea/8.png";
import Paldea9 from "@imgs/paldea/9.png";
import Paldea10 from "@imgs/paldea/10.png";
import Paldea11 from "@imgs/paldea/11.png";
import Paldea12 from "@imgs/paldea/12.png";
import Paldea13 from "@imgs/paldea/13.png";
import Paldea14 from "@imgs/paldea/14.png";
import Paldea15 from "@imgs/paldea/15.png";
import Paldea16 from "@imgs/paldea/16.png";

import Terarium1 from "@imgs/terarium/1.png";
import Terarium2 from "@imgs/terarium/2.png";
import Terarium3 from "@imgs/terarium/3.png";
import Terarium4 from "@imgs/terarium/4.png";
import Terarium5 from "@imgs/terarium/5.png";
import Terarium6 from "@imgs/terarium/6.png";
import Terarium7 from "@imgs/terarium/7.png";
import Terarium8 from "@imgs/terarium/8.png";
import Terarium9 from "@imgs/terarium/9.png";
import Terarium10 from "@imgs/terarium/10.png";
import Terarium11 from "@imgs/terarium/11.png";
import Terarium12 from "@imgs/terarium/12.png";
import Terarium13 from "@imgs/terarium/13.png";
import Terarium14 from "@imgs/terarium/14.png";
import Terarium15 from "@imgs/terarium/15.png";
import Terarium16 from "@imgs/terarium/16.png";

import Kitakami1 from "@imgs/kitakami/1.png";
import Kitakami2 from "@imgs/kitakami/2.png";
import Kitakami3 from "@imgs/kitakami/3.png";
import Kitakami4 from "@imgs/kitakami/4.png";
import Kitakami5 from "@imgs/kitakami/5.png";
import Kitakami6 from "@imgs/kitakami/6.png";
import Kitakami7 from "@imgs/kitakami/7.png";
import Kitakami8 from "@imgs/kitakami/8.png";
import Kitakami9 from "@imgs/kitakami/9.png";
import Kitakami10 from "@imgs/kitakami/10.png";
import Kitakami11 from "@imgs/kitakami/11.png";
import Kitakami12 from "@imgs/kitakami/12.png";
import Kitakami13 from "@imgs/kitakami/13.png";
import Kitakami14 from "@imgs/kitakami/14.png";
import Kitakami15 from "@imgs/kitakami/15.png";
import Kitakami16 from "@imgs/kitakami/16.png";
import "./index.css";

export default (props) => {
  const { type } = props;

  if (type === "paldea") {
    return (
      <div>
        <img className="item" src={Paldea1} />
        <img className="item" src={Paldea2} />
        <img className="item" src={Paldea3} />
        <img className="item" src={Paldea4} />
        <img className="item" src={Paldea5} />
        <img className="item" src={Paldea6} />
        <img className="item" src={Paldea7} />
        <img className="item" src={Paldea8} />
        <img className="item" src={Paldea9} />
        <img className="item" src={Paldea10} />
        <img className="item" src={Paldea11} />
        <img className="item" src={Paldea12} />
        <img className="item" src={Paldea13} />
        <img className="item" src={Paldea14} />
        <img className="item" src={Paldea15} />
        <img className="item" src={Paldea16} />
      </div>
    );
  }

  if (type === "kitakami") {
    return (
      <div>
        <img className="item" src={Kitakami1} />
        <img className="item" src={Kitakami2} />
        <img className="item" src={Kitakami3} />
        <img className="item" src={Kitakami4} />
        <img className="item" src={Kitakami5} />
        <img className="item" src={Kitakami6} />
        <img className="item" src={Kitakami7} />
        <img className="item" src={Kitakami8} />
        <img className="item" src={Kitakami9} />
        <img className="item" src={Kitakami10} />
        <img className="item" src={Kitakami11} />
        <img className="item" src={Kitakami12} />
        <img className="item" src={Kitakami13} />
        <img className="item" src={Kitakami14} />
        <img className="item" src={Kitakami15} />
        <img className="item" src={Kitakami16} />
      </div>
    );
  }

  if (type === "terarium") {
    return (
      <div>
        <img className="item" src={Terarium1} />
        <img className="item" src={Terarium2} />
        <img className="item" src={Terarium3} />
        <img className="item" src={Terarium4} />
        <img className="item" src={Terarium5} />
        <img className="item" src={Terarium6} />
        <img className="item" src={Terarium7} />
        <img className="item" src={Terarium8} />
        <img className="item" src={Terarium9} />
        <img className="item" src={Terarium10} />
        <img className="item" src={Terarium11} />
        <img className="item" src={Terarium12} />
        <img className="item" src={Terarium13} />
        <img className="item" src={Terarium14} />
        <img className="item" src={Terarium15} />
        <img className="item" src={Terarium16} />
      </div>
    );
  }
};
