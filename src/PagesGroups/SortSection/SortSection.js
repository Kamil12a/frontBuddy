import { useNavigate } from "react-router-dom";
import {
  SimpleBlockInput,
  Button,
} from "../../Components/variables";
import "./sortSection.css";
import { useState } from "react";
import HeaderComponent from "../../Components/Header/Headers";
function SortSection({ setState }) {
  let choosenSubjects = [];
  const [yourSubject, setYourSubject] = useState([]);
  const subejcts = [
    "Data utworzenia: od najnowszych",
    "Data utworzenia: od najstarszych",
    "Popularność: od najwyższej",
    "Popularność: od najniższej",
    "Deadline: od najszybszych",
    "Deadline: od najpóźniejszych",
  ];
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

  const navigate = useNavigate();
  return (
    <>
      <section className=" section-yourProfile">
      <HeaderComponent text={"Sortuj według"}/>
        {subejcts.map((subject, index) => {
          if (yourSubject.includes(subject)) {
            return (
              <>
                <SimpleBlockInput
                  key={index + subject}
                  onClick={chooseYourSubjects}
                  name={subject}
                  className="subject_blockInput"
                  style={{ border: "2px solid" }}
                >
                  {" "}
              
                  {subject}
                </SimpleBlockInput>
              </>
            );
          } else {
            return (
              <>
                <SimpleBlockInput
                  key={index + subject}
                  onClick={chooseYourSubjects}
                  name={subject}
                  className="subject_blockInput"
                >
                  {" "}
                {subject}
                </SimpleBlockInput>
              </>
            );
          }
        })}
        <Button
          className="chooseSubject_btn"
          onClick={() => {
            setState(0);
          }}
        >
          Zatwierdź
        </Button>
      </section>
    </>
  );
}

export default SortSection;
