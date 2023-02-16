import { useNavigate } from "react-router-dom";
import {
  Button,
  LabelForm,
  BigTitle,
  InputForm,
  SmallParagraph,
} from "../../Components/variables.js";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../../Context/UserContext";
import "./logIn.css";
import { Formik } from "formik";

function LogIn() {
  useEffect(() => {
    if (theme.userDataAccount.isLoggedIn) {
      navigate(+1);
    }
  }, []);
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const navigateToCreateAccount = () => {
    navigate("./createAccount");
  };
  const logIn = (values) => {
    fetch(
      `http://145.239.86.33/User/LoginUser?login=${values.userName}&password=${values.password}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data === true) {
          theme.setUserDataAccount({
            ...theme.userDataAccount,
            isLoggedIn: data,
          });
          sessionStorage.setItem("user", JSON.stringify(theme.userDataAccount));
        }
      })
      .then(() => navigate("../groupPanel"));
  };
  return (
    <>
      <section className="LogInContainer">
        <BigTitle className="LogInContainer_logInHeader">Logowanie</BigTitle>
        <Formik
          initialValues={{ userName: "", password: "" }}
          onSubmit={(values) => logIn(values)}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form
              className="LogInContainer_Form_inputs"
              onSubmit={handleSubmit}
            >
              <div>
                <LabelForm>E-mail</LabelForm>
                <InputForm
                  type={"text"}
                  onChange={handleChange}
                  name="userName"
                  value={values.userName}
                  className="LogInContainer_Form_input"
                />
              </div>
              <div className="LogInContainer_Form_input_password">
                <LabelForm>Hasło</LabelForm>
                <InputForm
                  onChange={handleChange}
                  name="password"
                  type={"password"}
                  value={values.password}
                  className="LogInContainer_Form_input"
                />
                <SmallParagraph>Nie pamiętam hasła</SmallParagraph>
              </div>
              <Button type="submit" className="LogInContainer_Button">
                Zaloguj się
              </Button>
            </form>
          )}
        </Formik>

        <SmallParagraph
          onClick={navigateToCreateAccount}
          className="LogInContainer-signUp"
        >
          Zarejestruj się
        </SmallParagraph>
      </section>
    </>
  );
}

export default LogIn;
