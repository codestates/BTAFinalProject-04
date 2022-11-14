import {ButtonPair} from './ButtonPair';
import {DefaultLayout} from "../../layouts";
import {noop} from "../../utils";

import type {ComponentMeta, ComponentStory} from "@storybook/react";


export default {
    title: 'Components/ButtonPair',
    component: ButtonPair,
} as ComponentMeta<typeof ButtonPair>;

const Template: ComponentStory<typeof ButtonPair> = (args) => {
    return (
        <DefaultLayout>
            <ButtonPair {...args} />
        </DefaultLayout>
    );
}

export const ButtonPairStory = Template.bind({});
ButtonPairStory.args = {
    onPrevButtonClick: noop,
    onNextButtonClick: noop,
}
ButtonPairStory.storyName='뒤로, 확인 버튼 pair';
