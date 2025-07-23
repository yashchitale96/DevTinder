import React, { useEffect } from "react";
import { BASE_URL } from "../constants";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import Usercard from "./Usercard";
import axios from "axios";
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch feed on mount
  useEffect(() => {
    if (!feed || !feed.data || feed.data.length === 0) {
      getFeed();
    }
    // eslint-disable-next-line
  }, []);

  // Fetch feed when data becomes empty after an action
  useEffect(() => {
    if (feed && feed.data && feed.data.length === 0) {
      getFeed();
    }
    // eslint-disable-next-line
  }, [feed]);

  if (!feed || !feed.data || feed.data.length === 0)
    return <h1>No new Users Found</h1>;

  return (
    <div>
      <Usercard user={feed.data[0]} />
    </div>
  );
};

export default Feed;
