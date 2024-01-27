import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import "./ReactionModal.css";
import { thunkAddReaction, thunkDeleteReaction } from "../../redux/reactions";
import { useDispatch, useSelector } from "react-redux";

function ReactionModal({ commentId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const reactions = useSelector((state) => state.reactions);
  const sessionUser = useSelector((state) => state.session.user);

  const selectReaction = (reactionId) => {
    const reaction = { reaction: String(reactionId), flagger: false };
    dispatch(thunkAddReaction(commentId, reaction));
  };

  const unselectReaction = (selectedReaction) => {
    console.log('in unselect-----------')
    Object.values(reactions).forEach((reaction) => {
      if (
        reaction.user_id === sessionUser.id &&
        reaction.reaction === String(selectedReaction)
      ) {
        console.log('found reaction--------')
        dispatch(thunkDeleteReaction(reaction.id));
        return;
      }
    });
  };

  const userReactions = [];
  Object.values(reactions).forEach((reaction) => {
    if (
      reaction.user_id === sessionUser.id &&
      !userReactions.includes(reaction.reaction)
    ) {
      userReactions.push(reaction.reaction);
    }
  });

  return (
    <div className="reaction-menu">
      {userReactions.includes("1") ? (
        <div
          className="reaction-selection selected"
          onClick={() => unselectReaction(1)}
        >
          &#128525;
        </div>
      ) : (
        <div className="reaction-selection" onClick={() => selectReaction(1)}>
          &#128525;
        </div>
      )}

      {userReactions.includes("2") ? (
        <div
          className="reaction-selection selected"
          onClick={() => unselectReaction(2)}
        >
          &#128526;
        </div>
      ) : (
        <div className="reaction-selection" onClick={() => selectReaction(2)}>
          &#128526;
        </div>
      )}

      {userReactions.includes("3") ? (
        <div
          className="reaction-selection selected"
          onClick={() => unselectReaction(3)}
        >
          &#128514;
        </div>
      ) : (
        <div className="reaction-selection" onClick={() => selectReaction(3)}>
          &#128514;
        </div>
      )}

      {userReactions.includes("4") ? (
        <div
          className="reaction-selection selected"
          onClick={() => unselectReaction(4)}
        >
          &#128531;
        </div>
      ) : (
        <div className="reaction-selection" onClick={() => selectReaction(4)}>
          &#128531;
        </div>
      )}

      {userReactions.includes("5") ? (
        <div
          className="reaction-selection selected"
          onClick={() => unselectReaction(5)}
        >
          &#128530;
        </div>
      ) : (
        <div className="reaction-selection" onClick={() => selectReaction(5)}>
          &#128530;
        </div>
      )}

      {userReactions.includes("6") ? (
        <div
          className="reaction-selection selected"
          onClick={() => unselectReaction(6)}
        >
          &#128561;
        </div>
      ) : (
        <div className="reaction-selection" onClick={() => selectReaction(6)}>
          &#128561;
        </div>
      )}

      {userReactions.includes("7") ? (
        <div
          className="reaction-selection selected"
          onClick={() => unselectReaction(7)}
        >
          &#128545;
        </div>
      ) : (
        <div className="reaction-selection" onClick={() => selectReaction(7)}>
          &#128545;
        </div>
      )}

      {userReactions.includes("8") ? (
        <div
          className="reaction-selection selected"
          onClick={() => unselectReaction(8)}
        >
          &#128557;
        </div>
      ) : (
        <div className="reaction-selection" onClick={() => selectReaction(8)}>
          &#128557;
        </div>
      )}

      {userReactions.includes("9") ? (
        <div
          className="reaction-selection selected"
          onClick={() => unselectReaction(9)}
        >
          &#129300;
        </div>
      ) : (
        <div className="reaction-selection" onClick={() => selectReaction(9)}>
          &#129300;
        </div>
      )}

      {userReactions.includes("10") ? (
        <div
          className="reaction-selection selected"
          onClick={() => unselectReaction(10)}
        >
          &#129402;
        </div>
      ) : (
        <div className="reaction-selection" onClick={() => selectReaction(10)}>
          &#129402;
        </div>
      )}

      {userReactions.includes("11") ? (
        <div
          className="reaction-selection selected"
          onClick={() => unselectReaction(11)}
        >
          &#128128;
        </div>
      ) : (
        <div className="reaction-selection" onClick={() => selectReaction(11)}>
          &#128128;
        </div>
      )}

      {userReactions.includes("12") ? (
        <div
          className="reaction-selection selected"
          onClick={() => unselectReaction(12)}
        >
          &#129318;
        </div>
      ) : (
        <div className="reaction-selection" onClick={() => selectReaction(12)}>
          &#129318;
        </div>
      )}

      {userReactions.includes("13") ? (
        <div
          className="reaction-selection selected"
          onClick={() => unselectReaction(13)}
        >
          &#128591;
        </div>
      ) : (
        <div className="reaction-selection" onClick={() => selectReaction(13)}>
          &#128591;
        </div>
      )}

      {userReactions.includes("14") ? (
        <div
          className="reaction-selection selected"
          onClick={() => unselectReaction(14)}
        >
          &#129505;
        </div>
      ) : (
        <div className="reaction-selection" onClick={() => selectReaction(14)}>
          &#129505;
        </div>
      )}

      {userReactions.includes("15") ? (
        <div
          className="reaction-selection selected"
          onClick={() => unselectReaction(15)}
        >
          &#128293;
        </div>
      ) : (
        <div className="reaction-selection" onClick={() => selectReaction(15)}>
          &#128293;
        </div>
      )}

      {userReactions.includes("16") ? (
        <div
          className="reaction-selection selected"
          onClick={() => unselectReaction(16)}
        >
          &#128164;
        </div>
      ) : (
        <div className="reaction-selection" onClick={() => selectReaction(16)}>
          &#128164;
        </div>
      )}

      {userReactions.includes("17") ? (
        <div
          className="reaction-selection selected"
          onClick={() => unselectReaction(17)}
        >
          &#128175;
        </div>
      ) : (
        <div className="reaction-selection" onClick={() => selectReaction(17)}>
          &#128175;
        </div>
      )}

      {userReactions.includes("18") ? (
        <div
          className="reaction-selection selected"
          onClick={() => unselectReaction(18)}
        >
          &#127941;
        </div>
      ) : (
        <div className="reaction-selection" onClick={() => selectReaction(18)}>
          &#127941;
        </div>
      )}
    </div>
  );
}

export default ReactionModal;
