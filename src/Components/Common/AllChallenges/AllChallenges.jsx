import React from "react";
import ChallengeStructure from "../Challenge/ChallengeStructure";
import "./AllChallenges.css";
import useChallenges from "../../../Helpers/fetchChallenges";
import PuffLoader from "react-spinners/PuffLoader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const AllChallenges = () => {
  const { challenges, loading, error } = useChallenges();

  // Display challenges in reverse order
  const reversedChallenges = challenges.slice().reverse();

  if (loading) {
    return (
      <div className="loader-container">
        <PuffLoader color="#5055b8" size={60} />
        <p>Loading challenges...</p>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        heading={"Network Error"}
        description={"Check your internet connection and try again"}
      />
    );
  }

  return (
    <div className="AllChallenges">
      <div className="AllChallenges-content">
        <h1 className="allChallenge-title">Explore Frontend Challenges</h1>
        <p className="allChallenge-description">
          Find categorized frontend challenges and projects to sharpen your
          skills and advance your frontend development expertise.
        </p>

        <div className="AllChallenges-container">
          {reversedChallenges.map((challenge) => (
            <ChallengeStructure
              key={challenge.id}
              id={challenge.id}
              imgDesktop={challenge.template_img}
              imgTablet={challenge.tablet_img}
              imgMobile={challenge.mobile_img}
              title={challenge.title}
              description={challenge.description}
              category={challenge.category}
              difficulty={challenge.difficulty}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllChallenges;
