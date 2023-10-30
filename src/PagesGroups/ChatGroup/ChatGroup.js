import React, { useEffect, useState } from "react";
import arrow from "../Photos/leftArrow.png";
import addImage from "./photos/addImage.png";
import addPdf from "./photos/addPdf.png";
import microphone from "./photos/microphone.png";
import { useNavigate } from "react-router-dom";
import { addMessageToGroup } from "../../firebase";
import { MedParagraph, MediumTitle } from "../../Components/variables.js";
import "./chatGroup.css";
import { getAuth } from "firebase/auth";
import { useParams } from "react-router-dom";
import { fetchCollDocParams } from "../../firebase";
import { startListeningToGroupChanges } from "../../firebase";
function ChatGroup() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const id = useParams().id;
  useEffect(() => {
    fetchCollDocParams("Users", auth.currentUser.uid).then((data) => {
      setCurrentUser(data);
    });
    const unsubscribe = startListeningToGroupChanges("Groups", id, (data) => {
      if (data) {
        let messageSorted=data.messages
        messageSorted.sort((a, b) => b.time - a.time);
        setMessages(messageSorted);
        console.log(data)
      }
    });
  }, []);
  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (currentMessage.trim() !== "") {
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);

      // Dodaj wiadomość do stanu
      setMessages([
        {
          text: currentMessage,
          user: auth.currentUser.displayName, // Dodaj nazwę użytkownika (zmień na odpowiednie pole z danymi użytkownika)
          time: currentTimeInSeconds,
        },
        ...messages,
      ]);

      // Dodaj wiadomość do grupy w Firebase
      addMessageToGroup("Groups", id, {
        message: currentMessage,
        userid: auth.currentUser.uid,
        time: currentTimeInSeconds,
        userName: currentUser.name,
      });

      setCurrentMessage(""); // Wyczyść pole wiadomości
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
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
                  <MedParagraph>
                    {message.message}:{message.userName}
                  </MedParagraph>
                </div>
              );
            } else {
              return (
                <div key={index} className="chat-message other-message">
                  <MedParagraph>
                    {message.userName}: {message.message}
                  </MedParagraph>
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
    </>
  );
}

export default ChatGroup;
