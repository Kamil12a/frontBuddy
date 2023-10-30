import { useNavigate } from "react-router-dom";
import "./navigation.css";
import home from "./Photos/home.png";
import bell from "./Photos/bell.png";
import heart from "./Photos/heart.png";
import message from "./Photos/message.png";
import person from "./Photos/person.png";
import { getAuth } from "firebase/auth";

function Navigation() {
  const navigate = useNavigate();
  const auth=getAuth()
  return (
    <>
      <nav>
        <img className="nav_item " src={home} alt="home" />
        <img className="nav_item " src={bell} alt="home" />
        <img className="nav_item " src={heart} alt="home" />
        <img className="nav_item " src={message} alt="home" />
        <img
          className="nav_item "
          src={person}
          alt="home"
          onClick={() => {
            navigate(`/myProfile/${auth.currentUser.uid}`);
          }}
        />
      </nav>
    </>
  );
}

export default Navigation;
