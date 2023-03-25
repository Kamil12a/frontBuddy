import { useContext } from "react";
import { ThemeContext } from "../../Context/UserContext";
import book from "./photos/bookTutor.png";
import pen from "./photos/pen.png";
import {
  MedParagraph,
  SmallParagraph,
  MediumTitle,
  Button,
} from "../../Components/variables";
import "./profilManagment.css";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../Components/Header/Headers"
import department from "../ChooseDepartment/photos/departmentMain.png";
import year from "../ChooseDepartment/photos/yearOfStudy.png";
import field from "../ChooseDepartment/photos/fieldOfStudy.png";
import settings from "./photos/settings.png";
function ProfilManagment() {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const createAccount = () => {
    const data = {
      ...theme.userDataAccount,
      email: theme.userDataAccount.email,
      login: "s",
      password: theme.userDataAccount.password,
      name: theme.userDataAccount.email,
      surname: " ",
      course: theme.userDataAccount.yourDepartment,
    };
    console.log(data)

    fetch("http://145.239.86.33/User/AddUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        theme.setUserDataAccount({
          isLoggedIn: false,
          email: "",
          login: "",
          password: "",
          name: "",
          surname: " ",
          course: "",
        });
        navigate("../");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <section className="section_tutorProfile">
       
        <div className="container_userName">
          <MediumTitle>{theme.userDataAccount.name}</MediumTitle>
        </div>
    <HeaderComponent text={"Profil"}/>
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
        <div className="section_tutorProfile_title">
          <img src={book} alt="book" />
          <MedParagraph className="tutorTitle_sectionTutorProfile">
            Korepetytor
          </MedParagraph>
        </div>
        <SmallParagraph className="section_tutorProfile_description_text">
          Opis:
        </SmallParagraph>
        <MedParagraph className="section_tutorProfile_description">
          {theme.userDataAccount.description}
        </MedParagraph>
        <SmallParagraph className="section_tutorProfile_topics">
          Zagadnienia:
        </SmallParagraph>
        <div className="section_tutorProfile_your_topic">
          <img className="pen" src={pen} alt="pen" />
          <MedParagraph>Algebra Liniowa</MedParagraph>
        </div>
        <div className="section_tutorProfile_your_topic">
          <img className="pen" src={pen} alt="pen" />
          <MedParagraph>Statystyka Opisowa</MedParagraph>
        </div>
        <div className="section_tutorProfile_your_topic">
          <img className="pen" src={pen} alt="pen" />
          <MedParagraph>Analiza Matematycza</MedParagraph>
        </div>
        <img
          onClick={() => {
            navigate("../profileSettings");
          }}
          className="settings"
          src={settings}
          alt="settings"
        />
      </section>
    </>
  );
}

export default ProfilManagment;
