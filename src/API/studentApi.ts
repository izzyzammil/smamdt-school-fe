import { apiInstance } from "./apiInstance";

export const getStudents = async () => {
  try {
    const res = await apiInstance.get("/students/list");
    return res.data;
  } catch (error: any) {
    throw error;
  }
};
