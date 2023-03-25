import ellipse from "./photos/ellipse.png";
import {
  MedParagraph,
  SmallParagraph,
} from "../../Components/variables";
import { useNavigate } from "react-router-dom";
import "./recommendedTutor.css";
import star from "./photos/star.png";
import smArrow from "./photos/smArrow.png";

import Navigation from "../../Components/Navigation/Navigation.js";
import HeaderComponent from "../../Components/Header/Headers";
function RecoomendedTutor() {
  const navigate = useNavigate();
  return (
    <>
      <Navigation />
      <section className="section-recommendedTutor">
        <div className="section-yourProfile">
         <HeaderComponent text={"Polecani Korepetytorzy"}/>
        </div>
        <div className="section-recommendedTutor_tutorSingle">
          <div className="section-recommendedTutor_tutorSingle_container">
            <img
              className="section-recommendedTutor_tutorSingle_ellipse "
              src={ellipse}
              alt="arrow left"
            />
            <div className="section-recommendedTutor_tutorSingle_information">
              <MedParagraph>Michał</MedParagraph>
              <SmallParagraph className="section-recommendedTutor_tutorSingle_information_subject">
                Analiza danych
              </SmallParagraph>
              <div>
                {[1, 2, 3, 4, 5].map((index) => {
                  return (
                    <img
                      key={index}
                      className="section-recommendedTutor_tutorSingle_star "
                      src={star}
                      alt="star"
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <img
          onClick={()=>{
            navigate("../readyTutorProfile")
          }}
            className="section-recommendedTutor_tutorSingle_arrow "
            src={smArrow}
            alt="star"
          />
        </div>
      </section>
    </>
  );
}

export default RecoomendedTutor;
