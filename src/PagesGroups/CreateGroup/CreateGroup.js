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
import "firebase/auth";
import { Formik } from "formik";
import "./createGroup.css";
import { getAuth } from "firebase/auth";
import { createCollectionAndAddDocument } from "../../firebase";
import Navigation from "../../Components/Navigation/Navigation";
function CreateGroup() {
  const navigate = useNavigate();
  const auth = getAuth();

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
          initialValues={{ subjects: "", deadline: "", description: "" }}
          onSubmit={(values) =>
            createCollectionAndAddDocument("Groups", {
              ...values,
              userUid: auth.currentUser.uid,
            })
          }
        >
          {({ values, handleChange, handleSubmit }) => (
            <form
              className="LogInContainer_Form_inputs"
              onSubmit={handleSubmit}
            >
              <SmallLabelForm>Tytuł</SmallLabelForm>
              <InputForm />
              <div className="section-groups_sort_container">
                <SelectInput
                  onChange={handleChange}
                  value={values.subjects}
                  className="section-groups_sort"
                  name="subjects"
                >
                  <option value="">Przedmiot</option>
                  <option value="Matematyka">Matematyka</option>
                </SelectInput>

                <SelectInput
                  onChange={handleChange}
                  className="section-groups_sort"
                  name="deadline"
                  value={values.date}
                >
                  <option value="">Deadline</option>
                  <option value="one week"> one week</option>
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
              <SimpleBlockInput
                onClick={() => {
                  navigate("../recommendedTutor");
                }}
                className="addTutor_btn"
              >
                Zaproś korepetytora
              </SimpleBlockInput>
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
