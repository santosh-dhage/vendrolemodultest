"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[1767],{81767:(e,t,a)=>{a.r(t),a.d(t,{default:()=>d});var s=a(9950),l=a(1072),r=a(28429),o=a(37017),c=a(44885),i=a(45532),n=a(44414);const d=function(){(0,r.Zp)();let e=(0,l.A)(),{id:t}=(0,r.g)();const{user:a,authTokens:d}=(0,s.useContext)(i.A);let[m,u]=(0,s.useState)([]);const{selectedColor:p}=(0,c.useColor)(),_=(0,r.Zp)();(0,s.useEffect)((()=>{b()}),[]);let b=async()=>{let a=await e.get("api/get_user_list/".concat(t,"/"));if(1===a.data.success){let e=[];for(let t=0;t<a.data.result.length;t++){let s=a.data.result[t],l={id:s.id,name:s.name,email:s.email,mobile_no:s.mobile_no,address1:s.address1,address2:s.address2,pincode:s.pincode,country:s.country,landmark:s.landmark,state:s.state,created_at:s.created_at,role:s.role,created_by:s.created_by,is_active:!0===s.is_active?"Active":"Inactive"};e.sort(((e,t)=>new Date(t.created_at)-new Date(e.created_at))),e.push(l)}u(e)}else if(0===a.data.success)for(let e=0;e<Object.values(a.data.result).length;e++){let t=Object.values(a.data.result)[e];alert(t)}};const g=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date;const t=new Date(e),a=String(t.getDate()).padStart(2,"0"),s=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()],l=t.getFullYear(),r=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return"".concat(a," - ").concat(s," - ").concat(l," ").concat(r,":").concat(o)};return(0,n.jsxs)(n.Fragment,{children:[" ",(0,n.jsx)("div",{className:"d-flex justify-content-start",children:(0,n.jsx)(o.Q_,{style:{backgroundColor:p},onClick:()=>_(-1),children:"Back"})}),(0,n.jsxs)("div",{className:"mb-3",children:[(0,n.jsx)("div",{className:"d-flex justify-content-between align-items-center mb-1",children:(0,n.jsx)("h3",{className:"mb-4",style:{color:"#2C384A"},children:"Customer Users"})}),(0,n.jsx)(o.sK,{children:(0,n.jsx)(o.UF,{xs:12,children:(0,n.jsx)(o.Pd,{activePage:1,clickableRows:!0,columns:[{key:"sr_no",label:"Sr No.",sorter:!1,_props:{color:"secondary",className:"fw-semibold"}},{label:"Name",key:"name",_props:{color:"secondary",className:"fw-semibold"},_style:{minWidth:"100px"},sorter:!1},{label:"Email",key:"email",_props:{color:"secondary",className:"fw-semibold"},_style:{minWidth:"100px"},sorter:!1},{label:"Created Date",key:"created_at",_props:{color:"secondary",className:"fw-semibold"},_style:{minWidth:"120px"},sorter:!1},{lable:"Mobile No",key:"mobile_no",_props:{color:"secondary",className:"fw-semibold"},_style:{minWidth:"80px"},sorter:!1},{label:"Status",key:"is_active",sorter:!1,_props:{color:"secondary",className:"fw-semibold"},_style:{minWidth:"60px"}}],columnSorter:!0,items:m,itemsPerPageSelect:!0,itemsPerPage:10,pagination:!0,scopedColumns:{sr_no:(e,t)=>(0,n.jsx)("td",{children:t+1}),created_at:e=>(0,n.jsx)("td",{children:g(e.created_at)})},itemsPerPageOptions:[10,20,50,100],tableFilter:!0,tableProps:{color:"success-color-secondary",hover:!0,border:"1.5px solid #074",responsive:!0},tableHeadProps:{color:"light",align:"middle",className:"align-middle"},tableBodyProps:{align:"middle",className:"align-middle"},tableFilterLabel:"Search : ",tableFilterPlaceholder:"Enter String to Search",itemsPerPageLabel:"Rows per page:"})})})]})]})}}}]);