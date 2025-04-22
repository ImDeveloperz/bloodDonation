import React from 'react'

const WhiteLogo = () => {
  return (
    <img onClick={()=>{
        window.location.href = "/"
    }} src="/logoDark.png" alt="LifeLinkAi logo" className=" cursor-pointer h-16 w-56 relative z-10" />
  )
}

export default WhiteLogo