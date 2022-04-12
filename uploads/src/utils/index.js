import React, {useEffect, useState} from 'react';
export function isLogin() {
    return !!window.localStorage.getItem('token');
}
