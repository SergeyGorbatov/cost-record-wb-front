import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useMutationCost, useQueryCost } from "../api/cost";
import { useMutationIncome, useQueryIncome } from "../api/income";
import Dropdown from "./Dropdown";
import Frame from "./Frame";
import InputWithLabel from "./Input";
import Table from "./Table";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MainContainer = styled.div`
  display: flex;
  height: 100%;
  padding: 50px;
`;

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;
`;
const Wrapper2 = styled.div`
  flex-grow: 1;
  padding-left: 20px;
`;

const InputsBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonBlock = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 25px;
  padding: 5px;
`;

const Button = styled.button`
  background-color: black;
  color: #e0e0e0;
  border: none;
  padding: 15px 35px;
  border-radius: 8px;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    background-color: #363636;
  }
`;

const ButtonFooter = styled.a`
  color: #e0e0e0;
  font-weight: 500;
  font-size: 20px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Footer = () => {
  const navigate = useNavigate();

  return (
    <ButtonBlock>
      <ButtonFooter onClick={() => navigate("/income")}>
        Детализация доходов
      </ButtonFooter>
      <ButtonFooter onClick={() => navigate("/cost")}>
        Детализация расходов
      </ButtonFooter>
    </ButtonBlock>
  );
};

function Main() {
  const { mutate: postCost, isSuccess: isSuccessCost } = useMutationCost();
  const { mutate: postIncome, isSuccess: isSuccessIncome } =
    useMutationIncome();
  const {
    data: costs,
    refetch: refetchCost,
    isFetching: isRefetchingCost,
  } = useQueryCost();
  const {
    data: incomes,
    refetch: refetchIncome,
    isFetching: isRefetchingIncome,
  } = useQueryIncome();

  useEffect(() => {
    if (isSuccessCost) {
      refetchCost();
    }
    if (isSuccessIncome) {
      refetchIncome();
    }
  }, [isSuccessCost, isSuccessIncome, refetchCost, refetchIncome]);

  const finalIncome = incomes?.reduce(
    (acc, income) => (acc += income.amount),
    0
  );
  const finalCost = costs?.reduce((acc, income) => (acc += income.amount), 0);
  const finalIncomeCount = costs?.reduce(
    (acc, income) => (acc += income.count),
    0
  );

  const currentDate = new Date().toISOString().slice(0, 10);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedForm, setSelectedForm] = useState("");

  const resetInputs = () => {
    setSelectedOption(null);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      amount: "",
      expenseItem: "",
      count: "",
      date: "",
    },

    onSubmit: (values) => {
      switch (selectedForm) {
        case "Доход":
          postIncome(values);
          resetInputs();
          return;
        case "Расход":
          postCost(values);
          resetInputs();
          return;
        default:
          break;
      }
    },
  });

  const handleButton = (type) => {
    setSelectedForm(type);
    formik.handleSubmit();
  };

  return (
    <Frame footer={<Footer />} title={"Главная"}>
      <Wrapper>
        <MainContainer>
          <Wrapper1>
            <form onSubmit={formik.handleSubmit}>
              <InputsBlock>
                <InputsBlock>
                  <InputWithLabel
                    type="number"
                    name="amount"
                    onChange={formik.handleChange}
                    value={formik.values.amount}
                    label="Сумма"
                  />
                </InputsBlock>

                <InputsBlock>
                  <Dropdown
                    options={["Option 1", "Option 2", "Option 3"]}
                    value={formik.values.expenseItem}
                    setFieldValue={formik.setFieldValue}
                    label="Статья"
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                  />
                </InputsBlock>

                <InputsBlock>
                  <InputWithLabel
                    type="number"
                    name="count"
                    onChange={formik.handleChange}
                    value={formik.values.count}
                    label="Количество"
                  />
                </InputsBlock>

                <InputsBlock>
                  <InputWithLabel
                    type="date"
                    name="date"
                    onChange={formik.handleChange}
                    value={
                      !formik.values.date ? currentDate : formik.values.date
                    }
                    label="Дата"
                  />
                </InputsBlock>
              </InputsBlock>

              <ButtonBlock>
                <Button type="button" onClick={() => handleButton("Доход")}>
                  Доход
                </Button>
                <Button type="button" onClick={() => handleButton("Расход")}>
                  Расход
                </Button>
                <Button onClick={resetInputs} type="button">
                  Сбросить форму
                </Button>
              </ButtonBlock>
            </form>
          </Wrapper1>

          <Wrapper2>
            <Table
              finalIncome={finalIncome}
              finalCost={finalCost}
              finalIncomeCount={finalIncomeCount}
              loading={isRefetchingCost || isRefetchingIncome}
            />
          </Wrapper2>
        </MainContainer>
      </Wrapper>
    </Frame>
  );
}

export default Main;
