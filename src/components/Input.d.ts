import React from 'react';
import { TextInput } from 'react-native';
export default function Input({ style, ...props }: React.ComponentProps<typeof TextInput> & {
    style?: any;
}): React.JSX.Element;
