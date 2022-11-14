import {FullButton} from './FullButton';

import type {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    title: 'Components/FullButton',
    component: FullButton,
} as ComponentMeta<typeof FullButton>;

const Template: ComponentStory<typeof FullButton> = (args) => {
    return <FullButton {...args} />;
}

export const FullButtonStory = Template.bind({});
FullButtonStory.args = {
    children: 'hello'
}
