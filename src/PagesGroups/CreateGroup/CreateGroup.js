import { useNavigate } from "react-router-dom";
import {
 SelectInput,
  InputForm,
  SmallLabelForm,
  MedParagraph,
  Button,
} from "../../Components/variables";
import { Formik } from "formik";
import { postGroup } from "./postGroup";
import "./createGroup.css";
import Navigation from "../../Components/Navigation/Navigation";
import HeaderComponent from "../../Components/Header/Headers";
function CreateGroup() {
  const navigate = useNavigate();
  return (
    <>
      <Navigation />
      <section className=" section-create_group">
      <HeaderComponent text={"Utwórz grupę"}/>
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