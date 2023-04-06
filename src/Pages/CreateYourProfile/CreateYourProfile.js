import { useContext } from "react";
import { ThemeContext } from "../../Context/UserContext";
import { MediumTitle, MedParagraph, Button } from "../../Components/variables";
import "./yourProfile.css";
import { useNavigate } from "react-router-dom";
import department from "../ChooseDepartment/photos/departmentMain.png";
import year from "../ChooseDepartment/photos/yearOfStudy.png";
import field from "../ChooseDepartment/photos/fieldOfStudy.png";
import HeaderComponent from "../../Components/Header/Headers.js";
function CreateYourProfile({ url }) {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  return (
    <>
      <section className=" section-yourProfile">
        <HeaderComponent text={"Profil"}/>
      
        <div className="container_userName">
          <MediumTitle>{theme.userDataAccount.name}</MediumTitle>
        </div>

        <div className="yourInformationAboutStudyInProfile">
        <div className="block_aboutyourStudy">
          <img
            className="aboutYourStudyImage"
            src={department}
            alt="department"
          />
          <MedParagraph>{theme.userDataAccount.department}</MedParagraph>
        </div>
          <div className="block_aboutyourStudy">
            <img
              className="aboutYourStudyImage boutYourStudyImage2"
              src={field}
              alt="department"
            />
            <MedParagraph>{theme.userDataAccount.field}</MedParagraph>
          </div>
          <div className="block_aboutyourStudy">
            <img
              className="aboutYourStudyImage boutYourStudyImage2"
              src={year}
              alt="department"
            />
            <MedParagraph>{theme.userDataAccount.startYear}</MedParagraph>
          </div>
        </div>

        <Button
          onClick={() => {
            navigate(url);
          }}
          type="submit"
          className="Container_Form_department_confirm"
        >
          Zatwierdź
        </Button>
      </section>
    </>
  );
}

export default CreateYourProfile;
