import {
  TypographyAction,
  TypographyBody,
  TypographyDisplay,
  TypographyHeadline,
  TypographyLabel,
  TypographyTitle
} from './parts';

const TypographyNamespace = Object.assign({}, {
  Display: TypographyDisplay,
  Headline: TypographyHeadline,
  Title: TypographyTitle,
  Body: TypographyBody,
  Label: TypographyLabel,
  Action: TypographyAction
});

export { TypographyNamespace as Typography };
export type { TypographyActionProps, TypographyActionVariant, TypographyBodyProps, TypographyBodyVariant, TypographyDisplayProps, TypographyHeadlineProps, TypographyHeadlineVariant, TypographyLabelProps, TypographyLabelVariant, TypographyTitleProps, TypographyTitleVariant } from './parts';
