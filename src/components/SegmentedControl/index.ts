import { SegmentedControlItem } from './components/SegmentedControlItem';
import { SegmentedControl } from './SegmentedControl';

const SegmentedControlNamespace = Object.assign(SegmentedControl, { Item: SegmentedControlItem });

export { SegmentedControlNamespace as SegmentedControl };
export type { SegmentedControlItemProps } from './components/SegmentedControlItem';
export type {
  SegmentedControlProps
} from './SegmentedControl';
