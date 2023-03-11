import { useQuery, useMutation } from "react-query";
import axios from "axios";

const URL = "https://cost-record-wb.vercel.app";

export const useQueryIncome = () => {
  return useQuery("get incomes", async () => {
    const { data } = await axios.get(`${URL}/incomes`);
    return data;
  });
};

export const useMutationIncome = () => {
  return useMutation(async ({ amount, expenseItem, count, date }) => {
    const argumentsFunc = { amount, expenseItem, count, date };
    const { data } = await axios.post(`${URL}/incomes`, argumentsFunc);
    return data;
  });
};

export const useMutationDeleteIncome = () => {
  return useMutation(async () => {
    const { data } = await axios.delete(`${URL}/incomes`);
    return data;
  });
};
