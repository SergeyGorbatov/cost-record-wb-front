import styled, { keyframes } from "styled-components";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";

const Container = styled.div`
  width: 100%;
`;

const loadingAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const LoaderSkeleton = styled.div`
  height: 20px;
  width: 150px;
  border-radius: 4px;
  background-color: #ccc;
  overflow: hidden;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(182, 182, 182, 0.8) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: ${loadingAnimation} 2s linear infinite;
  }
`;

const columns = [
  {
    name: "Сумма",
    selector: (row) => <LoaderSkeleton></LoaderSkeleton>,
  },
  {
    name: "Статья",
    selector: (row) => <LoaderSkeleton></LoaderSkeleton>,
  },
  {
    name: "Количество",
    selector: (row) => <LoaderSkeleton></LoaderSkeleton>,
  },
  {
    name: "Дата",
    selector: (row) => <LoaderSkeleton></LoaderSkeleton>,
  },
];

const CustomLoader = ({ rows }) => {
  const [rowsCount, setRowsCount] = useState([]);

  useEffect(() => {
    const newRows = [];

    for (let i = 0; i < rows; i++) {
      newRows.push({ id: i });
    }

    setRowsCount(newRows);
  }, [rows]);

  return (
    <Container>
      <DataTable columns={columns} data={rowsCount} />
    </Container>
  );
};

export default CustomLoader;
