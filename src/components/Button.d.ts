import React from 'react';
import { TouchableOpacity } from 'react-native';
export default function Button({ theme, children, disabled, ...props }: {
    theme?: 'primary' | 'secondary' | 'whiteRed' | 'transparent';
    disabled?: boolean;
    children: React.ReactNode;
} & React.ComponentProps<typeof TouchableOpacity>): JSX.Element;
