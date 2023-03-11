import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useMutationDeleteCost, useQueryCost } from "../api/cost";
import { filterData } from "../utils/filters";
import Frame from "./Frame";
import CustomLoader from "./CustomLoader";
import { downloadExcel } from "../utils/helpers";
import { DeleteIcon, DownloadIcon, ResetIcon } from "./Icons";
import Modal from "./Modal";

const customStyles = {
  subHeader: {
    style: {
      backgroundColor: "#c9c9c9",
      padding: '15px'
    },
  },
  headCells: {
    style: {
      backgroundColor: "#c9c9c9",
      fontSize: "15px",
    },
  },
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const TableContainer = styled.div`
  width: 80%;
`;

const HeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 5px;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FilterInput = styled.input`
  margin-right: 16px;
  padding: 13px;

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

const HeadButton = styled.button`
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

const ModalButton = styled.button`
  background-color: ${({ isButtonDisabled }) =>
    isButtonDisabled ? "#888888" : "#333333"};
  color: #ffffff;
  border: none;
  padding: 15px 50px;
  border-radius: 5px;
  cursor: ${({ isButtonDisabled }) =>
    isButtonDisabled ? "not-allowed" : "pointer"};

  &:hover {
    background-color: ${({ isButtonDisabled }) =>
      isButtonDisabled ? "#888888" : "#555555"};
  }
`;

const TitleModal = styled.div`
  text-align: center;
  font-weight: 400;
  font-size: 25px;
  margin: 20px 10px 50px;
  line-height: 140%;
`;

const BlockButtonModal = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
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
      <ButtonFooter onClick={() => navigate("/")}>Главная</ButtonFooter>
      <ButtonFooter onClick={() => navigate("/income")}>
        Детализация доходов
      </ButtonFooter>
    </ButtonBlock>
  );
};

const Cost = () => {
  const [filterText, setFilterText] = useState("");
  const [filterDate, setFilterDate] = useState({});
  const navigate = useNavigate();
  const { data: costs, isLoading: isLoadingCost } = useQueryCost();
  const { mutate: deleteCosts } = useMutationDeleteCost();

  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);

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

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  useEffect(() => {
    if (showModal) {
      setIsButtonDisabled(true);

      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 5000);
    }
  }, [showModal]);

  const resetTable = () => {
    deleteCosts();
    setShowModal(false);
  };

  return (
    <Frame footer={<Footer />} title={"Детализация расходов"}>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <TitleModal>
            Удалить все данные из таблицы
            <br />
            безвозвратно?
          </TitleModal>
          <BlockButtonModal>
            <ModalButton
              isButtonDisabled={isButtonDisabled}
              disabled={isButtonDisabled}
              onClick={resetTable}
            >
              Да
            </ModalButton>
            <ModalButton onClick={() => setShowModal(false)}>Нет</ModalButton>
          </BlockButtonModal>
        </Modal>
      )}

      <Container>
        <TableContainer>
          <DataTable
            customStyles={customStyles}
            columns={columns}
            data={filteredItems}
            pagination
            paginationPerPage={5}
            highlightOnHover
            striped
            subHeader
            subHeaderComponent={
              <HeadContainer>
                <FilterContainer>
                  <FilterInput
                    value={filterText}
                    placeholder="Фильтр по статье"
                    onChange={(e) => setFilterText(e.target.value)}
                  />
                  <DateFilterContainer>
                    <DateFilterLabel>От:</DateFilterLabel>
                    <FilterInput type="date" onChange={handleFilterDateFrom} />
                  </DateFilterContainer>
                  <DateFilterContainer>
                    <DateFilterLabel>До:</DateFilterLabel>
                    <FilterInput type="date" onChange={handleFilterDateTo} />
                  </DateFilterContainer>
                  <HeadButton onClick={handleResetFilters}>
                    <ResetIcon />
                  </HeadButton>
                </FilterContainer>

                <FilterContainer>
                  <HeadButton
                    onClick={() => downloadExcel(filteredItems, "Расходы.xlsx")}
                  >
                    <DownloadIcon />
                  </HeadButton>
                  <HeadButton onClick={handleOpenModal}>
                    <DeleteIcon />
                  </HeadButton>
                </FilterContainer>
              </HeadContainer>
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
