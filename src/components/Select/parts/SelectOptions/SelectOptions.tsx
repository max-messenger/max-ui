import { clsx } from 'clsx';

import { useSelect } from '../../context';
import { SelectEmpty } from '../SelectEmpty';
import { SelectOptionRow } from '../SelectOptionRow';
import styles from './SelectOptions.module.scss';

export const SelectOptions = () => {
  const { options, listId, multiple, loading, listLabel, innerClassNames } = useSelect();

  return (
    <>
      <div
        id={listId}
        role="listbox"
        {...listLabel}
        aria-multiselectable={multiple || undefined}
        aria-busy={loading || undefined}
        className={clsx(styles.SelectOptions, innerClassNames?.list)}
      >
        {options.map((option, index) => (
          <SelectOptionRow
            key={option.value}
            option={option}
            index={index}
          />
        ))}
      </div>

      {(options.length === 0 || loading) && <SelectEmpty />}
    </>
  );
};

SelectOptions.displayName = 'SelectOptions';
