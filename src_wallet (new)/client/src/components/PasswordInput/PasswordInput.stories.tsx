import {PasswordInput} from './PasswordInput';

import type {ComponentMeta, ComponentStory} from "@storybook/react";
import {DefaultLayout} from "../../layouts";

export default {
    title: 'Components/PasswordInput',
    component: PasswordInput,
} as ComponentMeta<typeof PasswordInput>;

const Template: ComponentStory<typeof PasswordInput> = (args) => {
    return (
        <DefaultLayout>
            <PasswordInput {...args} />
        </DefaultLayout>
    );
}

export const PasswordInputStory = Template.bind({});
PasswordInputStory.args = {
    label: '비밀번호(8자 이상)',
}
PasswordInputStory.storyName='비밀번호 입력';

export const PasswordInputStory2 = Template.bind({});
PasswordInputStory2.args = {
    label: '비밀번호 확인',
}
PasswordInputStory2.storyName='비밀번호 확인';

