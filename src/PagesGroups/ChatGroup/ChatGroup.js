import React, { useEffect, useState } from "react";
import arrow from "../Photos/leftArrow.png";
import addImage from "./photos/addImage.png";
import addPdf from "./photos/addPdf.png";
import microphone from "./photos/microphone.png";
import { useNavigate } from "react-router-dom";
import { addMessageToGroup, getFileDownloadURL } from "../../firebase";
import { MedParagraph, MediumTitle } from "../../Components/variables.js";
import "./chatGroup.css";
import { getAuth } from "firebase/auth";
import { useParams } from "react-router-dom";
import {
  fetchCollDocParams,
  startListeningToGroupChanges,
} from "../../firebase";

function ChatGroup() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [state, setState] = useState("loading");
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [allProfileImages, setAllProfileImages] = useState({});
  const id = useParams().id;

  useEffect(() => {
    let allUsers;
    fetchCollDocParams("Users", auth.currentUser.uid).then((data) => {
      setCurrentUser(data);
    });

    fetchCollDocParams("Groups", id).then((data) => {
      if (data.fields.tutor !== null) {
        allUsers = [data.fields.admin, ...data.users];
      } else {
        allUsers = [data.fields.admin, ...data.users];
      }
      let imageProfileUsers = {};
      const promises = allUsers.map((user) => {
        return getFileDownloadURL(`/profileImage/${user}`).then((data) => {
          imageProfileUsers[user] = data;
        });
      });

      Promise.all(promises).then(() => {
        setAllProfileImages(imageProfileUsers);
        setState("loaded");
      });
    });

    const unsubscribe = startListeningToGroupChanges("Groups", id, (data) => {
      if (data && data.messages) {
        const messageSorted = [...data.messages];
        messageSorted.sort((a, b) => b.time - a.time);
        setMessages(messageSorted);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [id]);

  const navigateUserProfile = (userId) => {
    if (userId === auth.currentUser.uid) {
      navigate(`/myProfile/${userId}`);
    } else {
      navigate(`/readyTutorProfile/${userId}`);
    }
  };

  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (currentMessage.trim() !== "") {
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);

      setMessages([
        {
          text: currentMessage,
          user: auth.currentUser.displayName,
          time: currentTimeInSeconds,
        },
        ...messages,
      ]);

      addMessageToGroup("Groups", id, {
        message: currentMessage,
        userid: auth.currentUser.uid,
        time: currentTimeInSeconds,
        userName: currentUser.name,
      });

      setCurrentMessage("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {state === "loaded" && (
        <section className="groupChat_section">
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
              Statistica
            </MediumTitle>
          </header>
          <div className="chat-messages">
            {messages.map((message, index) => {
              if (message.userid === auth.currentUser.uid) {
                return (
                  <div key={index} className="chat-message my-message">
                    <div className="chat-message_container">
                      <img
                        id={message.userid}
                        className="chat-messages_image"
                        src={allProfileImages[message.userid]}
                        alt="ellipse"
                        onClick={() => {
                          navigateUserProfile(message.userid);
                        }}
                      />
                      <MedParagraph>{message.message}</MedParagraph>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="chat-message other-message">
                    <div className="chat-message_container">
                      <img
                        id={message.userid}
                        className="chat-messages_image"
                        src={allProfileImages[message.userid]}
                        alt="ellipse"
                        onClick={() => {
                          navigateUserProfile(message.userid);
                        }}
                      />
                      <MedParagraph>{message.message}</MedParagraph>
                    </div>
                  </div>
                );
              }
            })}
          </div>

          <div className="groupChat_section_chat_textFieldImage">
            <div className="groupChat_section_chat">
              <img
                className="section-yourProfile_Header_arrow "
                src={microphone}
                alt="micro"
              />
              <img
                className="section-yourProfile_Header_arrow "
                src={addImage}
                alt="image"
              />
              <img
                className="section-yourProfile_Header_arrow "
                src={addPdf}
                alt="pdf"
              />
            </div>
            <input
              className="groupChat_section_chat_field"
              type="text"
              value={currentMessage}
              onChange={handleMessageChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </section>
      )}
    </>
  );
}

export default ChatGroup;
