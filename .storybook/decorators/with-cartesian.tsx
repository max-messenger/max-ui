import { type Decorator } from '@storybook/react-vite';
import * as React from 'react';

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
