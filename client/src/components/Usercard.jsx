import axios from "axios";
import React from "react";
import { BASE_URL } from "../constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const Usercard = ({ user }) => {
  const {_id ,firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async(status, userId) => {
    try{
      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId,{},{withCredentials:true})
      dispatch(removeUserFromFeed(userId))
    }
    catch(err)
    {
      console.log(err);
    }
  }
  return (
    <div className="flex justify-center py-8">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure className="px-10 pt-10">
          <img src={photoUrl} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + " " + gender}</p>}
          {about && <p>{about}</p>}
          <div className="card-actions">
            <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
            <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
