import { ReactNode } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

export const GlobalFonts = createGlobalStyle`
  body {
    font-family: 'Ubuntu', sans-serif;
  }
`;

type TextBaseProps = {
  weight?: number;
  italic?: boolean;
  size?: string;
  children?: ReactNode;
};

const TextBase = styled.p<TextBaseProps>`
  font-family: 'Ubuntu', sans-serif;
  font-weight: ${({ weight }): number => weight || 400};
  font-style: ${({ italic }): string => (italic ? 'italic' : 'normal')};
  font-size: ${({ size }): string => size || '1rem'};
`;

export const UbuntuLight = styled(TextBase).attrs({ weight: 300 })``;
export const UbuntuRegular = styled(TextBase).attrs({ weight: 400 })``;
export const UbuntuMedium = styled(TextBase).attrs({ weight: 500 })``;
export const UbuntuBold = styled(TextBase).attrs({ weight: 700 })``;

export const UbuntuLightItalic = styled(TextBase).attrs({ weight: 300, italic: true })``;
export const UbuntuRegularItalic = styled(TextBase).attrs({ weight: 400, italic: true })``;
export const UbuntuMediumItalic = styled(TextBase).attrs({ weight: 500, italic: true })``;
export const UbuntuBoldItalic = styled(TextBase).attrs({ weight: 700, italic: true })``;
