import { Box, FormControl } from '@mui/material';
import styled from 'styled-components';

export const LoginFormS = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 20vh;
`;

export const LoginInputWrapperS = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
  width: 100%;
  gap: 1vh;
`;

export const LoginInputS = styled.input<{ error?: boolean }>`
  width: 100%;
  height: 2vh;
  max-height: 40px;
  min-height: 12px;
  max-width: 400px;
  padding: 1vh;
  outline: none;
  border: 1px solid ${({ error }): string => (error ? '#e62a2a' : '#CCCCCC')};
  border-radius: 8px;
`;

export const LoginButtonS = styled.button`
  margin-top: 8vh;
  background-color: #010837;
  color: #fff;
  border: none;
  padding: 1vh;
  border-radius: 10px;
  font-size: 18px;
`;
