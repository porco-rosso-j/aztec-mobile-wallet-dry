import React from 'react';
import { TouchableOpacity } from 'react-native';
export default function IconButton({ icon, theme, disabled, ...props }: {
    icon: any;
    theme?: 'main' | 'secondary';
    disabled?: boolean;
} & React.ComponentProps<typeof TouchableOpacity>): JSX.Element;
