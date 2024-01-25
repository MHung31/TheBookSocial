import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ReactionModal.css";
import { thunkAddReaction } from "../../redux/reactions";

function ReactionModal({commentId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const selectReaction = (reactionId) => {
    const reaction = { reaction: String(reactionId), flagger: false };
    dispatch(thunkAddReaction(commentId, reaction));
  };
  return (
    <div className="reaction-menu">
      <div className="reaction-selection" onClick={() => selectReaction(1)}>
        {" "}
        &#128525;
      </div>
      <div className="reaction-selection" onClick={() => selectReaction(2)}>
        {" "}
        &#128526;
      </div>
      <div className="reaction-selection" onClick={() => selectReaction(3)}>
        {" "}
        &#128514;
      </div>
      <div className="reaction-selection" onClick={() => selectReaction(4)}>
        {" "}
        &#128531;
      </div>
      <div className="reaction-selection" onClick={() => selectReaction(5)}>
        {" "}
        &#128530;
      </div>
      <div className="reaction-selection" onClick={() => selectReaction(6)}>
        {" "}
        &#128561;
      </div>
      <div className="reaction-selection" onClick={() => selectReaction(7)}>
        {" "}
        &#128545;
      </div>
      <div className="reaction-selection" onClick={() => selectReaction(8)}>
        {" "}
        &#128557;
      </div>
      <div className="reaction-selection" onClick={() => selectReaction(9)}>
        {" "}
        &#129300;
      </div>
      <div className="reaction-selection" onClick={() => selectReaction(10)}>
        &#129402;
      </div>
      <div className="reaction-selection" onClick={() => selectReaction(11)}>
        &#128128;
      </div>
      <div className="reaction-selection" onClick={() => selectReaction(12)}>
        &#129318;
      </div>
      <div className="reaction-selection" onClick={() => selectReaction(13)}>
        &#128591;
      </div>
      <div className="reaction-selection" onClick={() => selectReaction(14)}>
        &#129505;
      </div>
      <div className="reaction-selection" onClick={() => selectReaction(15)}>
        &#128293;
      </div>
      <div className="reaction-selection" onClick={() => selectReaction(16)}>
        &#128164;
      </div>
      <div className="reaction-selection" onClick={() => selectReaction(17)}>
        &#128175;
      </div>
      <div className="reaction-selection" onClick={() => selectReaction(18)}>
        &#127941;
      </div>
    </div>
  );
}

export default ReactionModal;
