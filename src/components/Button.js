var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import constants from '../constants';
export default function Button(_a) {
    var { theme = 'primary', children, disabled } = _a, props = __rest(_a, ["theme", "children", "disabled"]);
    return (<TouchableOpacity {...props} disabled={disabled} style={[
            styles.general,
            styles[theme],
            props.style,
            disabled && styles.disabled
        ]}>
      {children}
    </TouchableOpacity>);
}
const styles = StyleSheet.create({
    general: {
        borderRadius: 12,
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    primary: {
        backgroundColor: constants.primaryColor,
        borderWidth: 1,
        borderColor: constants.primaryColor,
        gap: 5,
        color: 'white'
    },
    secondary: {
        backgroundColor: 'transparent',
        gap: 5,
        borderColor: '#151628',
        borderWidth: 1,
        color: '#192344'
    },
    whiteRed: {
        backgroundColor: '#FCFCFD',
        gap: 5,
        borderColor: '#E00',
        borderWidth: 1,
        color: '#E00'
    },
    transparent: {
        backgroundColor: 'transparent',
        gap: 5,
        color: '#195AFE'
    },
    disabled: {
        opacity: 0.5
    }
});
//# sourceMappingURL=Button.js.map