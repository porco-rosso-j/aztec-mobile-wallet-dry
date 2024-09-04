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
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TextInput } from 'react-native';
export default function Input(_a) {
    var { style } = _a, props = __rest(_a, ["style"]);
    return (<TextInput {...props} style={Object.assign({ backgroundColor: '#FCFCFD', borderColor: '#E3EAFD', borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 12, color: '#151628' }, style)}/>);
}
//# sourceMappingURL=Input.js.map