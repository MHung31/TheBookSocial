import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./ProfilePage.css";
import { thunkGetProfile, thunkResetProfile } from "../../redux/profile";

function ProfilePage() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { followers, following, reactions, user } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    dispatch(thunkGetProfile(userId));

    return () => dispatch(thunkResetProfile());
  }, [dispatch, userId]);
  return <div>Profile Page</div>;
}

export default ProfilePage;
