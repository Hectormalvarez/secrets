import React from 'react'
import { useParams } from 'react-router-dom'

const SecretCreated = () => {
    const params = useParams()

  return (
    <div>{params.secretID}</div>
  )
}

export default SecretCreated