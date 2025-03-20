import {
  type ComponentProps, type ElementType,
  isValidElement,
  type PropsWithChildren,
  type ReactNode
} from 'react';

export interface ButtonLikeProps {
  asChild?: boolean
  children?: ReactNode
  disabled?: boolean
  loading?: boolean
  rootElement?: ElementType
}

// Хук useButtonLikeProps используется в полиморфных компонентах-кнопках (FatherComponent с asChild пропом): Button, Cell, CellAction, etc
// Главная задача хука - собрать объект с валидными аттрибутами компонента, в зависимости от рутового элемента
export const useButtonLikeProps = (props: ButtonLikeProps): ComponentProps<any> => {
  const { asChild, children, rootElement, disabled, loading } = props;

  if (!asChild && rootElement === 'button') {
    const buttonProps: ComponentProps<'button'> = {
      disabled,
      ...(loading ? { 'aria-disabled': true } : {})
    };
    return buttonProps;
  }

  // Если компонент использует проп asChild, то нужно определить тип children элемента и вернуть нужные аттрибуты
  if (asChild && isValidElement<PropsWithChildren>(children)) {
    const { type } = children;

    // Если это ссылка (тег a), то нужно добавить aria-disabled, запревентить открытие ссылки и убрать фокус, если компонент disabled
    if (type === 'a') {
      const anchorProps: ComponentProps<'a'> = {
        'aria-disabled': disabled ?? loading,
        ...(disabled
          ? {
            onClick: (e) => { e.preventDefault(); },
            tabIndex: -1
          }
          : {}
        )
      };

      return anchorProps;
    }
  }

  // Если компонент не button и не a, то в качестве фоллбека используем пропы для div
  const divProps: ComponentProps<'div'> = {
    role: 'button',
    tabIndex: disabled ? -1 : 0,
    'aria-disabled': disabled ?? loading,
    ...(disabled
      ? { onClick: undefined }
      : {}
    )
  };
  return divProps;
};
