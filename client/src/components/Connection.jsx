import React, { useEffect } from "react";
import { BASE_URL } from "../constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connection = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async (req, res) => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <h1>No Connections Found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl ">Connections</h1>

      {connections.map((connection) => {
        const {firstName, lastName, photoUrl, age, gender, about} = connection;
        return (
          <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
            <div>
                <img alt="photo" src={photoUrl} className="w-20 h-20 rounded-full" />
            </div>

            <div className="text-left mx-4">
                <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + " " + gender}</p>}
                <p>{about}</p>
            </div>
            
            
          </div>
        );
      })}
    </div>
  );
};

export default Connection;
