"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[5392],{5392:(e,t,a)=>{a.r(t),a.d(t,{default:()=>d});var s=a(9950),c=a(1072),l=a(28429),r=a(37017),o=a(45532),n=(a(79988),a(7864),a(44414));const d=function(){(0,l.Zp)();let e=(0,c.A)(),{id:t}=(0,l.g)();const{user:a,authTokens:d}=(0,s.useContext)(o.A);let[i,u]=(0,s.useState)([]),[m,p]=(0,s.useState)([]),[_,b]=(0,s.useState)();const[g,h]=(0,s.useState)(!1),[y,f]=(0,s.useState)(!1),[S,k]=(0,s.useState)(!1),[x,j]=(0,s.useState)([]),[N,w]=(0,s.useState)(!1);(0,s.useEffect)((()=>{C()}),[]);let C=async()=>{let a=await e.get("/api/mstatusbymachineid/".concat(t,"/"));if(1===a.data.success){let e=[];for(let t=0;t<a.data.result.length;t++){let s=a.data.result[t],c={id:s.id,M_Id:s.M_Id,Stock:s.Stock,Capacity:s.Capacity,Mode:s.Mode,created_at:s.created_at};e.push(c)}u(e)}else if(0===a.data.success)for(let e=0;e<Object.values(a.data.result).length;e++){let t=Object.values(a.data.result)[e];alert(t)}};const v=(0,l.Zp)(),M=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date;const t=new Date(e),a=String(t.getDate()).padStart(2,"0"),s=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()],c=t.getFullYear(),l=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return"".concat(a," - ").concat(s," - ").concat(c," ").concat(l,":").concat(r)};return M(),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:"mt-2 mb-1 d-flex justify-content-start",children:(0,n.jsx)(r.Q_,{style:{backgroundColor:"#3c4b64"},onClick:()=>v(-1),children:"Back"})}),(0,n.jsxs)("div",{className:"mb-3",children:[(0,n.jsx)("div",{className:"d-flex justify-content-between align-items-center mb-2",children:(0,n.jsxs)("h3",{className:"mb-0",style:{color:"#2C384A"},children:["Payment Details - ",t]})}),(0,n.jsx)(r.sK,{children:(0,n.jsx)(r.UF,{xs:12,children:(0,n.jsx)(r.Pd,{activePage:1,clickableRows:!0,columns:[{key:"sr_no",label:"Sr No.",sorter:!1,_props:{color:"secondary",className:"fw-semibold"}},{label:"Machine ID",key:"M_Id",sorter:!1,_props:{color:"secondary",className:"fw-semibold"}},{label:"Capacity",key:"Capacity",sorter:!1,_props:{color:"secondary",className:"fw-semibold"}},{label:"Stock",key:"Stock",sorter:!1,_props:{color:"secondary",className:"fw-semibold"}},{label:"Created at",key:"created_at",sorter:!1,_props:{color:"secondary",className:"fw-semibold"}}],columnSorter:!0,items:i,itemsPerPageSelect:!0,itemsPerPage:10,pagination:!0,scopedColumns:{sr_no:(e,t)=>(0,n.jsx)("td",{children:t+1}),created_at:e=>(0,n.jsx)("td",{children:M(e.created_at)})},tableProps:{color:"success-color-secondary",hover:!0,border:"1.5px solid #074",responsive:!0},tableHeadProps:{color:"light",align:"middle",className:"align-middle"},tableBodyProps:{align:"middle",className:"align-middle"},sorterValue:{column:"created_at",state:"desc"}})})})]})]})}}}]);