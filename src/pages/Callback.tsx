import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { cacheToken } from '../services/spotify/auth'
import { getRedirect } from '../services/redirect'


function Callback() {
    const navigate = useNavigate()
    const receivedToken = useRef(false)

    useEffect(() => {
        if (receivedToken.current) return
        receivedToken.current = true

        try {
            cacheToken(window.location.href)
        } catch {
            navigate("/login")
        }

        navigate(getRedirect() || "/login")
    }, [navigate])

    return (
        <h1>Parsing your token</h1>
    )
}

export default Callback