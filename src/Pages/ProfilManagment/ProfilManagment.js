import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../Context/UserContext";
import {
  MedParagraph,
  SmallParagraph,
  MediumTitle,
  Button,
} from "../../Components/variables";
import "./profilManagment.css";
import { useNavigate } from "react-router-dom";
import arrow from "../ChooseDepartment/photos/leftArrow.png";
import department from "../ChooseDepartment/photos/departmentMain.png";
import year from "../ChooseDepartment/photos/yearOfStudy.png";
import field from "../ChooseDepartment/photos/fieldOfStudy.png";
import settings from "./photos/settings.png";
import { createUser } from "../../firebase";

function ProfilManagment() {
  const theme = useContext(ThemeContext);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const createAccount = () => {
    const userDatas = { ...theme.userDataAccount };
    delete userDatas.email;
    delete userDatas.password;
    const img = userDatas.img;
    delete userDatas.img;

    createUser(
      theme.userDataAccount.email,
      theme.userDataAccount.password,
      userDatas,
      img
    ).then(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    if (theme.userDataAccount.img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(theme.userDataAccount.img);
    }
  }, [theme.userDataAccount.img]);

  return (
    <>
      <section className="section_tutorProfile">
        <header className="section-yourProfile_Header">
          <img
            onClick={() => {
              navigate(-1);
            }}
            className="section-yourProfile_Header_arrow "
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
        {imagePreview !== null && (
          <div className="section_tutorProfile_image_box">
            <img
              className="section_tutorProfile_image"
              src={imagePreview}
              alt="Podgląd obrazu"
              style={{ maxWidth: "100%", marginTop: "10px" }}
            />
          </div>
        )}
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
        </div>

        <Button
          onClick={() => {
            createAccount();
          }}
          type="submit"
          className="Container_Form_department_confirm"
        >
          Zatwierdź
        </Button>
        {/* Pozostała część kodu... */}
      </section>
    </>
  );
}

export default ProfilManagment;
