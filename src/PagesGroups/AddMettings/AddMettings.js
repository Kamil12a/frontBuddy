import arrow from "../Photos/leftArrow.png";
import location from "./photos/location.png";
import callendar from "./photos/callendar.png";
import clock from "./photos/clock.png";
import pen from "./photos/pen.png";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import Navigation from "../../Components/Navigation/Navigation.js";
import "react-calendar/dist/Calendar.css";
import { Formik } from "formik";
import { useParams } from "react-router-dom";
import { addMetting } from "./postMettings";
import {
  SmallParagraph,
  MediumTitle,
  Button,
  LabelForm,
  InputForm,
} from "../../Components/variables.js";
import "./AddMettings.css";
import { useEffect, useState } from "react";
import HeaderComponent from "../../Components/Header/Headers";
function AddMettings() {
  const navigate = useNavigate();
  const [hour, setHour] = useState("");
  let { id } = useParams();
  const [group, setGroup] = useState({});
  useEffect(() => {
    let datas;
    fetch(`http://145.239.86.33/Group/GetGroup?groupId=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setGroup(data);
      });
  }, []);
  return (
    <>
      <Navigation />

      <Formik
        initialValues={{
          place: "",
          meetingDate: new Date().toISOString().split("T")[0],
          hour: "",
        }}
        onSubmit={(values) => addMetting({ values, group, hour })}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form className="LogInContainer_Form_inputs" onSubmit={handleSubmit}>
            <section className="add_mettings_section">
              <HeaderComponent text={"Dodaj spotkanie"}/>
              <InputForm
                type="date"
                id="start"
                name="meetingDate"
                value={values.meetingDate}
                onChange={handleChange}
              />
              <div className="clock_calendar">
                <SmallParagraph>start:</SmallParagraph>
                <input
                  className="time_input"
                  type="time"
                  id="appt"
                  name="appt"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setHour(e.target.value);
                  }}
                  min="09:00"
                  max="18:00"
                  // required
                />
              </div>
              <div className="inputForm_place">
                <LabelForm>Dodaj miejsce</LabelForm>
                <InputForm
                  alt="Submit"
                  // required
                  type={"text"}
                  onChange={handleChange}
                  name="place"
                  value={values.place}
                  className="inputForm_place_input"
                />
              </div>

              <Button type="submit" className="add_mettings_section_btn">
                {" "}
                Zatwierdź
              </Button>
            </section>
          </form>
        )}
      </Formik>
    </>
  );
}

export default AddMettings;

{
  /* <SmallParagraph>Spotkanie 1:</SmallParagraph>
              <div className="add_mettings_section_options">
                <div className="add_mettings_section_options_location">
                  <img src={location} alt="location" />
                  <SmallParagraph>Miejsce</SmallParagraph>
                </div>
                <div className="add_mettings_section_options_datas_info">
                  <div
                    onClick={() => {
                      setState("data");
                    }}
                    className="add_mettings_section_options_datas"
                  >
                    <img src={callendar} alt="callendar" />
                    <SmallParagraph>Data</SmallParagraph>
                  </div>
                  <div
                    onClick={() => {
                      setState("clock");
                    }}
                    className="add_mettings_section_options_datas"
                  >
                    <img src={clock} alt="clock" />
                    <SmallParagraph>Godzina</SmallParagraph>
                  </div>
                </div>
                <div className="add_mettings_section_options_note">
                  <img src={pen} alt="pen" />
                  <SmallParagraph>Dodaj notatkę</SmallParagraph>
                </div>
              </div> */
}
