"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[7001],{27001:(e,t,n)=>{n.r(t),n.d(t,{default:()=>_});var a=n(9950),o=n(1072),s=n(37017),l=n(44885),r=n(45532),c=n(7864),i=n(76058),d=(n(46411),n(59019),n(60764),n(4434),n(55271),n(74297)),u=n(95652),m=n(44414);const p=(0,d.A)();const _=function(){let e=(0,o.A)();const t=(0,u.A)(),{user:n,authTokens:d}=(0,a.useContext)(r.A);let[_,w]=(0,a.useState)([]),[h,D]=(0,a.useState)(F(new Date((new Date).setDate((new Date).getDate()-1)))),[g,y]=(0,a.useState)(F(new Date((new Date).setDate((new Date).getDate())))),[x,b]=(0,a.useState)(0),[f,v]=(0,a.useState)(0),[j,I]=(0,a.useState)(0),[k,P]=(0,a.useState)(0),[S,C]=(0,a.useState)(0),[q,N]=(0,a.useState)(0);const{selectedColor:A}=(0,l.useColor)();(0,a.useEffect)((()=>{M()}),[]);let M=async()=>{let t=await e.get("get_customer_user_payment_api_view/");if(console.log(t),1===t.data.success){let e=[],n=0,a=0,o=0,s=0,l=0,r=0;for(let c=0;c<t.data.result.length;c++){let i=t.data.result[c];console.log(i);let d={machine_id:i.machine_id,coin_count:parseInt(i.coin_mode_counts)+"/"+10*parseInt(i.coin_mode_counts),qr_pay_count:parseInt(i.qr_mode_counts)+"/"+10*parseInt(i.qr_mode_counts),total_amount:parseInt(i.coin_mode_counts,10)+parseInt(i.qr_mode_counts,10)+"/"+10*(parseInt(i.coin_mode_counts,10)+parseInt(i.qr_mode_counts,10))};e.sort(((e,t)=>new Date(t.created_at)-new Date(e.created_at))),n+=parseInt(d.coin_count.split("/")[0]),a+=parseInt(d.coin_count.split("/")[1]),o+=parseInt(d.qr_pay_count.split("/")[0]),s+=parseInt(d.qr_pay_count.split("/")[1]),l+=parseInt(d.total_amount.split("/")[0]),r+=parseInt(d.total_amount.split("/")[1]),e.push(d)}w([]),b(n),v(a),I(o),P(s),C(l),N(r),w(e)}else if(0===t.data.success)for(let e=0;e<Object.values(t.data.result).length;e++){let n=Object.values(t.data.result)[e];alert(n)}};const R=e=>{if(null==e)return"          ";const t=new Date(e),n=String(t.getDate()).padStart(2,"0"),a=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()],o=t.getFullYear(),s=String(t.getHours()).padStart(2,"0"),l=String(t.getMinutes()).padStart(2,"0");return"".concat(n," - ").concat(a," - ").concat(o," ").concat(s,":").concat(l)},E=(new Date,new Date,new Date((new Date).setDate((new Date).getDate()-1)),new Date((new Date).setDate((new Date).getDate()-1)),new Date((new Date).setDate((new Date).getDate()-6)),new Date(new Date),new Date((new Date).setDate((new Date).getDate()-29)),new Date(new Date),new Date((new Date).setDate(1)),new Date((new Date).getFullYear(),(new Date).getMonth()+1,0),new Date((new Date).getFullYear(),(new Date).getMonth()-1,1),new Date((new Date).getFullYear(),(new Date).getMonth(),0),{today:F(new Date)+"="+F(new Date),yesterday:F(new Date((new Date).setDate((new Date).getDate()-1)))+"="+F(new Date((new Date).setDate((new Date).getDate()-1))),week:F(new Date((new Date).setDate((new Date).getDate()-6)))+"="+F(new Date(new Date)),month:F(new Date((new Date).setDate((new Date).getDate()-29)))+"="+F(new Date(new Date)),quarterly:F(new Date((new Date).setDate((new Date).getDate()-90)))+"="+F(new Date(new Date)),yearly:F(new Date((new Date).setDate((new Date).getDate()-365)))+"="+F(new Date(new Date))});function F(e){if(null!=e){var t=new Date(e),n=""+(t.getMonth()+1),a=""+t.getDate(),o=t.getFullYear();return n.length<2&&(n="0"+n),a.length<2&&(a="0"+a),[o,n,a].join("-")}}return(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)("div",{className:"mb-3",children:[(0,m.jsxs)("div",{className:"d-flex justify-content-between align-items-center mb-2",children:[(0,m.jsx)("div",{children:(0,m.jsx)("h3",{className:"mb-0",style:{color:"#2C384A"},children:"Machine Payment Report"})})," ",(0,m.jsx)("div",{})]}),(0,m.jsxs)("div",{className:"input-group mt-2 mb-2",children:[(0,m.jsx)("div",{children:(0,m.jsxs)("select",{id:"datetodate1",onChange:async t=>{var n=document.getElementById("datetodate1").selectedIndex;var a=document.getElementById("datetodate1").options[n].value.toString();D(a.split("=")[0]),y(a.split("=")[1]);let o=await e.post("/machine/post_customer_role_user_payment_report_excel/",{from:F(a.split("=")[0]),to:F(a.split("=")[1])});if(1===o.data.success){let e=[];for(let t=0;t<o.data.result.length;t++){let n=o.data.result[t];console.log(n);let a={machine_id:null===n||void 0===n?void 0:n.machine_id,coin_count:parseInt(null===n||void 0===n?void 0:n.coin_mode_counts)+"/"+10*parseInt(null===n||void 0===n?void 0:n.coin_mode_counts),qr_pay_count:parseInt(n.qr_mode_counts)+"/"+10*parseInt(n.qr_mode_counts),total_amount:parseInt(n.coin_mode_counts,10)+parseInt(n.qr_mode_counts,10)+"/"+10*(parseInt(n.coin_mode_counts,10)+parseInt(n.qr_mode_counts,10))};e.sort(((e,t)=>new Date(t.created_at)-new Date(e.created_at))),e.push(a)}w([]),w(e)}else 0===o.data.success&&(w([]),alert(o.data.message))},style:{width:"150px",height:"25px"},children:[(0,m.jsxs)("option",{value:E.today,children:[" ","\xa0 \xa0\xa0 Today \xa0 \xa0\xa0"," "]}),(0,m.jsxs)("option",{value:E.yesterday,selected:!0,children:[" ","\xa0 \xa0\xa0 Yesterday \xa0 \xa0\xa0"," "]}),(0,m.jsxs)("option",{value:E.week,children:[" ","\xa0 \xa0\xa0Weekly \xa0 \xa0\xa0"," "]}),(0,m.jsxs)("option",{value:E.month,children:[" ","\xa0 \xa0\xa0Monthly \xa0 \xa0\xa0"," "]}),(0,m.jsxs)("option",{value:E.quarterly,children:[" ","\xa0\xa0\xa0Quarterly \xa0 \xa0\xa0"," "]}),(0,m.jsxs)("option",{value:E.yearly,children:[" ","\xa0\xa0\xa0Yearly \xa0 \xa0\xa0"," "]})]})}),"\xa0 \xa0 \xa0"," ",(0,m.jsxs)("div",{children:[" ",(0,m.jsxs)(s.Q_,{onClick:function(){const e="".concat(p,"/machine/customer_role_payment_report_excel_download/?from_date=").concat(F(h),"&to_date=").concat(F(g)),n=new Headers({"x-api-key":t,Authorization:"Bearer ".concat(null===d||void 0===d?void 0:d.access)});console.log(null===d||void 0===d?void 0:d.access,"santosh");const a=new Request(e,{method:"GET",headers:n});fetch(a).then((e=>{if(e.ok)return console.log(e),e.blob();console.error("Request failed:",e.statusText)})).then((e=>{const t=window.URL.createObjectURL(e),n=document.createElement("a");n.style.display="none",n.href=t,n.download="Payment_Report"+F(new Date)+".xlsx",document.body.appendChild(n),n.click(),window.URL.revokeObjectURL(t)})).catch((e=>{console.error("Network error:",e)}))},type:"button",className:"btn btn-default btn-sm ",style:{backgroundColor:A,color:"white"},children:["Export Excel",(0,m.jsx)(c.A,{icon:i.n,style:{color:"White"},size:"sm"})]})," ",(0,m.jsxs)(s.Q_,{onClick:function(){var e="";e='<h2 style="font-size: 16px; text-align: center; color:red">Machine Payment Report</h2>'+'<p style="font-size: 12px; text-align: center;">'.concat(h," to ").concat(g,"</p> ")+"</br>Organization name :".concat("INDEFT Technology","</br>")+'<div class="justify-content: center"><table border="1" style="border-bottom: 1px solid #ddd; border-collapse: collapse; font-size: 14px;text-align: center; align: center; border-color: #96D4D4;"><tr><th style="font-weight: bold;width:5%;text-align: center;">Sr.No.</th><th style="font-weight: bold;width:19%;text-align: center;">Machine ID</th><th style="font-weight: bold;width:19%;text-align: center;">Coin Payment Count / Amount</th><th style="font-weight: bold;width:19%;text-align: center;">QR Payment Count / Amount</th><th style="font-weight: bold;width:19%;text-align: center;">Total Payments / Amount</th></tr>',_.map(((t,n)=>e+='<tr> \n          <td style="text-align: center;">'.concat(n+1,'</td>\n          <td style="text-align: center;">').concat(t.machine_id,'</td>\n          <td style="text-align: center;">').concat(t.coin_count,'</td>\n          <td style="text-align: center;">').concat(t.qr_pay_count,'</td>\n          <td style="text-align: center;">').concat(t.total_amount,"</td>\n          \n      </tr>"))),e=(e+="</table></div>").replace(/<th/g,'<th align="left" ').replace(/<td/g,'<td align="left" ');var t=window.open("","","height=400,width=800");t.document.write(e),t.document.close(),setTimeout((function(){t.print()}),10)},type:"button",className:"btn btn-default btn-sm ",style:{backgroundColor:A,color:"white"},children:["Export pdf ",(0,m.jsx)(c.A,{icon:i.n,style:{color:"White"},size:"sm"})]})," "]})]}),(0,m.jsx)("div",{children:(0,m.jsx)(s.sK,{xm:{cols:12},children:(0,m.jsx)(s.UF,{xs:12,children:(0,m.jsx)(s.Pd,{activePage:1,clickableRows:!0,columns:[{key:"sr_no",label:"Sr. No.",sorter:!1,_props:{color:"secondary",className:"fw-semibold"},_style:{minWidth:"75px"}},{label:"Machine ID",key:"machine_id",sorter:!1,_props:{color:"secondary",className:"fw-semibold"},_style:{minWidth:"130px"}},{label:"Coin Payment Count / Amount",key:"coin_count",sorter:!1,_props:{color:"secondary",className:"fw-semibold",align:"middle"},_style:{minWidth:"180px"}},{label:"QR Payment Count / Amount",key:"qr_pay_count",sorter:!1,_props:{color:"secondary",className:"fw-semibold",align:"middle"},_style:{minWidth:"180px"}},{label:"Total payments / Amount",key:"total_amount",sorter:!1,_props:{color:"secondary",className:"fw-semibold"},_style:{minWidth:"130px"}}],columnSorter:!0,items:_,itemsPerPageSelect:!0,itemsPerPage:10,pagination:!0,scopedColumns:{sr_no:(e,t)=>(0,m.jsx)("td",{children:t+1}),created_at:e=>(0,m.jsx)("td",{children:R(e.created_at)})},itemsPerPageOptions:[10,20,50,100],tableProps:{color:"success-color-secondary",hover:!0,border:"1.5px solid #074",responsive:!0},tableHeadProps:{color:"light",align:"middle",className:"align-middle"},tableBodyProps:{align:"middle",className:"align-middle"},itemsPerPageLabel:"Rows per page:"})})})})]})})}},76058:(e,t,n)=>{n.d(t,{n:()=>a});const a=["512 512","<polygon fill='var(--ci-primary-color, currentColor)' points='367.997 338.75 271.999 434.747 271.999 17.503 239.999 17.503 239.999 434.745 144.003 338.75 121.376 361.377 256 496 390.624 361.377 367.997 338.75' class='ci-primary'/>"]}}]);