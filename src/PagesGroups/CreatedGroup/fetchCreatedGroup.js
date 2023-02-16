
export const fetchCreatedGroups = async (id) => {
    try {
      const response = await fetch(`http://145.239.86.33/Group/GetGroup?groupId=${id}`);
      return response.json();
    } catch (error) {
      console.error("Error fetching groups:", error);
      return [];
    }
  };