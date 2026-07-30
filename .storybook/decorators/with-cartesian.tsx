import { type Decorator } from '@storybook/react-vite';
import * as React from 'react';
import { addons } from 'storybook/preview-api';

import { ARG_TYPES_EVENT } from '../addons/variants/constants';

type CartesianOptions = Record<string, readonly unknown[]>;

function getCartesianCombinations (options: CartesianOptions): Array<Record<string, unknown>> {
  return Object.entries(options).reduce<Array<Record<string, unknown>>>(
    (acc, [prop, values]) =>
      acc.flatMap((props) =>
        values.map((value) => ({ ...props, [prop]: value }))
      ),
    [{}]
  );
}

export const withCartesian: Decorator = (Story, context) => {
  const cartesian = context.globals.cartesian as CartesianOptions | null | undefined;

  React.useEffect(() => {
    if (context.argTypes) {
      addons.getChannel().emit(ARG_TYPES_EVENT, {
        title: context.title,
        argTypes: context.argTypes
      });
    }
  }, [context.title, context.argTypes]);

  if (!cartesian || Object.keys(cartesian).length === 0) {
    return <Story />;
  }

  const combinations = getCartesianCombinations(cartesian);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '16px' }}>
      {combinations.map((combo, index) => (
        <div key={index} title={JSON.stringify(combo)}>
          <Story args={{ ...context.args, ...combo }} />
        </div>
      ))}
    </div>
  );
};