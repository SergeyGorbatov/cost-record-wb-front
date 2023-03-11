import React, { useState } from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useMutationDeleteCost, useQueryCost } from "../api/cost";
import { filterData } from "../utils/filters";
import Frame from "./Frame";
import CustomLoader from "./CustomLoader";
import { downloadExcel } from "../utils/helpers";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
`;

const TableContainer = styled.div`
  width: 80%;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const FilterInput = styled.input`
  margin-right: 16px;
  padding: 8px;
  border-radius: 4px;
  border: none;
`;

const DateFilterContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DateFilterLabel = styled.label`
  margin-right: 8px;
`;

const ResetButton = styled.button`
  margin-left: 16px;
  padding: 8px;
  border-radius: 4px;
  border: none;
  background-color: #f2f2f2;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #e6e6e6;
  }
`;

const columns = [
  {
    name: "Сумма",
    selector: (row) => row.amount,
    sortable: true,
  },
  {
    name: "Статья",
    selector: (row) => row.expenseItem,
    sortable: true,
  },
  {
    name: "Количество",
    selector: (row) => row.count,
    sortable: true,
  },
  {
    name: "Дата",
    selector: (row) => row.date,
    sortable: true,
  },
];

const ButtonFooter = styled.a`
  color: #e0e0e0;
  font-weight: 500;
  font-size: 20px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const ButtonBlock = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 25px;
  padding: 5px;
`;

const Footer = () => {
  const navigate = useNavigate();

  return (
    <ButtonBlock>
      <ButtonFooter onClick={() => navigate("/income")}>
        Детализация доходов
      </ButtonFooter>
      <ButtonFooter onClick={() => navigate("/")}>Главная</ButtonFooter>
    </ButtonBlock>
  );
};

const Cost = () => {
  const [filterText, setFilterText] = useState("");
  const [filterDate, setFilterDate] = useState({});
  const navigate = useNavigate();
  const { data: costs, isLoading: isLoadingCost } = useQueryCost();
  const { mutate: deleteCosts } = useMutationDeleteCost();

  const filteredItems = filterData(costs, filterText, filterDate);

  const handleFilterDateFrom = (e) => {
    const newFilterDate = { ...filterDate };
    newFilterDate.from = e.target.value ? new Date(e.target.value) : null;
    setFilterDate(newFilterDate);
  };

  const handleFilterDateTo = (e) => {
    const newFilterDate = { ...filterDate };
    newFilterDate.to = e.target.value ? new Date(e.target.value) : null;
    setFilterDate(newFilterDate);
  };

  const handleResetFilters = () => {
    setFilterText("");
    setFilterDate({});
  };

  return (
    <Frame footer={<Footer />} title={"Учёт расходов"}>
      <Container>
        <Title>Детализация расходов</Title>
        <TableContainer>
          <ResetButton
            onClick={() => downloadExcel(filteredItems, "Расходы.xlsx")}
          >
            Скачать таблицу в Excel
          </ResetButton>
          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            paginationPerPage={5}
            highlightOnHover
            striped
            subHeader
            subHeaderComponent={
              <FilterContainer>
                <FilterInput
                  placeholder="Фильтр по статье"
                  onChange={(e) => setFilterText(e.target.value)}
                />
                <DateFilterContainer>
                  <DateFilterLabel>От:</DateFilterLabel>
                  <input type="date" onChange={handleFilterDateFrom} />
                </DateFilterContainer>
                <DateFilterContainer>
                  <DateFilterLabel>До:</DateFilterLabel>
                  <input type="date" onChange={handleFilterDateTo} />
                </DateFilterContainer>
                <ResetButton onClick={handleResetFilters}>
                  Сбросить все фильтры
                </ResetButton>
                <ResetButton onClick={() => deleteCosts()}>
                  Удалить все расходы
                </ResetButton>
              </FilterContainer>
            }
            progressPending={isLoadingCost}
            progressComponent={<CustomLoader rows={10} />}
            noDataComponent={<h1>Нет данных для отображения</h1>}
          />
        </TableContainer>
      </Container>
    </Frame>
  );
};

export default Cost;
