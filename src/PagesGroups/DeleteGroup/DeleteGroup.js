import noDelete from "./photos/no.png";
import yesDelete from "./photos/yes.png";
import { useNavigate } from "react-router-dom";
import {
  MediumTitle,
  SimpleBlockInput,

} from "../../Components/variables";
import "./deleteGroup.css";
import Navigation from "../../Components/Navigation/Navigation";
import HeaderComponent from "../../Components/Header/Headers";
function DeleteGroup() {
  const navigate = useNavigate();
  return (
    <>
      <Navigation />
      <section className=" section_delete_group">
      <HeaderComponent text={"Statistica"}/>
        <div className="section_delete_group_container">
          <MediumTitle className="section_delete_group_title">
            Zakończyć grupę?
          </MediumTitle>
          <div className="section_delete_group_container_btn">
            <SimpleBlockInput
              onClick={() => {
                navigate(-1);
              }}
            >
              <img
                className="image_nodelete_group"
                src={noDelete}
                alt="delete"
              />
              nie
            </SimpleBlockInput>
            <SimpleBlockInput>
              {" "}
              <img
                className="image_delete_group"
                src={yesDelete}
                alt="delete"
              />
              tak
            </SimpleBlockInput>
          </div>
        </div>
      </section>
    </>
  );
}

export default DeleteGroup;
