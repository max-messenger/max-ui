import * as React from 'react';

import type { OptionsProp } from './types';

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  margin: '6px'
};

const itemStyle: React.CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  margin: '2px 0'
};

interface OptionsContainerProps {
  checkedOptions: string[]
  onCheckedChange: (actual: string[]) => void
  options: OptionsProp
}

export const OptionsContainer = ({
  checkedOptions,
  onCheckedChange,
  options
}: OptionsContainerProps): React.JSX.Element => {
  const changeChecked = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name } = e.target;
    const actualCheckedOptions = checkedOptions.includes(name)
      ? checkedOptions.filter((optionName) => optionName !== name)
      : [...checkedOptions, name];

    onCheckedChange(actualCheckedOptions);
  };

  return (
    <div style={containerStyle}>
      {Object.keys(options).map((name) => (
        <label key={name} style={itemStyle}>
          {name}
          <input
            checked={checkedOptions.includes(name)}
            id={name}
            name={name}
            onChange={changeChecked}
            type="checkbox"
          />
        </label>
      ))}
    </div>
  );
};
