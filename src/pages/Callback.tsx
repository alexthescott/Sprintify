import React, { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

import { cacheToken } from "../utils/cache"
import { getCurrentUser } from "../services/spotify/api"
import { cacheCurrentUser, getRedirect, cleanCacheForLogout } from "../utils/cache"

function Callback() {
  const navigate = useNavigate()
  const receivedToken = useRef(false)

  useEffect(() => {
    if (receivedToken.current) return
    receivedToken.current = true

    try {
      cacheToken(window.location.href)
    } catch {
      cleanCacheForLogout()
      navigate("/login")
      return
    }

    getCurrentUser()
      .result.then((res) => {
        cacheCurrentUser(res)
      })
      .catch(() => {
        navigate("/login")
      })
      .finally(() => {
        navigate(getRedirect() || "/login")
      })
  }, [navigate])

  return <h1>Parsing your token</h1>
}

export default Callback
