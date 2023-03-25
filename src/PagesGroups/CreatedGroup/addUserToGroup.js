export const addUserToGroup = (userId, groupId) => {
  fetch(
    `http://145.239.86.33/Group/AddUserToGroup?groupId=${groupId}=${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    });
};
