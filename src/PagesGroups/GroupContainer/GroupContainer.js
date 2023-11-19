import React from "react";
import "./groupContainer.css";
import { SmallParagraph, MedParagraph } from "../../Components/variables.js";
import { useNavigate } from "react-router-dom";
import heart from "./Photos/heart.png";
import { getAuth } from "firebase/auth";
function GroupContainer({ title, subject, date, id, imgProfile, admin }) {
  const navigate = useNavigate();
 
    const auth = getAuth();


  const groupDetails = () => {
    navigate(`/detailsGroup/${id}`);
  };

  const navigateToTutorProfile = (event) => {
    // Check if the clicked element has the 'ellipse' class
    if (event.target.classList.contains("ellipse")) {
      // If it does, navigate to the tutor's profile
      if(admin===auth.currentUser.uid){
        navigate(`/myProfile/${admin}`);

      }
      else{
        navigate(`/readyTutorProfile/${admin}`);
      }
    } else {
     
      groupDetails();
    }
  };

  return (
    <div
      onClick={(event) => {
        navigateToTutorProfile(event);
      }}
      className="groupContainer"
    >
      <SmallParagraph className="groupContainer_title">{title}</SmallParagraph>
      <MedParagraph className="groupContainer_subject">{subject}</MedParagraph>
      <div className="groupContainer_ellipses">
        <img
          id={admin}
          className="ellipse"
          src={imgProfile}
          alt="ellipse"
        />
      </div>
      <div className="footer_containerGroup">
        <SmallParagraph className="footer_containerGroup_text">
          {date}
        </SmallParagraph>
        <img className="heart" src={heart} alt="heart" />
      </div>
    </div>
  );
}

export default GroupContainer;
