"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[8448],{98448:(e,s,a)=>{a.r(s),a.d(s,{default:()=>c});var t=a(9950),l=a(49911),i=a(1072),r=a(44885),d=a(44414);const c=()=>{var e,s,a,c,m;let n=(0,i.A)(),[u,o]=(0,t.useState)([]);const[h,x]=(0,t.useState)(!1),{selectedColor:j}=(0,r.useColor)();(0,t.useEffect)((()=>{_()}),[]);let _=async()=>{let e=await n.get("/api/customemail/");if(1===e.data.success)o(e.data.result);else if(0===e.data.success)for(let s=0;s<Object.values(e.data.result).length;s++){let a=Object.values(e.data.result)[s];alert(a)}};return(0,d.jsx)(d.Fragment,{children:(0,d.jsx)(l.sK,{sm:12,className:"mb-4",children:(0,d.jsx)(l.UF,{className:"d-grid gap-2 mt-2 d-md-flex justify-content-md-center",children:(0,d.jsx)(l.E$,{className:"smtpcard region shadow bg-body rounded mt-4 mx-auto",children:(0,d.jsxs)(l.qI,{onSubmit:u[0]?async e=>{e.preventDefault();if(!0===e.currentTarget.checkValidity()){const s=new FormData(e.target);s.append("use_tls",!0);let a=await n.put("/api/customemail/",s);if(1===a.data.success)alert("SMTP Setting is updated"),_();else if(0===a.data.success)for(let e=0;e<Object.values(a.data.result).length;e++){let s=Object.values(a.data.result)[e];alert(s)}}x(!0)}:async e=>{e.preventDefault();if(!0===e.currentTarget.checkValidity()){const s=new FormData(e.target);s.append("email_use_tls",!0);let a=await n.post("/api/customemail/",s);if(1===a.data.success)alert("SMTP Setting is created"),_();else if(0===a.data.success)for(let e=0;e<Object.values(a.data.result).length;e++){let s=Object.values(a.data.result)[e];alert(s)}}x(!0)},noValidate:!0,validated:h,children:[(0,d.jsx)(l.V0,{className:"mb-4",children:(0,d.jsx)(l.sK,{children:(0,d.jsx)(l.UF,{className:"d-grid  d-md-flex justify-content-md-center",children:(0,d.jsx)("h3",{children:"SMTP Setting"})})})}),(0,d.jsxs)(l.W6,{className:"mx-4",children:[(0,d.jsxs)(l.sK,{className:"mb-4",children:[(0,d.jsx)(l.UF,{sm:4,children:"Default From Email"}),(0,d.jsx)(l.UF,{sm:8,children:(0,d.jsx)(l.OG,{type:"text",id:"default_from_email",name:"default_from_email",defaultValue:null===(e=u[0])||void 0===e?void 0:e.default_from_email,required:!0})})]}),(0,d.jsxs)(l.sK,{className:"mb-4",children:[(0,d.jsx)(l.UF,{sm:4,children:"Email Host"}),(0,d.jsx)(l.UF,{sm:8,children:(0,d.jsx)(l.OG,{type:"text",id:"email_host",defaultValue:null===(s=u[0])||void 0===s?void 0:s.email_host,name:"email_host",required:!0})})]}),(0,d.jsxs)(l.sK,{className:"mb-4",children:[(0,d.jsx)(l.UF,{sm:4,children:"Email Host Username"}),(0,d.jsx)(l.UF,{sm:8,children:(0,d.jsx)(l.OG,{type:"text",id:"email_host_user",name:"email_host_user",defaultValue:null===(a=u[0])||void 0===a?void 0:a.email_authentication_user_name,required:!0})})]}),(0,d.jsxs)(l.sK,{className:"mb-4",children:[(0,d.jsx)(l.UF,{sm:4,children:"Email Host Password"}),(0,d.jsx)(l.UF,{sm:8,children:(0,d.jsx)(l.OG,{type:"text",id:"email_host_password",name:"email_host_password",defaultValue:null===(c=u[0])||void 0===c?void 0:c.email_authentication_password,required:!0})})]}),(0,d.jsxs)(l.sK,{className:"mb-2",children:[(0,d.jsx)(l.UF,{sm:4,children:"Email Port"}),(0,d.jsx)(l.UF,{sm:8,children:(0,d.jsx)(l.OG,{id:"email_port",name:"email_port",defaultValue:null===(m=u[0])||void 0===m?void 0:m.email_port,required:!0})})]})]}),(0,d.jsx)(l.XW,{className:"mt-4 bg-white",children:(0,d.jsx)(l.sK,{className:"",children:(0,d.jsx)(l.UF,{className:"d-grid gap-2 d-md-flex justify-content-md-center",children:(0,d.jsx)(l.Q_,{className:"mt-2 mx-auto",type:"submit",style:{backgroundColor:j,color:"white",border:"none"},children:"\xa0\xa0 \xa0\xa0Save\xa0\xa0 \xa0\xa0"})})})})]})})})})})}}}]);