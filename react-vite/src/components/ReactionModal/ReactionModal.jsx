import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ReactionModal.css";

function ReactionModal(commentId) {
  const selectReaction = () => {};
  return (
    <div className="reaction-menu">
      <div className="reaction-selection" onClick={selectReaction}>
        {" "}
        &#128525;
      </div>
      <div className="reaction-selection" onClick={selectReaction}>
        {" "}
        &#128526;
      </div>
      <div className="reaction-selection" onClick={selectReaction}>
        {" "}
        &#128514;
      </div>
      <div className="reaction-selection" onClick={selectReaction}>
        {" "}
        &#128531;
      </div>
      <div className="reaction-selection" onClick={selectReaction}>
        {" "}
        &#128530;
      </div>
      <div className="reaction-selection" onClick={selectReaction}>
        {" "}
        &#128561;
      </div>
      <div className="reaction-selection" onClick={selectReaction}>
        {" "}
        &#128545;
      </div>
      <div className="reaction-selection" onClick={selectReaction}>
        {" "}
        &#128557;
      </div>
      <div className="reaction-selection" onClick={selectReaction}>
        {" "}
        &#129300;
      </div>
      <div className="reaction-selection" onClick={selectReaction}>
        &#129402;
      </div>
      <div className="reaction-selection" onClick={selectReaction}>
        &#128128;
      </div>
      <div className="reaction-selection" onClick={selectReaction}>
        &#129318;
      </div>
      <div className="reaction-selection" onClick={selectReaction}>
        &#128591;
      </div>
      <div className="reaction-selection" onClick={selectReaction}>
        &#129505;
      </div>
      <div className="reaction-selection" onClick={selectReaction}>
        &#128293;
      </div>
      <div className="reaction-selection" onClick={selectReaction}>
        &#128164;
      </div>
      <div className="reaction-selection" onClick={selectReaction}>
        &#128175;
      </div>
      <div className="reaction-selection" onClick={selectReaction}>
        &#127941;
      </div>
    </div>
  );
}

export default ReactionModal;
