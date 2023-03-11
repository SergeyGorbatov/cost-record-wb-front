import { useQuery, useMutation } from "react-query";
import axios from "axios";

const URL = "https://cost-record-wb.vercel.app";

export const useQueryCost = () => {
  return useQuery("get costs", async () => {
    const { data } = await axios.get(`${URL}/costs`);
    return data;
  });
};

export const useMutationCost = () => {
  return useMutation(async ({ amount, expenseItem, count, date }) => {
    const argumentsFunc = { amount, expenseItem, count, date };
    const { data } = await axios.post(`${URL}/costs`, argumentsFunc);
    return data;
  });
};

export const useMutationDeleteCost = () => {
  return useMutation(async () => {
    const { data } = await axios.delete(`${URL}/costs`);
    return data;
  });
};
