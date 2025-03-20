import { type AllHTMLAttributes, isValidElement } from 'react';

import { type AsChildProp } from '../../types';

interface ExpectedProps extends AsChildProp {
  onClick?: AllHTMLAttributes<HTMLElement>['onClick']
  href?: AllHTMLAttributes<HTMLElement>['href']
  children?: AllHTMLAttributes<HTMLElement>['children']
  parentChildren?: AllHTMLAttributes<HTMLElement>['children']
}

export const checkComponentHasAction = ({ onClick, href, children, asChild, parentChildren = children }: ExpectedProps): boolean => {
  // Если компонент НЕ полиморфный (без asChild=true), то смотрим на базовые пропы, чтобы определить кликабельный ли компонент
  if (!asChild) return !!onClick || !!href;

  // Если компонент полиморфный (asChild=true) смотрим на тип children и проверяем базовые пропы уже у него
  if (asChild && isValidElement(parentChildren)) return ('href' in parentChildren.props || 'onClick' in parentChildren.props);

  return false;
};
