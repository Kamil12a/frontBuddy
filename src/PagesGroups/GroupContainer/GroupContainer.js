import "./groupContainer.css";
import {
  SelectInput,
  InputForm,
  SmallParagraph,
  MedParagraph,
} from "../../Components/variables.js";
import ellipse from "./Photos/Ellipse.png";
import { useNavigate } from "react-router-dom";
import heart from "./Photos/heart.png";
function GroupContainer({ title, subject, date,id }) {
  const navigate = useNavigate();
  const groupDetails = () => {
    navigate(`/detailsGroup/${id}`);
  };
  return (
    <>
      <div
        onClick={() => {
          groupDetails()
        }}
        className="groupContainer"
      >
        <SmallParagraph className="groupContainer_title">
          {title}
        </SmallParagraph>
        <MedParagraph className="groupContainer_subject">
          {subject}
        </MedParagraph>
        <div className="groupContainer_ellipses">
          <img className="ellipse " src={ellipse} alt="ellipse" />
          <img className="ellipse " src={ellipse} alt="ellipse" />
          <img className="ellipse " src={ellipse} alt="ellipse" />
        </div>
        <div className="footer_containerGroup">
          <SmallParagraph className="footer_containerGroup_text">
            {date}
          </SmallParagraph>
          <img className="heart" src={heart} alt="heart" />
        </div>
      </div>
    </>
  );
}

export default GroupContainer;
