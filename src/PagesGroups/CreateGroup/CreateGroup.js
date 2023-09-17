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
import { Formik, Field } from "formik";
import DatePicker from "react-datepicker";
import { format } from "date-fns"; // Importuj funkcję format z date-fns
import "react-datepicker/dist/react-datepicker.css";
import "./createGroup.css";
import { getAuth } from "firebase/auth";
import { createCollectionAndAddDocument } from "../../firebase";
import Navigation from "../../Components/Navigation/Navigation";
import { useState } from "react";
import RecoomendedTutor from "../recommendedTutor/recommendedTutor";
const DatePickerField = ({ field, form, ...props }) => {
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        form.setFieldValue(field.name, val);
      }}
    />
  );
};
function CreateGroup() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [addTutorState, setaddTutorState] = useState(false);

  return (
    <>
      <Navigation />
      <section className="section-create_group">
        <Formik
          initialValues={{
            subjects: "",
            deadline: "",
            description: "",
            date: null,
            money: null,
            title:""
          }}
          onSubmit={(values) => {
            const newDate = format(new Date(values.date), "dd.MM.yyyy HH:mm");
            createCollectionAndAddDocument("Groups", {
              ...values,
              date: newDate,
              userUid: auth.currentUser.uid,
            }).then(
              navigate(-1)
            )
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form
              className="LogInContainer_Form_inputs"
              onSubmit={handleSubmit}
            >
              {!addTutorState && (
                <>
                  <header className="section-create_group_Header">
                    <img
                      onClick={() => {
                        navigate(-1);
                      }}
                      className="section-create_group_Header_arrow"
                      src={arrow}
                      alt="arrow left"
                    />
                    <MediumTitle className="section-create_group_title">
                      Utwórz grupę
                    </MediumTitle>
                  </header>
                  <SmallLabelForm>Tytuł</SmallLabelForm>
                  <InputForm onChange={handleChange} value={values.title} name="title" />

                  <div className="section-groups_sort_container">
                    {" "}
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
                      value={values.deadline}
                    >
                      <option value="">Deadline</option>
                      <option value="one week"> one week</option>
                    </SelectInput>
                  </div>

                  <SmallLabelForm>Opis</SmallLabelForm>
                  <Field
                    as="textarea"
                    onChange={handleChange}
                    value={values.description}
                    className="section-create_group_description"
                    id="description"
                    name="description"
                  />

                  <MedParagraph className="section-create_group_btns">
                    Opcjonalne
                  </MedParagraph>

                  <div className="section-create_group_meeting">
                    <MedParagraph>Dodaj spotkanie</MedParagraph>
                    <Field
                      component={DatePickerField}
                      name="date"
                      className="section-create_group_datepicker"
                      showTimeSelect // Dodano opcję showTimeSelect
                      dateFormat="dd.MM.yyyy HH:mm" // Format daty i czasu
                    />
                  </div>
                  <SelectInput
                    onChange={handleChange}
                    value={values.money}
                    className="section-groups_sort"
                    name="money"
                  >
                    <option value="">Wynagrodzenie</option>
                    <option value="20 zł">20 zł</option>
                    <option value="30 zł">30 zł</option>
                    <option value="40 zł">40 zł</option>
                  </SelectInput>
                  <SimpleBlockInput
                    onClick={() => {
                      setaddTutorState(true);
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
                </>
              )}
              {addTutorState && (
                <>
                  <header className="section-create_group_Header">
                    <img
                      onClick={() => {
                        setaddTutorState(false);
                      }}
                      className="section-create_group_Header_arrow"
                      src={arrow}
                      alt="arrow left"
                    />
                    <MediumTitle className="section-create_group_title">
                      Zaproś korepetytora
                    </MediumTitle>
                    
                  </header>
                  <RecoomendedTutor/>
                </>
              )}
            </form>
          )}
        </Formik>
      </section>
    </>
  );
}

export default CreateGroup;
