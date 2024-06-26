import { IScreen } from '@interfaces/model/screens/Screens'
import { ReactNode } from 'react'

export interface ICard {
  delete?: () => void;
  edit?: () => void;
  assign?: () => void;
  changeState?: () => void;
  data: Omit<IScreen, 'screenId'>
  children?: ReactNode;
}

export interface ICardsGrid {
  icon?: JSX.Element;
  tooltip?: string;
  onPress?: () => void;
}
