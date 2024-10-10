import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TUser = {
  email: string;
  exp: number;
  iat: number;
  name: string;
};
