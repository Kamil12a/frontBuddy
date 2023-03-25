import "./groupContainer.css";
import {
  SmallParagraph,
  MedParagraph,
} from "../../Components/variables.js";
import ellipse from "./Photos/Ellipse.png";
import heart from "./Photos/heart.png";
function GroupContainer({shortDescription}) {
  return (
    <>
      <div className="groupContainer">
        <SmallParagraph className="groupContainer_title">Analiz Danych</SmallParagraph>
        <MedParagraph className="groupContainer_subject">{shortDescription}</MedParagraph>
        <div className="groupContainer_ellipses">
          <img className="ellipse " src={ellipse} alt="ellipse" />
          <img className="ellipse " src={ellipse} alt="ellipse" />
          <img className="ellipse " src={ellipse} alt="ellipse" />
        </div>
        <div className="footer_containerGroup">
          <SmallParagraph className="footer_containerGroup_text">do 1.12.2022</SmallParagraph>
          <img className="heart" src={heart} alt="heart" />
        </div>
      </div>
    </>
  );
}

export default GroupContainer;
