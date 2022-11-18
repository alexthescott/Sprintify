import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { cacheToken } from '../services/spotify'


function Callback() {
    cacheToken(window.location.href)

    return (
        <Navigate to="/login" />
    )
}

export default Callback