import { useContext } from "react";
import { ThemeContext } from "../../Context/UserContext";
import pen from "./photos/pen.png";
import {
  Button,
  InputForm,
  SimpleBlockInput,
} from "../../Components/variables";
import "./subject.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HeaderComponent from "../../Components/Header/Headers";
function WhatSubjectDoYouKnow() {
  const subejcts = [
    "Algebra Liniowa",
    "Wstęp do programowania",
    "Statystyka Opisowa",
    "Analiza Matematyczna",
  ];
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const [yourSubject, setYourSubject] = useState([]);
  let choosenSubjects = [];
  const chooseYourSubjects = (e) => {
    if (choosenSubjects.includes(e.target.name)) {
      choosenSubjects = choosenSubjects.filter(function (value) {
        if (!choosenSubjects.includes(e.target.name)) {
          return value;
        }
      });
    } else {
      choosenSubjects.push(e.target.name);
    }
    setYourSubject(choosenSubjects);
  };
  const confirm_courses=()=>{
    theme.setUserDataAccount({
      ...theme.userDataAccount,
      course:yourSubject
    });
    navigate("../writeAboutYou");
  }
  return (
    <>
      <section className=" section-yourProfile">
        <HeaderComponent text={" Z jakim przedmiotami możesz komuś pomóc?"} />

        <InputForm
          placeholder="szukaj"
          src="https://example.com/my-image.png"
          alt="Submit"
          type={"text"}
          name="name"
          className="LogInContainer_Form_input_search"
        />
        {subejcts.map((subject, index) => {
          if (yourSubject.includes(subject)) {
            return (
              <SimpleBlockInput
                key={index + subject}
                onClick={chooseYourSubjects}
                name={subject}
                className="subject_blockInput"
                style={{ border: "2px solid" }}
              >
                {" "}
                <img className="pen" src={pen} alt="pen" />
                {subject}
              </SimpleBlockInput>
            );
          } else {
            return (
              <SimpleBlockInput
                key={index + subject}
                onClick={chooseYourSubjects}
                name={subject}
                className="subject_blockInput"
              >
                {" "}
                <img className="pen" src={pen} alt="pen" />
                {subject}
              </SimpleBlockInput>
            );
          }
        })}
        <Button className="buttons_chooseSubject">
          Przedmioty spoza kierunku
        </Button>
        <Button
          className="buttons_chooseSubject_confirm"
          onClick={() => {
            confirm_courses()
          }}
        >
          Zatwierdź
        </Button>
      </section>
    </>
  );
}

export default WhatSubjectDoYouKnow;
