import React from "react";

function Note(props) {
  return (
    <div className="note">
      <a href = "#"><h1>{props.name}</h1></a>
      <p>{props.about}</p>
    </div>
  );
}

export default Note;
