import React from "react";
import styled, { keyframes } from "styled-components";
import { formatterRubles } from "../utils/helpers";

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const TableWrapper = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableHeader = styled.th`
  background-color: #333333;
  color: #e0e0e0;
  font-weight: bold;
  padding: 10px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:nth-child(odd) {
    background-color: #c9c9c9;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
`;

const SkeletonCell = styled(TableCell)`
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      to right,
      #666666 0%,
      #999999 30%,
      #666666 50%,
      #999999 70%,
      #666666 100%
    );
    background-repeat: repeat;
    background-size: 1200px 104px;
    display: block;
    animation-duration: 2.5s;
    animation-fill-mode: inherit;
    animation-iteration-count: infinite;
    animation-name: ${shimmer};
    animation-timing-function: linear;
  }
`;

const Table = ({ finalIncome, finalCost, finalIncomeCount, loading }) => {
  return (
    <TableWrapper>
      <thead>
        <tr>
          <TableHeader>Название</TableHeader>
          <TableHeader>Количество</TableHeader>
        </tr>
      </thead>
      <tbody>
        <TableRow>
          <TableCell>Кубышка</TableCell>
          {loading ? (
            <SkeletonCell>&nbsp;</SkeletonCell>
          ) : (
            <TableCell>{formatterRubles(10)}</TableCell>
          )}
        </TableRow>
        <TableRow>
          <TableCell>Количество купленых килтов</TableCell>
          {loading ? (
            <SkeletonCell>&nbsp;</SkeletonCell>
          ) : (
            <TableCell>{finalIncomeCount} шт.</TableCell>
          )}
        </TableRow>
        <TableRow>
          <TableCell>Всего расход</TableCell>
          {loading ? (
            <SkeletonCell>&nbsp;</SkeletonCell>
          ) : (
            <TableCell>{formatterRubles(finalCost)}</TableCell>
          )}
        </TableRow>
        <TableRow>
          <TableCell>Всего доход</TableCell>
          {loading ? (
            <SkeletonCell>&nbsp;</SkeletonCell>
          ) : (
            <TableCell>{formatterRubles(finalIncome)}</TableCell>
          )}
        </TableRow>
      </tbody>
    </TableWrapper>
  );
};

export default Table;
