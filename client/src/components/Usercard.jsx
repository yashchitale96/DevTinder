import React from "react";

const Usercard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
  return (
    <div className="flex justify-center py-8">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure className="px-10 pt-10">
          <img src={photoUrl} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + " " + gender}</p>}
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="card-actions">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
