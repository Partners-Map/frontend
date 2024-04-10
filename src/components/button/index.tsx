import { CSSProperties, FunctionComponent, SVGProps } from 'react';
import { ButtonS } from '../../styles/button';

type ButtonProps = {
  title: string;
  onClick?: () => void;
  style?: CSSProperties;
  icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  iconSize?: number;
};

export const Button: FunctionComponent<ButtonProps> = ({
  title,
  onClick,
  style,
  icon: IconComponent,
  iconSize
}): JSX.Element => {
  return (
    <ButtonS onClick={onClick} style={style}>
      {IconComponent && <IconComponent width={iconSize} height={iconSize} />}
      {title}
    </ButtonS>
  );
};
