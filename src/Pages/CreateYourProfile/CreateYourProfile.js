import React, { useContext, useState } from "react";
import { ThemeContext } from "../../Context/UserContext";
import arrow from "../ChooseDepartment/photos/leftArrow.png";
import { MediumTitle, MedParagraph, Button } from "../../Components/variables";
import "./yourProfile.css";
import { useNavigate } from "react-router-dom";
import department from "../ChooseDepartment/photos/departmentMain.png";
import year from "../ChooseDepartment/photos/yearOfStudy.png";
import field from "../ChooseDepartment/photos/fieldOfStudy.png";

function CreateYourProfile({ url }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();
  const theme = useContext(ThemeContext);

  const navigateBack = () => {
    navigate(-1);

  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const navigateTutor=()=>{
    theme.setUserDataAccount({
      ...theme.userDataAccount,
      img: selectedFile
    });
    navigate(url)
  }
 

  return (
    <>
      <section className="section-yourProfile">
        <header className="section-yourProfile_Header">
          <img
            onClick={navigateBack}
            className="section-yourProfile_Header_arrow"
            src={arrow}
            alt="arrow left"
          />
          <MediumTitle className="section-yourProfile_Header_title">
            Profil
          </MediumTitle>
        </header>
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
            <MedParagraph>{theme.userDataAccount.yourDepartment}</MedParagraph>
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
            <MedParagraph>{theme.userDataAccount.yearOfStudy}</MedParagraph>
          </div>

          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <Button
          onClick={navigateTutor}
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
