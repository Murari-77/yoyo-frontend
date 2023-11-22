import React from 'react';

const Button = ({ onClick, text, bgColor = "[#93349e]", hoverBgColor = "[#93349e]" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-${bgColor} hover:bg-${hoverBgColor} text-white px-4 py-2 rounded`}
    >
      {text}
    </button>
  );
};

export default Button;