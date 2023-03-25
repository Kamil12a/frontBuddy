import arrow from "./photos/leftArrow.png"
import { MediumTitle, MedParagraph, Button } from "../variables"
import "./header.css"
import { useNavigate } from "react-router-dom";


function HeaderComponent({ text}) {
  const navigate = useNavigate();

  return (
    <>
        <header className="Header">
          <img
            onClick={()=>{
                navigate(-1)
            }}
            className="section_Header_arrow "
            src={arrow}
            alt="arrow left"
          />
          <MediumTitle>
            {text}
          </MediumTitle>
        </header>
       
    </>
  );
}

export default HeaderComponent;
