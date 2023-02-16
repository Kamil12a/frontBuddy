
export async function postGroup(values) {
  let data = {
    tutorId: 1,
    groupOwnerId: 1,
    subjectId: 1,
  };
  let idOfGroup;
  await fetch("http://145.239.86.33/Group/AddGroup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      idOfGroup=data
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  let dataChanged = {
    id: idOfGroup,
    tutorId: 1,
    place: "string",
    meetingDate: "2023-02-16T16:44:49.897Z",
    groupOwnerId: 1,
    subjectId: 1,
    shortDescription: values.title,
    description: values.description,
  };
  fetch("http://145.239.86.33/Group/EditGroup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataChanged),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
}