import arrow from "../Photos/leftArrow.png";
import { useNavigate } from "react-router-dom";
import {
  MediumTitle,
  SelectInput,
  InputForm,
  SmallLabelForm,
  MedParagraph,
  SimpleBlockInput,
  Button,
} from "../../Components/variables";
import { Formik } from "formik";
import { postGroup } from "./postGroup";
import "./createGroup.css";
import Navigation from "../../Components/Navigation/Navigation";
function CreateGroup() {
  const navigate = useNavigate();
  return (
    <>
      <Navigation />
      <section className=" section-create_group">
        <header className="section-create_group_Header">
          <img
            onClick={() => {
              navigate(-1);
            }}
            className="section-create_group_Header_arrow "
            src={arrow}
            alt="arrow left"
          />
          <MediumTitle className="section-create_group_title">
            Utwórz grupę{" "}
          </MediumTitle>
        </header>
        <Formik
          initialValues={{ title: "", description: "" }}
          onSubmit={(values) => postGroup(values).then(()=>{
            navigate()
          })}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form
              className="LogInContainer_Form_inputs"
              onSubmit={handleSubmit}
            >
              <SmallLabelForm>Tytuł</SmallLabelForm>
              <InputForm
                name="title"
                onChange={handleChange}
                value={values.title}
              />
              <div className="section-groups_sort_container">
                <SelectInput className="section-groups_sort" name="Sortuj">
                  <option value="">Przedmiot</option>
                </SelectInput>
                <SelectInput className="section-groups_sort" name="Sortuj">
                  <option value="">Deadline</option>
                </SelectInput>
              </div>
              <SmallLabelForm>Opis</SmallLabelForm>
              <textarea
                onChange={handleChange}
                value={values.description}
                className="section-create_group_description"
                id="description"
                name="description"
              />
              <MedParagraph className="section-create_group_btns">
                dodaj spotkanie
              </MedParagraph>
              <MedParagraph>dodaj wynagrodzenie</MedParagraph>
              {/* <SimpleBlockInput
                onClick={() => {
                  navigate("../recommendedTutor");
                }}
                className="addTutor_btn"
              >
                Zaproś korepetytora
              </SimpleBlockInput> */}
              <div className="buttons_boxes">
                <Button
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Anuluj
                </Button>
                <Button type="submit">Zatwierdź</Button>
              </div>
            </form>
          )}
        </Formik>
      </section>
    </>
  );
}

export default CreateGroup;