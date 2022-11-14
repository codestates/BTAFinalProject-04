import {MnemonicInput} from './MnemonicInput';
import {DefaultLayout} from "../../layouts";
import {copyToClipboard} from "../../utils";

import type {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    title: 'Components/MnemonicInput',
    component: MnemonicInput,
} as ComponentMeta<typeof MnemonicInput>;

const SEED_EXAMPLE = [
    'apple',
    'header',
    'shoulder',
    'something',
    'exactly',
    'thunderbolt',
    'wherever',
    'striker',
    'goalkeeper',
    'nothing',
    'always',
    'sometimes',
].join(' ');

const Template: ComponentStory<typeof MnemonicInput> = (args) => {
    return (
        <DefaultLayout>
            <MnemonicInput {...args} />
        </DefaultLayout>
    );
}

export const MnemonicInputStory = Template.bind({});
MnemonicInputStory.args = {
    label: 'seed phrase',
    value: SEED_EXAMPLE,
    onCopyText: () => {
        copyToClipboard(SEED_EXAMPLE).then(() => {
            alert('copied');
        })
    },
}
MnemonicInputStory.storyName='복사기능 O';


export const MnemonicInputStory2 = Template.bind({});
MnemonicInputStory2.args = {
    label: 'seed phrase',
    onCopyText: null,
}
MnemonicInputStory2.storyName='복사기능 X';
