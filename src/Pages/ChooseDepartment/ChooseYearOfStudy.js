import HeaderComponent from "../../Components/Header/Headers.js";
import {
  Button,
  MediumTitle,
  SimpleBlockInput,
} from "../../Components/variables.js";
import arrow from "./photos/leftArrow.png";

function ChooseYearOfStudy({
  yearOfStudy,
  setYourYearOfStudy,
  setState,
  year,
  setYear,
}) {
  const yearOfStudyBlock = [
    "Licencjackie",
    "Magisterskie",
    "Jednolite Magisterskie",
    "Doktoranckie",
    "Podyplomowe",
  ];
  const yearOfStudyNumber = ["I rok", "II rok", "III rok", "IV rok", "V rok"];
  const chooseYearOfStudy = (e) => {
    setYourYearOfStudy(e.target.name);
  };
  const chooseYear = (e) => {
    setYear(e.target.name);
  };
  const backNavigate = () => {
    setState(0);
  };
  return (
    <>
      <section className="chooseYourYearOfStudy">
        <HeaderComponent text={"Wybierz rok studiów"} />
        <div className="chooseYourYearOfStudy_AllYears">
          {yearOfStudyBlock.map((yearOfMyStudy, index) => {
            if (yearOfMyStudy === yearOfStudy) {
              return (
                <SimpleBlockInput
                  style={{ border: "2px solid black" }}
                  onClick={chooseYearOfStudy}
                  key={index + yearOfMyStudy}
                  name={yearOfMyStudy}
                  className="YearOfStudyBlock"
                >
                  {yearOfMyStudy}
                </SimpleBlockInput>
              );
            } else {
              return (
                <SimpleBlockInput
                  onClick={chooseYearOfStudy}
                  key={index + yearOfMyStudy}
                  name={yearOfMyStudy}
                  className="YearOfStudyBlock"
                >
                  {yearOfMyStudy}
                </SimpleBlockInput>
              );
            }
          })}
        </div>

        <div className="chooseYourYearOfStudy_AllYearsInNumber">
          {yearOfStudyNumber.map((yearNumber, index) => {
            if (year === yearNumber) {
              return (
                <SimpleBlockInput
                  key={index + yearNumber}
                  className="fieldStudyBlock"
                  style={{ border: "2px solid black" }}
                  name={yearNumber}
                  onClick={chooseYear}
                >
                  {yearNumber}
                </SimpleBlockInput>
              );
            } else {
              return (
                <SimpleBlockInput
                  key={index + yearNumber}
                  name={yearNumber}
                  onClick={chooseYear}
                  className="blockYear"
                >
                  {yearNumber}
                </SimpleBlockInput>
              );
            }
          })}
        </div>
        <Button onClick={backNavigate} className="chooseYearOfStudyButton">
          Zatwierdź
        </Button>
      </section>
    </>
  );
}

export default ChooseYearOfStudy;
