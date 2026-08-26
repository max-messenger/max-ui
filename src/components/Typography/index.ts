import {
  TypographyAction,
  TypographyBody,
  TypographyDisplay,
  TypographyHeadline,
  TypographyLabel,
  TypographyText,
  TypographyTitle
} from './parts';

const TypographyNamespace = Object.assign({}, {
  Display: TypographyDisplay,
  Headline: TypographyHeadline,
  Title: TypographyTitle,
  Body: TypographyBody,
  Label: TypographyLabel,
  Text: TypographyText,
  Action: TypographyAction
});

export { TypographyNamespace as Typography };
export type { TypographyActionProps, TypographyActionVariant, TypographyBodyProps, TypographyBodyVariant, TypographyDisplayProps, TypographyHeadlineProps, TypographyHeadlineVariant, TypographyLabelProps, TypographyLabelVariant, TypographyTextColor, TypographyTextProps, TypographyTextVariant, TypographyTitleProps, TypographyTitleVariant } from './parts';
