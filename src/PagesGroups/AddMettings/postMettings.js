export function addMetting({ values, group, hour }) {
  let dataChanged = {
    id: group.id,
    tutorId: group.tutorId,
    place: values.place,
    shortDescription: group.shortDescription,
    description: group.description,
    meetingDate: values.meetingDate + "T" + hour + ":45.675",
    groupOwnerId: group.groupOwnerId,
    subjectId: group.subjectId,
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
    });
}
