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
import { fetchCreatedGroups } from "./fetchCreatedGroup";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../Context/UserContext";
import HeaderComponent from "../../Components/Header/Headers";
import {
  SmallParagraph,
  MedParagraph,

  SimpleBlockInput,
  Button,
} from "../../Components/variables.js";
import "./createdGroup.css";
import { addUserToGroup } from "./addUserToGroup";
function CreatedGroup() {
  const theme = useContext(ThemeContext);
  let { id } = useParams();
  const { data: groups } = useQuery("createdGroup", () =>
    fetchCreatedGroups(id)
  );

  const navigate = useNavigate();
  const [areYouUser, setAreYouUser] = useState(0);
  useEffect(() => {
    setAreYouUser(0);
    if (groups !== undefined) {
      groups.joinedUsers.map((item) => {
        if (theme.userDataAccount.id === item.id) {
          setAreYouUser(1);
        }
      });
    }
  }, [groups]);
  return (
    <>
      <Navigation />
      {groups && (
        <section className="created_group_section">
           <HeaderComponent text={ groups.shortDescription}/>
          
          <div className="created_group_section_subjects">
            <SimpleBlockInput>do {groups.expireDate}</SimpleBlockInput>
          </div>
          <label htmlFor="description"></label>
          <MedParagraph className="created_group_section_Textarea">
            {groups.description}
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
              <MedParagraph>{groups.place} </MedParagraph>
            </div>
            <div className="created_group_section_mettingInfo_data">
              <div className="created_group_section_mettingInfo_dataInfo">
                <img src={callendar} alt="callendar" />
                <MedParagraph>{groups.meetingDate.substring(0, 10)}</MedParagraph>
              </div>
              <div className="created_group_section_mettingInfo_dataInfo">
                <img src={clock} alt="clock" />
                <MedParagraph>{groups.meetingDate.substring(11, 16)}</MedParagraph>

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
                      addUserToGroup(theme.userDataAccount.id,groups.id)
                    }}
                    src={addUser}
                    alt="addUser"
                  />
                  <MedParagraph>Dołącz jako uczestnik</MedParagraph>
                </Button>
                <Button>
                  {" "}
                  <img src={book} alt="book" />
                  <MedParagraph> Dołącz jako korepetytor</MedParagraph>
                </Button>
              </div>
            </>
          )}
          {areYouUser === 1 && (
            <>
              <SimpleBlockInput
                onClick={() => {
                  navigate("../chatGroupId");
                }}
                className="created_group_section_button_chat"
              >
                otwórz chat
              </SimpleBlockInput>
              <img
                onClick={() => {
                  navigate(`../groupSettings/${id}`);
                }}
                className="created_group_section_heart"
                src={settings}
                alt="settings"
              />
            </>
          )}
        </section>
      )}
    </>
  );
}

export default CreatedGroup;
