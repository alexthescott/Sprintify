import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { cacheToken } from '../services/spotify/auth'


function Callback() {
    const navigate = useNavigate()
    const receivedToken = useRef(false)

    useEffect(() => {
        if (receivedToken.current) return
        receivedToken.current = true
        cacheToken(window.location.href)
        navigate("/login")
    }, [navigate])

    return (
        <h1>Testing token</h1>
    )
}

export default Callback