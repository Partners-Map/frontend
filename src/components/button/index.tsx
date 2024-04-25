import { CSSProperties, FunctionComponent, SVGProps } from 'react';
import { ButtonS } from '../../styles/button';

export type ButtonProps = {
  title?: string;
  onClick?: () => void;
  style?: CSSProperties;
  icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  iconSize?: number;
  backgroundColor?: 'blue' | 'white';
};

export const Button: FunctionComponent<ButtonProps> = ({
  title,
  onClick,
  style,
  icon: IconComponent,
  iconSize,
  backgroundColor = 'blue'
}): JSX.Element => {
  return (
    <ButtonS onClick={onClick} style={style} backgroundColor={backgroundColor}>
      {IconComponent && <IconComponent width={iconSize} height={iconSize} />}
      {title}
    </ButtonS>
  );
};
