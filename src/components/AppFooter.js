import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  let year=new Date().getFullYear() 
  return (
    <CFooter>
      <div>        
        <span className="ms-1">&copy; {year} iVendMSoft V0.1</span>
      </div>
      {/*  */}
      <div className="ms-auto">
        <span className="me-1">Designed & Developed by</span>
        <a href="https://www.indeftts.com" target="_blank" rel="noopener noreferrer">  
        InDeft Technology Solutions Pvt. Ltd. 
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
