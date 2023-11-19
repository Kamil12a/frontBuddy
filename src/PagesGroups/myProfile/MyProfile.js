import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MedParagraph,
  SmallParagraph,
  MediumTitle,
  Button,
} from "../../Components/variables";
import "./MyProfile.css";
import { useNavigate } from "react-router-dom";
import arrow from "../../Pages/ChooseDepartment/photos/leftArrow.png";
import department from "../../Pages/ChooseDepartment/photos/departmentMain.png";
import year from "../../Pages/ChooseDepartment/photos/yearOfStudy.png";
import field from "../../Pages/ChooseDepartment/photos/fieldOfStudy.png";
import settings from "./photos/settings.png";
import book from "./photos/bookTutor.png";
import pen from "./photos/pen.png";
import { fetchCollDocParams, getFileDownloadURL } from "../../firebase";

function MyProfile() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [data, setData] = useState({});
  const [state, setState] = useState("loading");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchCollDocParams("Users", id)
      .then((userData) => {
        setData(userData);
        setState("loaded");
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
        setState("error");
      });
     getFileDownloadURL(`/profileImage/${id}`).then((data)=>{
      setImagePreview(data)
     })
  }, [id]);
  return (
    <>
      {state === "loading" && <div>Loading...</div>}
      {state === "loaded" && (
        <section className="section_tutorProfile">
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
              Profil
            </MediumTitle>
          </header>
          <div className="container_userName">
            <MediumTitle>{data.name}</MediumTitle>
          </div>
          {imagePreview !== null && (
          <div className="section_tutorProfile_image_box">
            <img
              className="section_tutorProfile_image"
              src={imagePreview}
              alt="Podgląd obrazu"
              style={{ maxWidth: "100%", marginTop: "10px" }}
            />
          </div>
        )}
          <div className="yourInformationAboutStudyInProfile">
            <div className="block_aboutyourStudy">
              <img
                className="aboutYourStudyImage"
                src={department}
                alt="department"
              />
              <MedParagraph>{data.department}</MedParagraph>
            </div>
            <div className="block_aboutyourStudy">
              <img
                className="aboutYourStudyImage boutYourStudyImage2"
                src={field}
                alt="field"
              />
              <MedParagraph>{data.field}</MedParagraph>
            </div>
            <div className="block_aboutyourStudy">
              <img
                className="aboutYourStudyImage boutYourStudyImage2"
                src={year}
                alt="year"
              />
              <MedParagraph>{data.yearOfStudy}</MedParagraph>
            </div>
          </div>

          <div className="section_tutorProfile_title">
            <img src={book} alt="book" />
            <MedParagraph className="tutorTitle_sectionTutorProfile">
              Korepetytor
            </MedParagraph>
          </div>
          <SmallParagraph className="section_tutorProfile_description_text">
            Opis:
          </SmallParagraph>
          <MedParagraph className="section_tutorProfile_description">
            {data.description}
          </MedParagraph>
          <SmallParagraph className="section_tutorProfile_topics">
            Zagadnienia:
          </SmallParagraph>
          {data.topics &&
            data.topics.map((topic, index) => (
              <div className="section_tutorProfile_your_topic" key={index}>
                <img className="pen" src={pen} alt="pen" />
                <MedParagraph>{topic}</MedParagraph>
              </div>
            ))}
          <img
            onClick={() => {
              navigate("../profileSettings");
            }}
            className="settings"
            src={settings}
            alt="settings"
          />
          <Button
            onClick={() => {
              navigate(`../yourGroups`);
            }}
            className="section_tutorProfile_btn_yourGroups"
          >
            Twoje grupy{" "}
          </Button>
        </section>
      )}
      {state === "error" && <div>Error loading user data.</div>}
    </>
  );
}

export default MyProfile;
