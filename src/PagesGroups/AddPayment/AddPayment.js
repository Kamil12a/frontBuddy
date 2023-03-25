import arrow from "../Photos/leftArrow.png";
import money from "./photos/money.png";

import { useNavigate } from "react-router-dom";

// import "react-calendar/dist/Calendar.css";
import Navigation from "../../Components/Navigation/Navigation.js";
import {
  SelectInput,
  InputForm,
  SmallParagraph,
  MedParagraph,
  MediumTitle,
  SimpleBlockInput,
  Button,
} from "../../Components/variables.js";
import "./addPayment.css";
import { useState } from "react";
import HeaderComponent from "../../Components/Header/Headers";
function AddPayment() {
  const [state, setState] = useState("data");
  const navigate = useNavigate();
  return (
    <>
      <Navigation />
      <section className="add_mettings_section">
       <HeaderComponent text={"Dodaj wynagrodzenie"}/>
        <SmallParagraph className="add_mettings_section_payment_title">
          wynagrodzenie:
        </SmallParagraph>
        <InputForm />
        <div className="add_mettings_section_payment_info">
          <img src={money} alt="money" />
          <SmallParagraph>
            Wynagrodzenie nie jest obowiązkowe i nie musi mieć formy pieniężnej.
          </SmallParagraph>
        </div>
        <Button
          onClick={() => {
            navigate(-1);
          }}
          className="add_mettings_section_btn"
        >
          {" "}
          Zatwierdź
        </Button>
      </section>
    </>
  );
}

export default AddPayment;
