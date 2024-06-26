import { CSSProperties } from 'react'

export interface IModal {
  open: boolean;
  title: string;
  content: any;
  contentStyles: CSSProperties;
  result: (data: any) => void;
  text: string;
}
