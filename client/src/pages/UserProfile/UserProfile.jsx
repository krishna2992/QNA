import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Avatar from "../../components/Avatar/Avatar";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import "./UserProfile.css";

const UserProfile = ({ slideIn, handleSlideIn }) => {
  const { id } = useParams();
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === id)[0];
  const currentUser = useSelector((state) => state.currentUserReducer);
  console.log(currentUser)
  const [Switch, setSwitch] = useState(false);
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <Avatar
                backgroundColor="purple"
                color="white"
                fontSize="50px"
                px="40px"
                py="30px"
              >
                {currentProfile?.name.charAt(0).toUpperCase()}
              </Avatar>
              <div className="user-name">
                <h1>{currentProfile?.name}</h1>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                  {moment(currentProfile?.joinedOn).fromNow()}
                </p>
              </div>
            </div>
            {currentUser?.result._id === id && (
              <button
                type="button"
                onClick={() => setSwitch(true)}
                className="edit-profile-btn"
              >
                <FontAwesomeIcon icon={faPen} /> Edit Profile
              </button>
            )}
          </div>
          <>
            {Switch ? (
              <EditProfileForm
                currentUser={currentUser}
                setSwitch={setSwitch}
              />
            ) : (
              <ProfileBio currentProfile={currentProfile} />
            )}
          </>
        </section>
        <section className="user-plan-container">
          <div className="user-plan-div">
            <h3>Your Plans</h3>
            <>
              {
                
                currentProfile?.plan.length ? (
                
                <div className="plan-box">
                  <div className="plan-header">{currentProfile?.plan[0]?.planName}</div>
                  <div className="plan-fields">
                  <h4>Amount:     </h4>
                  <p>Rs. {currentProfile?.plan[0]?.amount}</p>
                  </div>
                  <div className="plan-fields">
                  <h4>QuestionLimit: </h4>
                  <p>{currentProfile?.plan[0]?.noOfQuestions}(per Day)</p>

                  </div>
                  <div className="plan-fields">
                  <h4>Started On: </h4>
                  <p>{currentProfile?.plan[0]?.startedOn.split('T')[0]}</p>
                  </div>
                  <div className="plan-fields">
                  <h4>Validity:</h4>
                  <p>{currentProfile?.plan[0]?.validTill.split('T')[0]}</p>
                  </div>
                </div>
                ):<>
                <p>No plan is active.</p>
                <p>Visit <a href="/Plans" className="sub-link">Plans</a> to suscribe.</p>
                </>
              }
            </>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
