import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import useAxios from 'src/utils/useAxios'
import { CBadge } from '@coreui/react'
import selectedmodule from 'src/menu/superadminsetting/ristrictmodule'
export const AppSidebarNav = ({ items }) => {
  let [modules, setModules] = useState([])

  const api = useAxios()
  const location = useLocation()
 
  useEffect(() => {
    getTopic()
  }, [])

  let getTopic = async () => {
    let response = await api.get('saas/get_tenant_module_wise/')
    let response1 = await api.get('saas/get_module_all/')
    if (response.data.success === 1) {
      // console.log(response.data.result + 'response appsidebarnave')
      let data = []
      let a = response.data.result
      for (let i = 0; i < response.data.result.module_type_id.length; i++) {
        for (let j = 0; j < response1.data.result.length; j++) {
          if (a.module_type_id[i] == response1.data.result[j].id) {
            data.push(response1.data.result[j].module)
          }
        }
        // data.push(a.module_type_id[i])
        // santosh.push(a.module_type_id[i])
        // console.log(a.module_type_id[i])
      }
      // console.log(response.data.result.module_type_id[0])
      // a.module_type_id.map((item)=>
      // // if(item=='1'){}
      // data.push(item))
      // for(let i=0;i<response.data.result.length;i++)
      // {

      // }
      // console.log(data + 'santosh chech data array')
      setModules(data)
      // santosh.concat(data)
      // console.log(santosh + 'module id in apppsidebarNave' + santosh.length)
    }
  }

  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    )
  }
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {/* {item.items?.map((item, index) =>
       
          // (item.name !='Reports') ?(item.items ? navGroup(item, index) : navItem(item, index)):
          // (modules.includes(item.name)?(item.items ? navGroup(item, index) : navItem(item, index)):'')
          // ,
           
          modules.includes(item.name)?(item.items ? navGroup(item, index) : navItem(item, index)):''

          // item.items ? navGroup(item, index) : navItem(item, index)

        )} */}

        {item.name == 'Reports'
          ? item.items?.map((item, index) =>
              modules.includes(item.name)
                ? item.items
                  ? navGroup(item, index)
                  : navItem(item, index)
                : '',
            )
          : item.items?.map((item, index) =>
              item.items ? navGroup(item, index) : navItem(item, index),
            )}
      </Component>
    )
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
