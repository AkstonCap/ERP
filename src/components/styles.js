import styled from '@emotion/styled';
import { TextField } from 'nexus-module';

export const SearchField = styled(TextField)({
    maxWidth: 200,
  });

export const PageLayout = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  gap: 10px;
`;

export const SingleColRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 10px;
  overflow: auto;
  width: 98%;
  margin: 0 auto;
`;

export const CatalogueTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;

  th:nth-of-type(1) {
    width: 20%;
  }

  th:nth-of-type(2) {
    width: 15%;
  }

  th:nth-of-type(3) {
    width: 15%;
  }

  th:nth-of-type(4) {
    width: 30%;
  }

  th:nth-of-type(5) {
    width: 20%;
  }

  th {
    padding: 2px;
    text-align: right;
    padding-right: 5px;
    font-size: 18px;
  }

  td {
    padding: 2px;
    text-align: right;
    padding-right: 8px;
  }

`;