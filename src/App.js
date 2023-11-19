import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./Pages/LogInComponents/logIn";
import CreateAccount from "./Pages/CreateAccount/createAccount";
import ChooseYourStudySubject from "./Pages/ChooseDepartment/ChooseYourStudySubject";
import { ThemeContext } from "./Context/UserContext";
import TutorProfile from "./Pages/TutorProfile/TutorProfile";
import WhatSubjectDoYouKnow from "./Pages/WhatSubjectDoYouKnow/WhatSubjectDoYouKnow";
import { useEffect, useState } from "react";
import WriteAboutYou from "./Pages/WriteAboutYou/WriteAboutYou";
import CreateYourProfile from "./Pages/CreateYourProfile/CreateYourProfile";
import ProfilManagment from "./Pages/ProfilManagment/ProfilManagment";
import ProfileSettings from "./Pages/ProfileSettings.js/ProfileSettings";
import Groups from "./PagesGroups/Groups/Groups";
import CreateGroup from "./PagesGroups/CreateGroup/CreateGroup";
import RecoomendedTutor from "./PagesGroups/recommendedTutor/recommendedTutor";
import ReadyTutorProfile from "./PagesGroups/TutorProfile/TutorProfile";
import CreatedGroup from "./PagesGroups/CreatedGroup/CreatedGroup";
import GroupSettings from "./PagesGroups/GroupSettings/GroupSettings";
import ChatGroup from "./PagesGroups/ChatGroup/ChatGroup";
import AddMettings from "./PagesGroups/AddMettings/AddMettings";
import AddPayment from "./PagesGroups/AddPayment/AddPayment";
import DeleteGroup from "./PagesGroups/DeleteGroup/DeleteGroup";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { QueryClient, QueryClientProvider } from 'react-query';
import MyProfile from "./PagesGroups/myProfile/MyProfile";
import YourGroups from "./PagesGroups/YourGroups/YourGroups";

function App() {
  const [userDataAccount, setUserDataAccount] = useState({});
  const [logged, setLogged] = useState(false);
  const queryClient = new QueryClient();
  
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
    <ThemeContext.Provider value={{ userDataAccount, setUserDataAccount }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<LogIn />} />
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route
            path="/chooseYourStudySubject"
            element={<ChooseYourStudySubject />}
          />
          
                    <Route
            path="/createYourProfile"
            element={<CreateYourProfile url={"../tutorProfile"} />}
          />
          <Route path="/tutorProfile" element={<TutorProfile />} />
          <Route
            path="/whatSubjectDoYouKnow"
            element={<WhatSubjectDoYouKnow />}
          />
          <Route path="/writeAboutYou" element={<WriteAboutYou />} />
          <Route path="/yourProfile" element={<ProfilManagment />} />
          <Route path="/profileSettings" element={<ProfileSettings />} />

          {logged && (
            <>
              <Route path="/groupPanel" element={<Groups />} />
              <Route
                path="/createGroup_ChooseSubject"
                element={<CreateGroup />}
              />
              <Route
                path="/createGroup_ChooseSubject"
                element={<RecoomendedTutor />}
              />
              <Route
                path="/readyTutorProfile/:id"
                element={<ReadyTutorProfile />}
              />
              <Route path="/detailsGroup/:id" element={<CreatedGroup />} />
              <Route path="/groupSettingsId" element={<GroupSettings />} />
              <Route path="/chatGroup/:id" element={<ChatGroup />} />
              <Route path="/addMettingsId" element={<AddMettings />} />
              <Route path="/addPaymentId" element={<AddPayment />} />
              <Route path="/deleteGroupId" element={<DeleteGroup />} />
              <Route path="/myProfile/:id" element={<MyProfile />} />
              <Route path="/yourGroups" element={ <YourGroups/>} />

            </>
          )}
        </Routes>
      </Router>
    </ThemeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
