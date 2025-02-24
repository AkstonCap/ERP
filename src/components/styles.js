import styled from '@emotion/styled';

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