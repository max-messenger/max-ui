import { GridIcon } from '@storybook/icons';
import * as React from 'react';
import { IconButton, WithTooltip } from 'storybook/internal/components';
import type { ArgTypes } from 'storybook/internal/types';
import { useArgTypes, useGlobals, useParameter, useStorybookState } from 'storybook/manager-api';

import { PARAM_KEY } from './constants';
import { OptionsContainer } from './OptionsContainer';
import type { OptionsProp } from './types';

const getOptionsFromArgTypes = (argTypes: ArgTypes): OptionsProp =>
  Object.entries(argTypes).reduce<OptionsProp>((options, [argName, argValue]) => {
    const controlType =
      typeof argValue.control === 'string'
        ? argValue.control
        : typeof argValue.control === 'object' && argValue.control !== null
          ? (argValue.control as { type?: string }).type
          : undefined;
    const hasOptions = argValue.options && (argValue.options as unknown[]).length > 0;

    if (controlType === 'boolean' || hasOptions) {
      options[argName] = controlType === 'boolean' ? [true, false] : (argValue.options as unknown[]);
    }
    return options;
  }, {});

const getCartesianFromOptions = (options: OptionsProp, checkedOptions: string[]): OptionsProp =>
  Object.keys(options)
    .filter((optionName) => checkedOptions.includes(optionName))
    .reduce<OptionsProp>((actualOptions, optionName) => {
    actualOptions[optionName] = options[optionName];
    return actualOptions;
  }, {});

export const Tool = (): React.JSX.Element | null => {
  const argTypes = useArgTypes();
  const [, updateGlobals] = useGlobals();
  const fileName = useParameter('fileName');
  const { storyId } = useStorybookState();
  const [isVisible, setIsVisible] = React.useState(false);
  const [checkedOptions, setCheckedOptions] = React.useState<string[]>([]);
  const cartesian = useParameter<boolean | string[]>(PARAM_KEY);

  React.useEffect(() => {
    setCheckedOptions([]);
    updateGlobals({ [PARAM_KEY]: null });
  }, [fileName, storyId]);

  const options = React.useMemo(() => {
    if (!cartesian) {
      return {};
    }

    const allOpts = getOptionsFromArgTypes(argTypes);

    if (cartesian === true) {
      return allOpts;
    }

    return Object.fromEntries(
      cartesian.filter((key) => key in allOpts).map((key) => [key, allOpts[key]])
    );
  }, [argTypes, cartesian]);

  const onCheckedChange = (actualChecked: string[]): void => {
    setCheckedOptions(actualChecked);
    updateGlobals({
      [PARAM_KEY]: actualChecked.length ? getCartesianFromOptions(options, actualChecked) : null
    });
  };

  if (!cartesian) {
    return null;
  }

  return (
    <WithTooltip
      closeOnOutsideClick
      onVisibleChange={setIsVisible}
      placement="bottom"
      tooltip={() => (
        <OptionsContainer
          checkedOptions={checkedOptions}
          onCheckedChange={onCheckedChange}
          options={options}
        />
      )}
      trigger="click"
      visible={isVisible}
    >
      <IconButton aria-label="Open variants list">
        <GridIcon />
        &nbsp; variants
      </IconButton>
    </WithTooltip>
  );
};
