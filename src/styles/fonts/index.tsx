import { ReactNode } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

export const GlobalFonts = createGlobalStyle`
   @import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

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

const TextBase = styled.h1<TextBaseProps>`
  font-family: 'Ubuntu', sans-serif;
  font-weight: ${({ weight }): number => weight || 400};
  font-style: ${({ italic }): string => (italic ? 'italic' : 'normal')};
  font-size: ${({ size }): string => size || '1rem'};
`;

export const UbuntuLight = (props: TextBaseProps): JSX.Element => (
  <TextBase {...props} weight={300} />
);
export const UbuntuRegular = (props: TextBaseProps): JSX.Element => (
  <TextBase {...props} weight={400} />
);
export const UbuntuMedium = (props: TextBaseProps): JSX.Element => (
  <TextBase {...props} weight={500} />
);
export const UbuntuBold = (props: TextBaseProps): JSX.Element => (
  <TextBase {...props} weight={700} />
);

export const UbuntuLightItalic = (props: TextBaseProps): JSX.Element => (
  <TextBase {...props} weight={300} italic />
);
export const UbuntuRegularItalic = (props: TextBaseProps): JSX.Element => (
  <TextBase {...props} weight={400} italic />
);
export const UbuntuMediumItalic = (props: TextBaseProps): JSX.Element => (
  <TextBase {...props} weight={500} italic />
);
export const UbuntuBoldItalic = (props: TextBaseProps): JSX.Element => (
  <TextBase {...props} weight={700} italic />
);
