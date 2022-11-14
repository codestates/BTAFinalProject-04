import {ActionCard} from './ActionCard';

import type {ComponentMeta, ComponentStory} from "@storybook/react";
import {DefaultLayout} from "../../layouts";

export default {
    title: 'Components/ActionCard',
    component: ActionCard,
} as ComponentMeta<typeof ActionCard>;

const Template: ComponentStory<typeof ActionCard> = (args) => {
    return (
        <DefaultLayout>
            <ActionCard {...args} />
        </DefaultLayout>
    );
}

export const ActionCardStory = Template.bind({});
ActionCardStory.args = {
    type: 'create',
}
