export const fetchGroups = async () => {
    try {
      const response = await fetch("http://145.239.86.33/Group/GetAllGroupsOrdered?pageSize=12");
      return response.json();
    } catch (error) {
      console.error("Error fetching groups:", error);
      return [];
    }
  };