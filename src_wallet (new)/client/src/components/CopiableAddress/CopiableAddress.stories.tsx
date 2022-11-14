import {CopiableAddress} from './CopiableAddress';
import {DefaultLayout} from "../../layouts";

import type {ComponentMeta, ComponentStory} from "@storybook/react";

const ADDRESS = '0x81b6C7EF567954A221bfb7adBe63fD1b44A68Bb4';

export default {
    title: 'Components/CopiableAddress',
    component: CopiableAddress,
} as ComponentMeta<typeof CopiableAddress>;

const Template: ComponentStory<typeof CopiableAddress> = (args) => {
    return (
        <DefaultLayout>
            <CopiableAddress {...args} />
        </DefaultLayout>
    );
}

export const CopiableAddressStory = Template.bind({});
CopiableAddressStory.args = {
    address: ADDRESS,
}
CopiableAddressStory.storyName='복사 가능한 주소 컴포넌트';
