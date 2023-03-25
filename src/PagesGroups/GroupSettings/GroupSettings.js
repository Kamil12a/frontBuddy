import { useNavigate } from "react-router-dom";
import book from "./photos/tutorBook.png";
import deleteImg from "./photos/delete.png";
import share from "./photos/share.png";
import callendar from "./photos/callendar.png";
import leave from "./photos/leave.png";
import HeaderComponent from "../../Components/Header/Headers";
import Navigation from "../../Components/Navigation/Navigation.js";
import { useParams } from "react-router-dom";
import {


  SimpleBlockInput,

} from "../../Components/variables.js";
import "./groupSettings.css";
function GroupSettings() {
  let { id } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <Navigation />
      <section className="group_settings_section">
      <HeaderComponent text={"Statistica"}/>
        <div className="section_yourProfile_settingsPanel">
          <SimpleBlockInput
            onClick={() => {
              navigate(`../addMettings/${id}`);
            }}
          >
            {" "}
            <img
              className="imageInsideButton"
              src={callendar}
              alt="callendar"
            />
            dodaj spotkanie
          </SimpleBlockInput>
          <SimpleBlockInput
            onClick={() => {
              navigate("../addPaymentId");
            }}
          >
            <img className="imageInsideButton" src={book} alt="pen" />
            dodaj wynagrodzenie
          </SimpleBlockInput>
          <SimpleBlockInput
            onClick={() => {
              navigate("../recommendedTutor");
            }}
          >
            <img className="imageInsideButton" src={book} alt="book" />
            dodaj korepetytora
          </SimpleBlockInput>
          <SimpleBlockInput>
            {" "}
            <img className="imageInsideButton" src={share} alt="share" />
            udostępnij grupę
          </SimpleBlockInput>
          <SimpleBlockInput
            onClick={() => {
              navigate("../deleteGroupId");
            }}
          >
            {" "}
            <img className="imageInsideButton" src={leave} alt="leave" />
            opuść grupę
          </SimpleBlockInput>
          <SimpleBlockInput className="lastOption">
            {" "}
            <img className="imageInsideButton" src={deleteImg} alt="pen" />
            zakończ grupę
          </SimpleBlockInput>
        </div>
        <SimpleBlockInput
          onClick={() => {
            navigate("../chatGroupId");
          }}
          className="created_group_section_button"
        >
          otwórz chat
        </SimpleBlockInput>
      </section>
    </>
  );
}

export default GroupSettings;
