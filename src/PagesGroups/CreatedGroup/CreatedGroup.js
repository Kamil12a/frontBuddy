import arrow from "./photos/leftArrow.png";
import heart from "./photos/heart.png";
import { useNavigate } from "react-router-dom";
import ellipse from "./photos/ellipse.png";
import location from "./photos/location.png";
import clock from "./photos/clock.png";
import callendar from "./photos/callendar.png";
import addUser from "./photos/addUser.png";
import book from "./photos/book.png";
import settings from "./photos/settings.png";
import { useEffect, useState } from "react";
import Navigation from "../../Components/Navigation/Navigation.js";
import { useParams } from "react-router-dom";
import { addUserToGroup, fetchCollDocParams } from "../../firebase";
import {
  SmallParagraph,
  MedParagraph,
  MediumTitle,
  SimpleBlockInput,
  Button,
} from "../../Components/variables.js";
import "./createdGroup.css";
import { getAuth } from "firebase/auth";
function CreatedGroup() {
  let { id } = useParams();
  const [groups, setGroups] = useState([]);
  const [state, setState] = useState("loading");
  const auth = getAuth();
  const [areYouUser, setAreYouUser] = useState(0);

  useEffect(() => {
    fetchCollDocParams("Groups", id)
      .then((data) => {
        setGroups(data);
        setState("loaded");
        if (data.users.includes(auth.currentUser.uid)) {
          setAreYouUser(1);
        } else {
          setAreYouUser(0);
        }
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania danych:", error);
      });
  }, []);

  const navigate = useNavigate();
  const joinAsStudnet = () => {
    addUserToGroup("Groups", id, auth.currentUser.uid);
  };
  const joinAsTutor = () => {};
  return (
    <>
      {state === "loaded" && (
        <>
          <Navigation />
          <section className="created_group_section">
            <header className="section-yourProfile_Header">
              <img
                onClick={() => {
                  navigate(-1);
                }}
                className="section-yourProfile_Header_arrow"
                src={arrow}
                alt="arrow left"
              />
              <MediumTitle className="section-yourProfile_Header_title">
                Powrót
              </MediumTitle>
            </header>
            <div className="created_group_section_subjects">
              <SimpleBlockInput>{groups.fields.subjects}</SimpleBlockInput>
              <SimpleBlockInput>do {groups.fields.date}</SimpleBlockInput>
            </div>
            <label htmlFor="description"></label>
            <MedParagraph className="created_group_section_Textarea">
              {groups.fields.description}
            </MedParagraph>
            <div className="created_group_section_users">
              <SmallParagraph>uczestnicy:</SmallParagraph>
              <SmallParagraph>korepetytor:</SmallParagraph>
            </div>
            <div className="created_group_section_users_info">
              <div className="created_group_section_users_info_ellipses">
                {[1, 2, 3].map((index) => {
                  return <img key={index} src={ellipse} alt="ellipse" />;
                })}
              </div>
              <MedParagraph>poszukiwany!</MedParagraph>
            </div>
            <SmallParagraph>spotkanie 1:</SmallParagraph>
            <div className="created_group_section_mettingInfo">
              <div className="created_group_section_mettingInfo_location">
                <img src={location} alt="location" />
                {/* Tu możesz wstawić miejsce spotkania */}
                {/* <MedParagraph>{groups.place}</MedParagraph> */}
              </div>
              <div className="created_group_section_mettingInfo_data">
                <div className="created_group_section_mettingInfo_dataInfo">
                  <img src={callendar} alt="callendar" />
                  {/* Tu możesz wstawić datę spotkania */}
                  {/* <MedParagraph>{groups.meetingDate}</MedParagraph> */}
                </div>
                <div className="created_group_section_mettingInfo_dataInfo">
                  <img src={clock} alt="clock" />
                  {/* Tu możesz wstawić godzinę spotkania */}
                </div>
              </div>
            </div>
            {areYouUser === 0 && (
              <>
                <img
                  className="created_group_section_heart"
                  src={heart}
                  alt="heart"
                />
                <div className="created_group_section_buttons">
                  <Button>
                    {" "}
                    <img
                      onClick={() => {
                        setAreYouUser(1);
                      }}
                      src={addUser}
                      alt="addUser"
                    />
                    <MedParagraph
                      onClick={() => {
                        joinAsStudnet();
                      }}
                    >
                      Dołącz jako uczestnik
                    </MedParagraph>
                  </Button>
                  <Button>
                    {" "}
                    <img src={book} alt="book" />
                    <MedParagraph
                      onClick={() => {
                        joinAsTutor();
                      }}
                    >
                      Dołącz jako korepetytor
                    </MedParagraph>
                  </Button>
                </div>
              </>
            )}
            {areYouUser === 1 && (
              <>
                <SimpleBlockInput
                  onClick={() => {
                    navigate(`../chatGroup/${id}`);
                  }}
                  className="created_group_section_button_chat"
                >
                  otwórz chat
                </SimpleBlockInput>
                <img
                  onClick={() => {
                    navigate("../groupSettingsId");
                  }}
                  className="created_group_section_heart"
                  src={settings}
                  alt="settings"
                />
              </>
            )}
          </section>
        </>
      )}
    </>
  );
}

export default CreatedGroup;
