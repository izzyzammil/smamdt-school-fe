import { apiInstance } from "./apiInstance";

export const getStudents = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await apiInstance.get("/students/list");
    return res.data;
  } catch (error: any) {
    throw error;
  }
};
