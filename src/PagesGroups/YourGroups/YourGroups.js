import { useNavigate } from "react-router-dom";
import "./YourGroups.css";
import { getAuth } from "firebase/auth";
import { SimpleBlockInput, MediumTitle } from "../../Components/variables.js";
import GroupContainer from "../GroupContainer/GroupContainer";
import { useState } from "react";
import { useEffect } from "react";
import { fetchGroups, getFileDownloadURL } from "../../firebase";
import arrow from "../Photos/leftArrow.png";

function YourGroups() {
  const [groups, setGroups] = useState([]);
  const [imageProfile, setImageProfile] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const [state, setState] = useState("loading");
  const [admin, setAdmin] = useState(null);

  const uploadAllUsersPhotos = (groupsData) => {
    groupsData.forEach((group, index) => {
      if (group.fields.tutor !== null) {
        getFileDownloadURL(`/profileImage/${group.fields.tutor}`).then((data) => {
          setImageProfile(data);
          setAdmin(group.fields.tutor);
          setState("loaded");
        }).catch((error) => {
          console.error("Error fetching profile image:", error);
          setState("error");
        });
      } else {   
        getFileDownloadURL(`/profileImage/${group.fields.admin}`).then((data) => {
          setImageProfile(data);
          setAdmin(group.fields.admin);
          setState("loaded");
        }).catch((error) => {
          console.error("Error fetching profile image:", error);
          setState("error");
        });
      }
    });
  };

  useEffect(() => {
    fetchGroups()
      .then((groupsWithIds) => {
        setGroups(groupsWithIds);
        uploadAllUsersPhotos(groupsWithIds);
      })
      .catch((error) => {
        console.error("Błąd:", error);
      });
  }, []);

  return (
    <>
      {state === "loaded" && (
        <section className="section-groups">
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
              Twoje Grupy
            </MediumTitle>
          </header>
          <div className="groupsContainer-block">
            {groups.map((group, index) => {
              if (
                group.fields.users.includes(auth.currentUser.uid) ||
                group.fields.admin == auth.currentUser.uid ||
                group.fields.tutor == auth.currentUser.uid
              ) {
                return (
                  <GroupContainer
                    key={index}
                    admin={admin}
                    id={group.id}
                    imgProfile={imageProfile}
                    date={group.fields.date}
                    title={group.fields.title}
                    subject={group.fields.subjects}
                  />
                );
              }
              return null;
            })}
          </div>

          <SimpleBlockInput
            onClick={() => {
              navigate("../createGroup_ChooseSubject");
            }}
            className="section-groups_button"
          >
            Utwórz nową grupę
          </SimpleBlockInput>
        </section>
      )}
    </>
  );
}

export default YourGroups;
