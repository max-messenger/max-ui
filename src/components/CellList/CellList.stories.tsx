import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from '../Avatar';
import { CellHeader } from '../CellHeader';
import { CellSimple } from '../CellSimple';
import { Panel } from '../Panel';
import { CellList, type CellListProps } from './CellList';

const meta = {
  title: 'Common/CellList',
  component: CellList,
  argTypes: {
    header: {
      options: [0, 1],
      mapping: [
        undefined,
        <CellHeader key="header">Пользователи</CellHeader>
      ],
      control: {
        type: 'select',
        labels: ['None', 'Yes']
      }
    }
  },
  args: {
    mode: 'island',
    filled: true
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375, height: 375 }}>
        <Panel mode="secondary" centeredY>
          <Story />
        </Panel>
      </div>
    )
  ]
} satisfies Meta<CellListProps>;

export default meta;
type Story = StoryObj<CellListProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return (
      <CellList {...args}>
        <CellSimple
          title="Igor Foxik"
          before={(
            <Avatar.Container size={40}>
              <Avatar.Image src="https://sun9-67.userapi.com/s/v1/ig2/JsDOGxKlelRtyPp3DgWYYxPbSMfsENZjZdWiDANWbV7MEmsJjdIivjgHhWTH5JlNJCJVX-KBKhIYahjkbjzvxxhD.jpg?quality=95&crop=344,13,854,854&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100" />
            </Avatar.Container>
          )}
          showChevron
          onClick={() => {}}
        />
        <CellSimple
          title="Vadim Tregubenko"
          before={(
            <Avatar.Container size={40}>
              <Avatar.Image src="https://sun9-67.userapi.com/s/v1/ig2/CY_xDesKnMtl0OiJynK0oc7QnxQVJUgeciJSi_MpZUiE3EHSCNltr76jugXaygGd2Xh0M8-61v7Jwfl1kO87YWVe.jpg?quality=95&crop=0,0,1440,1440&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&u=SpmuDKJYdLKKRYYDgjLVQdEn6QnBonR3kSYxCSkCnm4&cs=200x200" />
            </Avatar.Container>
          )}
          showChevron
          onClick={() => {}}
        />
        <CellSimple
          title="Ira Grishina"
          before={(
            <Avatar.Container size={40}>
              <Avatar.Image src="https://sun9-22.userapi.com/s/v1/ig2/GIx9ixLIVcH_Cu_E5hwjYXqHSDGEO6XkE33wfKgVvs1c33VaMO24otPJ_nrgWHt7dOP1B3kWEYxoIezkFxu9ygxZ.jpg?quality=95&crop=100,579,1010,1010&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=100x100" />
            </Avatar.Container>
          )}
          showChevron
          onClick={() => {}}
        />
      </CellList>
    );
  }
};
