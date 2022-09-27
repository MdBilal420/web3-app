
import React from 'react'
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
        <button onClick={()=>navigate("/stats")}>Go To Stats</button>
    </div>
  )
}

export default Dashboard