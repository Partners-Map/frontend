import styled from 'styled-components';

export const LoginFormS = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60vw;
  margin-top: 20vh;
`;

export const LoginInputWrapperS = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
  width: 80%;
`;

export const LoginInputS = styled.input`
  width: 100%;
  height: 2vh;
  padding: 1vh;
  outline: none;
  border: 2px solid #92e891;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.394);
`;

export const LoginButtonS = styled.button`
  margin-top: 38vh;
  width: 90%;
  background-color: #92e891;
  border: none;
  height: 6vh;
  border-radius: 10px;
  font-size: large;
`;
