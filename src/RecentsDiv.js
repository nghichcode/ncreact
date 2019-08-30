import React from 'react';

function RecentsDiv({link, title, date}) {
  return (
    <div>
      <div className="mtb-20">
        <a className="color-white" href={"#"+link}>
          <b>{title}</b>
        </a>
        <small className="dplay-block">{date}</small>
      </div>
      <div className="brdr-ash-1 opacty-2 mr-30"></div>
    </div>
  );
}

export default RecentsDiv;
