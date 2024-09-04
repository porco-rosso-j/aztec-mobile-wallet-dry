import React from 'react';
export default function MainLayout({ children, statusBarStyle, statusBarBackgroundColor, canGoBack }: {
    children: React.ReactNode;
    statusBarStyle?: 'light-content' | 'dark-content';
    statusBarBackgroundColor?: string;
    canGoBack?: boolean;
}): JSX.Element;
