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
import { TouchableOpacity } from 'react-native';
export default function IconButton(_a) {
    var { icon, theme = 'main', disabled } = _a, props = __rest(_a, ["icon", "theme", "disabled"]);
    return (<TouchableOpacity {...props} disabled={disabled} style={Object.assign({ width: 50, height: 50, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: theme === 'main' ? 'white' : '#ffffffaa' }, props.style)}>
      {icon}
    </TouchableOpacity>);
}
//# sourceMappingURL=IconButton.js.map