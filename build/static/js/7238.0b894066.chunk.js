(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[7238],{7238:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>v});var n=a(9950),r=a(1072),l=a(28429),o=a(37017),i=a(42074),s=a(45532),c=a(79988),d=a(7864),u=a(74297),p=a(27760),h=a(76058),m=a(84257),f=a(44885),y=(a(46411),a(44414));const v=function(){(0,l.Zp)();let e=(0,r.A)();const{user:t,authTokens:a}=(0,n.useContext)(s.A);let[v,b]=(0,n.useState)([]),[j,x]=(0,n.useState)([]),[_,g]=(0,n.useState)([]),[w,k]=(0,n.useState)([]),[C,F]=(0,n.useState)([]),[O,P]=(0,n.useState)([]),[S,A]=(0,n.useState)([]),[M,N]=(0,n.useState)();const[T,D]=(0,n.useState)(!1),[U,R]=(0,n.useState)(!1),[q,L]=(0,n.useState)(!1),[I,E]=(0,n.useState)(!1),[V,Q]=(0,n.useState)(!1),[W,B]=(0,n.useState)([]),[K,z]=(0,n.useState)(!1),{selectedColor:G}=(0,f.useColor)();let[Z,H]=(0,n.useState)([]),[J,Y]=(0,n.useState)([]),[$,X]=(0,n.useState)(),ee=(0,u.A)();(0,n.useEffect)((()=>{te()}),[]);let te=async()=>{let t=await e.get("/machine/api/get_machine_and_qrcode/");if(1===t.data.success){let e=[];for(let a=0;a<t.data.result.length;a++){let n=t.data.result[a];e.push(n.machine_id)}x(e)}else if(0===t.data.success)for(let e=0;e<Object.values(t.data.result).length;e++){let a=Object.values(t.data.result)[e];alert(a)}};(0,n.useEffect)((()=>{ae()}),[]);let ae=async()=>{let t=await e.get("/machine/api/get_machine_and_qrcode/"),a=await e.get("/machine/api/get_unused_qrcode/"),n=await e.get("/machine/get_product_list/"),r=await e.get("/machine/modelcapacity/");if(1===t.data.success&&1===a.data.success){let e=[];for(let a=0;a<t.data.result.length;a++){let n=t.data.result[a],r={id:n.id,machine_id:n.machine_id,rqcode:n.rqcode,created_at:n.created_at,qr_code_img:n.qr_code_img,product_type:n.product_type,amount:n.amount,model_no:n.model_no,name:n.name,installation_location:n.location,payment_type:n.payment_type,machinelease:n.machinelease,status:!0===n.is_active?"Active":"Inactive"};e.push(r)}let l=[];for(let t=0;t<a.data.result.length;t++){let e=a.data.result[t];if(1==e.is_active){let t={label:e.qr_code_id,value:e.id};l.push(t)}}let o=[];for(let t=0;t<n.data.result.length;t++){let e=n.data.result[t],a={label:e.product_type,value:e.id,amount:e.amount};o.push(a)}let i=[];for(let t=0;t<r.data.result.length;t++){let e=r.data.result[t],a={value:e.id,label:e.model_no,name:e.name};i.push(a)}b(e),g(l),k(o),F(i)}else if(0===t.data.success)for(let e=0;e<Object.values(t.data.result).length;e++){let a=Object.values(t.data.result)[e];alert(a)}};const ne=async e=>{let t=[];null===v||void 0===v||v.map((a=>{a.rqcode==e.rqcode&&t.push(e.rqcode)})),null===_||void 0===_||_.map((a=>{a.label!=e.rqcode&&t.push(a.label)}));let a=[];null===w||void 0===w||w.map((t=>{t.value==e.payment_type&&a.push(t)})),null===w||void 0===w||w.map((t=>{t.value!=e.payment_type&&a.push(t)})),H(t),Y(a)},re=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date;const t=new Date(e),a=String(t.getDate()).padStart(2,"0"),n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()],r=t.getFullYear(),l=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return"".concat(a," - ").concat(n," - ").concat(r," ").concat(l,":").concat(o)};return re(),(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)("div",{className:"mb-3",children:[(0,y.jsxs)("div",{className:"d-flex justify-content-between align-items-center mb-2",children:[(0,y.jsx)("h3",{className:"mb-0",style:{color:"#2C384A"},children:"Machine Master"})," ",(0,y.jsx)(o.Q_,{onClick:()=>{R(!U)},className:"mt-2",style:{backgroundColor:G,color:"white",border:"0px "},children:"Add New"})]}),(0,y.jsx)("div",{className:"row mt-2",children:(0,y.jsx)(o.qI,{onSubmit:async t=>{const a=new FormData(t.target);let n=await e.post("/machine/bulkuploadmachinemaster/bulk-upload/",a);1===n.data.success?(alert("Machine id is created"),ae(),window.location.reload()):1!=n.data.success&&alert(n.data.message)},children:(0,y.jsxs)(o.sK,{children:[(0,y.jsxs)(o.UF,{md:5,children:[(0,y.jsx)(o.A6,{htmlFor:"file1",style:{fontWeight:"600"},children:"Upload Bulk Data"}),"\xa0\xa0",(0,y.jsx)(o.OG,{type:"file",id:"file",name:"file",required:!0,accept:".xlsx",size:"sm"}),(0,y.jsx)(o.To,{invalid:!0,children:"please upload the file"})]}),(0,y.jsxs)(o.UF,{md:7,children:[(0,y.jsx)(o.A6,{htmlFor:"button",style:{fontWeight:"600"},children:"\xa0\xa0\xa0\xa0\xa0\xa0"}),"\xa0\xa0",(0,y.jsx)(o.Q_,{type:"submit",style:{backgroundColor:G,color:"white",marginTop:"29px"},children:"Add"})]})]})})}),(0,y.jsx)(o.sK,{children:(0,y.jsx)(o.UF,{xs:12,children:(0,y.jsx)(o.Pd,{activePage:1,clickableRows:!0,columns:[{key:"sr_no",label:"Sr No.",sorter:!1,_props:{color:"secondary",className:"fw-semibold"},_style:{minWidth:"60px"}},{label:"Machine ID",key:"machine_id",_props:{color:"secondary",className:"fw-semibold"},_style:{minWidth:"100px"},sorter:!1},{label:"QR Code ID",key:"rqcode",_props:{color:"secondary",className:"fw-semibold"},_style:{minWidth:"100px"},sorter:!1},{label:"Image",key:"qr_code_img",_props:{color:"secondary",className:"fw-semibold"},_style:{minWidth:"120px"},sorter:!1},{label:"Location",key:"installation_location",_props:{color:"secondary",className:"fw-semibold"},_style:{minWidth:"120px"},sorter:!1},{label:"Product Type",key:"product_type",_props:{color:"secondary",className:"fw-semibold"},_style:{minWidth:"120px"},sorter:!1},{label:"Amount",key:"amount",_props:{color:"secondary",className:"fw-semibold"},_style:{minWidth:"120px"},sorter:!1},{label:"Model No",key:"model_no",_props:{color:"secondary",className:"fw-semibold"},_style:{minWidth:"120px"},sorter:!1},{label:"Capacity",key:"name",_props:{color:"secondary",className:"fw-semibold"},_style:{minWidth:"120px"},sorter:!1},{label:"Payment Mode",key:"payment_type",_props:{color:"secondary",className:"fw-semibold"},_style:{minWidth:"120px"},sorter:!1},{label:"Machine Availability",key:"machinelease",_props:{color:"secondary",className:"fw-semibold"},_style:{minWidth:"120px"},sorter:!1},{label:"Created Date",key:"created_at",_props:{color:"secondary",className:"fw-semibold"},_style:{minWidth:"120px"},sorter:!1},{key:"Action",label:"Action",filter:!1,sorter:!1,_props:{color:"secondary",className:"fw-semibold"},_style:{minWidth:"100px"}}],items:v,itemsPerPageSelect:!0,itemsPerPage:10,pagination:!0,scopedColumns:{qr_code_img:e=>(0,y.jsx)("td",{children:(0,y.jsx)(o.he,{className:"smarttablecardimg",orientation:"top",src:ee+e.qr_code_img})}),Action:e=>(0,y.jsxs)("td",{children:[(0,y.jsx)(i.N_,{to:"#",children:(0,y.jsx)(d.A,{icon:p.K,style:{color:"blue"},size:"md",title:"Edit",onClick:()=>[N(e),D(e.id),L(!q),ne(e)]})}),"\xa0\xa0\xa0",(0,y.jsx)(i.N_,{to:"/Machineview/"+"".concat(e.id),children:(0,y.jsx)(o.t7,{src:c,width:17,height:15,title:"View Details"})})," ","\xa0\xa0\xa0",(0,y.jsx)(i.N_,{to:"#",onClick:()=>(e=>{const t="".concat(ee)+"/"+e,a=new Request(t,{method:"GET"});fetch(a).then((e=>{if(e.ok)return console.log(e),e.blob();console.error("Request failed:",e.statusText)})).then((e=>{const t=window.URL.createObjectURL(e),a=document.createElement("a");a.style.display="none",a.href=t,a.download="QR_code_Image_"+re(new Date)+".png",document.body.appendChild(a),a.click(),window.URL.revokeObjectURL(t)})).catch((e=>{console.error("Network error:",e)}))})(e.qr_code_img),children:(0,y.jsx)(d.A,{icon:h.n,style:{color:"blue"},size:"md",width:"17",title:"Download"})})]}),sr_no:(e,t)=>(0,y.jsx)("td",{children:t+1}),created_at:e=>(0,y.jsx)("td",{children:re(e.created_at)})},itemsPerPageOptions:[10,20,50,100],tableProps:{color:"success-color-secondary",hover:!0,border:"1.5px solid #074",responsive:!0},tableHeadProps:{color:"light",align:"middle"},tableBodyProps:{align:"middle"},tableFilterPlaceholder:"Enter String to Search",itemsPerPageLabel:"Rows per page:"})})})]}),(0,y.jsxs)(o.zS,{size:"lg",visible:U,onClose:()=>[R(!1),Q(!1),z(!1)],backdrop:"static",children:[(0,y.jsx)(o.E4,{onClose:()=>[R(!1),Q(!1),z(!1)],style:{backgroundColor:G,color:"white"},children:(0,y.jsx)(o.lb,{children:"Machine Master"})}),(0,y.jsxs)(o.qI,{className:"row g-3 needs-validation",style:{margin:"10px"},noValidate:!0,validated:V,onSubmit:t=>{t.preventDefault(),(async t=>{const a=t.currentTarget;if(t.preventDefault(),!0===a.checkValidity())if(null!==j&&void 0!==j&&j.includes(t.target.machine_id.value))alert("This machine id is already exists");else{const a=new FormData(t.target);a.append("is_active",!0);let n=await e.post("/machine/machine-masters/",a);if(1===n.data.success)alert("Machine id is created"),Q(!1),R(!1),ae(),window.location.reload();else if(0===n.data.success)for(let e=0;e<Object.values(n.data.result).length;e++){let t=Object.values(n.data.result)[e];alert(t)}}else Q(!0)})(t),t.currentTarget.checkValidity()},children:[(0,y.jsxs)(o.Tc,{children:[(0,y.jsxs)(o.sK,{sm:12,className:"",children:[(0,y.jsxs)(o.UF,{sm:6,children:[(0,y.jsxs)(o.A6,{htmlFor:"validationDefault01",children:["Add Machine Id",(0,y.jsx)("span",{className:"text-danger",children:"*"})]}),(0,y.jsx)(o.OG,{type:"text",id:"machine_id",name:"machine_id",required:!0,maxLength:50}),(0,y.jsx)(o.To,{invalid:!0,children:"Please create machine id"})]}),(0,y.jsxs)(o.UF,{sm:6,children:[(0,y.jsx)(o.A6,{htmlFor:"validationDefault01",children:"Qr Code Id"}),(0,y.jsx)(o.MT,{name:"rqcode",options:_}),(0,y.jsx)(o.To,{invalid:!0,children:"Please select Qr code Id"})]})]}),(0,y.jsxs)(o.sK,{sm:12,className:"",children:[(0,y.jsxs)(o.UF,{sm:6,children:[(0,y.jsx)(o.A6,{htmlFor:"validationDefault01",children:"Product"}),(0,y.jsx)(o.MT,{name:"product",options:w}),(0,y.jsx)(o.To,{invalid:!0,children:"Please select Product"})]}),(0,y.jsxs)(o.UF,{sm:6,children:[(0,y.jsx)(o.A6,{htmlFor:"validationDefault01",children:"Model Number"}),(0,y.jsx)(o.MT,{name:"model_number",options:C}),(0,y.jsx)(o.To,{invalid:!0,children:"Please select Model Number"})]})]}),(0,y.jsxs)(o.sK,{sm:12,className:"",children:[(0,y.jsxs)(o.UF,{sm:6,children:[(0,y.jsx)(o.A6,{htmlFor:"validationDefault01",children:"Payment mode"}),(0,y.jsxs)(o.MT,{name:"payment_type",children:[(0,y.jsx)("option",{value:"",children:"Select Payment Mode"}),(0,y.jsx)("option",{value:" Only QRCode",children:" QRCode"}),(0,y.jsx)("option",{value:"Only Coin",children:" Coin"}),(0,y.jsx)("option",{value:"Both",children:"Both"})]}),(0,y.jsx)(o.To,{invalid:!0,children:"Please select Payment mode"})]}),(0,y.jsxs)(o.UF,{sm:6,children:[(0,y.jsx)(o.A6,{htmlFor:"validationDefault01",children:"Machine Availability"}),(0,y.jsxs)(o.MT,{name:"machinelease",children:[(0,y.jsx)("option",{value:"",children:"Select Machine Availability"}),(0,y.jsx)("option",{value:"Demo",children:" Demo"}),(0,y.jsx)("option",{value:"Lease",children:" Lease"}),(0,y.jsx)("option",{value:"Sold",children:"Sold"})]}),(0,y.jsx)(o.To,{invalid:!0,children:"Please select Machine Availability"})]})]}),(0,y.jsx)(o.sK,{sm:12,className:"",children:(0,y.jsxs)(o.UF,{sm:6,children:[(0,y.jsxs)(o.A6,{htmlFor:"validationDefault01",children:["Location",(0,y.jsx)("span",{className:"text-danger",children:"*"})]}),(0,y.jsx)(o.OG,{type:"text",id:"installation_location",name:"installation_location",required:!0,maxLength:50}),(0,y.jsx)(o.To,{invalid:!0,children:"Please enter location"})]})})]}),(0,y.jsxs)(o.If,{children:[(0,y.jsx)(o.Q_,{onClick:()=>[R(!1),Q(!1),z(!1)],style:{backgroundColor:"#F5F5F5",color:"black",borderColor:"#DCDCDC"},children:"\xa0Close\xa0"}),(0,y.jsxs)(o.Q_,{type:"submit",style:{backgroundColor:G,color:"white"},disabled:K,children:[(0,y.jsx)(d.A,{icon:m.B,style:{color:"white"},size:"sm"}),"\xa0 ","Submit"]})]})]})]}),(0,y.jsxs)(o.zS,{size:"lg",visible:q,onClose:()=>[L(!1),Q(!1)],backdrop:"static",children:[(0,y.jsx)(o.E4,{onClose:()=>[L(!1),Q(!1)],style:{backgroundColor:G,color:"white"},children:(0,y.jsx)(o.lb,{children:"Update Machine Master"})}),(0,y.jsxs)(o.qI,{className:"row g-3 needs-validation",style:{margin:"10px"},noValidate:!0,validated:V,onSubmit:async t=>{const a=t.currentTarget;if(t.preventDefault(),!0===a.checkValidity()){const a=new FormData(t.target);let n=await e.patch("/machine/machine-masters/".concat(T,"/"),a);if(1===n.data.success)alert("Machine id is updated"),Q(!1),L(!1),ae();else if(0===n.data.success)for(let e=0;e<Object.values(n.data.result).length;e++){let t=Object.values(n.data.result)[e];alert(t)}}Q(!0)},children:[(0,y.jsxs)(o.Tc,{children:[(0,y.jsxs)(o.sK,{sm:12,className:"",children:[(0,y.jsxs)(o.UF,{sm:6,children:[(0,y.jsxs)(o.A6,{htmlFor:"validationDefault01",children:["Machine ID",(0,y.jsx)("span",{className:"text-danger",children:"*"})]}),(0,y.jsx)(o.OG,{type:"text",id:"machine_id",name:"machine_id",required:!0,defaultValue:null===M||void 0===M?void 0:M.machine_id,maxLength:50}),(0,y.jsx)(o.To,{invalid:!0,children:"Please enter machine id"})]}),(0,y.jsxs)(o.UF,{sm:6,children:[(0,y.jsx)(o.A6,{htmlFor:"validationDefault01",children:"QR Code Id"}),(0,y.jsx)(o.MT,{name:"rqcode",defaultValue:null===M||void 0===M?void 0:M.rqcode,options:Z}),(0,y.jsx)(o.To,{invalid:!0,children:"Please select QR code Id"})]})]}),(0,y.jsxs)(o.sK,{sm:12,className:"",children:[(0,y.jsxs)(o.UF,{sm:6,children:[(0,y.jsx)(o.A6,{htmlFor:"validationDefault01",children:"Product"}),(0,y.jsx)(o.MT,{name:"product",options:w,defaultValue:null===M||void 0===M?void 0:M.product}),(0,y.jsx)(o.To,{invalid:!0,children:"Please select Product"})]}),(0,y.jsxs)(o.UF,{sm:6,children:[(0,y.jsx)(o.A6,{htmlFor:"validationDefault01",children:"Payment mode"}),(0,y.jsxs)(o.MT,{name:"payment_type",defaultValue:null===M||void 0===M?void 0:M.payment_type,children:[(0,y.jsx)("option",{value:"",children:"Select Payment Mode"}),(0,y.jsx)("option",{value:" Only QRCode",children:" Only QRCode"}),(0,y.jsx)("option",{value:"Only Coin",children:" Only Coin"}),(0,y.jsx)("option",{value:"Both",children:"Both"})]}),(0,y.jsx)(o.To,{invalid:!0,children:"Please select Payment mode"})]})]}),(0,y.jsxs)(o.sK,{sm:12,className:"",children:[(0,y.jsxs)(o.UF,{sm:6,children:[(0,y.jsxs)(o.A6,{htmlFor:"validationDefault01",children:["Location",(0,y.jsx)("span",{className:"text-danger",children:"*"})]}),(0,y.jsx)(o.OG,{type:"text",id:"installation_location",name:"installation_location",required:!0,defaultValue:null===M||void 0===M?void 0:M.installation_location,maxLength:50}),(0,y.jsx)(o.To,{invalid:!0,children:"Please enter location"})]}),(0,y.jsxs)(o.UF,{sm:6,children:[(0,y.jsx)(o.A6,{htmlFor:"validationDefault01",children:"Model Number"}),(0,y.jsx)(o.MT,{name:"model_number",options:C,defaultValue:null===M||void 0===M?void 0:M.model_number}),(0,y.jsx)(o.To,{invalid:!0,children:"Please select Model Number"})]})]})]}),(0,y.jsxs)(o.If,{children:[(0,y.jsx)(o.Q_,{onClick:()=>[L(!1),Q(!1)],style:{backgroundColor:"#F5F5F5",color:"black",borderColor:"#DCDCDC"},children:"\xa0Close\xa0"}),(0,y.jsxs)(o.Q_,{type:"submit",style:{backgroundColor:G,color:"white"},children:[(0,y.jsx)(d.A,{icon:m.B,style:{color:"white"},size:"sm"}),"\xa0Submit"]})]})]})]})]})}},76058:(e,t,a)=>{"use strict";a.d(t,{n:()=>n});const n=["512 512","<polygon fill='var(--ci-primary-color, currentColor)' points='367.997 338.75 271.999 434.747 271.999 17.503 239.999 17.503 239.999 434.745 144.003 338.75 121.376 361.377 256 496 390.624 361.377 367.997 338.75' class='ci-primary'/>"]},84257:(e,t,a)=>{"use strict";a.d(t,{B:()=>n});const n=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M199.066,456l-7.379-7.514-3.94-3.9-86.2-86.2.053-.055L17.936,274.665l97.614-97.613,83.565,83.565L398.388,61.344,496,158.958,296.729,358.229,285.469,369.6ZM146.6,358.183l52.459,52.46.1-.1.054.054,52.311-52.311,11.259-11.368L450.746,158.958,398.388,106.6,199.115,305.871,115.55,222.306,63.191,274.665l83.464,83.463Z' class='ci-primary'/>"]},27760:(e,t,a)=>{"use strict";a.d(t,{K:()=>n});const n=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M29.663,482.25l.087.087a24.847,24.847,0,0,0,17.612,7.342,25.178,25.178,0,0,0,8.1-1.345l142.006-48.172,272.5-272.5A88.832,88.832,0,0,0,344.334,42.039l-272.5,272.5L23.666,456.541A24.844,24.844,0,0,0,29.663,482.25Zm337.3-417.584a56.832,56.832,0,0,1,80.371,80.373L411.5,180.873,331.127,100.5ZM99.744,331.884,308.5,123.127,388.873,203.5,180.116,412.256,58.482,453.518Z' class='ci-primary'/>"]},46411:(e,t,a)=>{e.exports=a(795)},91078:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,r=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),l=a(9950),o=(n=l)&&n.__esModule?n:{default:n},i=a(87924),s=a(8010);var c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={},a}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"buildURI",value:function(){return i.buildURI.apply(void 0,arguments)}},{key:"componentDidMount",value:function(){var e=this.props,t=e.data,a=e.headers,n=e.separator,r=e.enclosingCharacter,l=e.uFEFF,o=e.target,i=e.specs,s=e.replace;this.state.page=window.open(this.buildURI(t,l,a,n,r),o,i,s)}},{key:"getWindow",value:function(){return this.state.page}},{key:"render",value:function(){return null}}]),t}(o.default.Component);c.defaultProps=Object.assign(s.defaultProps,{target:"_blank"}),c.propTypes=s.propTypes,t.default=c},49462:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},l=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),o=a(9950),i=(n=o)&&n.__esModule?n:{default:n},s=a(87924),c=a(8010);var d=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.buildURI=a.buildURI.bind(a),a}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),l(t,[{key:"buildURI",value:function(){return s.buildURI.apply(void 0,arguments)}},{key:"handleLegacy",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(window.navigator.msSaveOrOpenBlob){e.preventDefault();var a=this.props,n=a.data,r=a.headers,l=a.separator,o=a.filename,i=a.enclosingCharacter,c=a.uFEFF,d=t&&"function"===typeof n?n():n,u=new Blob([c?"\ufeff":"",(0,s.toCSV)(d,r,l,i)]);return window.navigator.msSaveBlob(u,o),!1}}},{key:"handleAsyncClick",value:function(e){var t=this;this.props.onClick(e,(function(a){!1!==a?t.handleLegacy(e,!0):e.preventDefault()}))}},{key:"handleSyncClick",value:function(e){!1===this.props.onClick(e)?e.preventDefault():this.handleLegacy(e)}},{key:"handleClick",value:function(){var e=this;return function(t){if("function"===typeof e.props.onClick)return e.props.asyncOnClick?e.handleAsyncClick(t):e.handleSyncClick(t);e.handleLegacy(t)}}},{key:"render",value:function(){var e=this,t=this.props,a=t.data,n=t.headers,l=t.separator,o=t.filename,s=t.uFEFF,c=t.children,d=(t.onClick,t.asyncOnClick,t.enclosingCharacter),u=function(e,t){var a={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(a[n]=e[n]);return a}(t,["data","headers","separator","filename","uFEFF","children","onClick","asyncOnClick","enclosingCharacter"]),p="undefined"===typeof window?"":this.buildURI(a,s,n,l,d);return i.default.createElement("a",r({download:o},u,{ref:function(t){return e.link=t},target:"_self",href:p,onClick:this.handleClick()}),c)}}]),t}(i.default.Component);d.defaultProps=c.defaultProps,d.propTypes=c.propTypes,t.default=d},87924:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function n(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}var r=t.isSafari=function(){return/^((?!chrome|android).)*safari/i.test(navigator.userAgent)},l=t.isJsons=function(e){return Array.isArray(e)&&e.every((function(e){return"object"===("undefined"===typeof e?"undefined":a(e))&&!(e instanceof Array)}))},o=t.isArrays=function(e){return Array.isArray(e)&&e.every((function(e){return Array.isArray(e)}))},i=t.jsonsHeaders=function(e){return Array.from(e.map((function(e){return Object.keys(e)})).reduce((function(e,t){return new Set([].concat(n(e),n(t)))}),[]))},s=t.jsons2arrays=function(e,t){var a=t=t||i(e),r=t;l(t)&&(a=t.map((function(e){return e.label})),r=t.map((function(e){return e.key})));var o=e.map((function(e){return r.map((function(t){return c(t,e)}))}));return[a].concat(n(o))},c=t.getHeaderValue=function(e,t){var a=e.replace(/\[([^\]]+)]/g,".$1").split(".").reduce((function(e,t,a,n){var r=e[t];if(void 0!==r&&null!==r)return r;n.splice(1)}),t);return void 0===a?e in t?t[e]:"":a},d=t.elementOrEmpty=function(e){return"undefined"===typeof e||null===e?"":e},u=t.joiner=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:",",a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:'"';return e.filter((function(e){return e})).map((function(e){return e.map((function(e){return d(e)})).map((function(e){return""+a+e+a})).join(t)})).join("\n")},p=t.arrays2csv=function(e,t,a,r){return u(t?[t].concat(n(e)):e,a,r)},h=t.jsons2csv=function(e,t,a,n){return u(s(e,t),a,n)},m=t.string2csv=function(e,t,a,n){return t?t.join(a)+"\n"+e:e.replace(/"/g,'""')},f=t.toCSV=function(e,t,a,n){if(l(e))return h(e,t,a,n);if(o(e))return p(e,t,a,n);if("string"===typeof e)return m(e,t,a);throw new TypeError('Data should be a "String", "Array of arrays" OR "Array of objects" ')};t.buildURI=function(e,t,a,n,l){var o=f(e,a,n,l),i=r()?"application/csv":"text/csv",s=new Blob([t?"\ufeff":"",o],{type:i}),c="data:"+i+";charset=utf-8,"+(t?"\ufeff":"")+o,d=window.URL||window.webkitURL;return"undefined"===typeof d.createObjectURL?c:d.createObjectURL(s)}},795:(e,t,a)=>{"use strict";t.CSVLink=void 0;var n=l(a(91078)),r=l(a(49462));function l(e){return e&&e.__esModule?e:{default:e}}n.default,t.CSVLink=r.default},8010:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PropsNotForwarded=t.defaultProps=t.propTypes=void 0;var n,r=a(9950),l=((n=r)&&n.__esModule,a(11942));t.propTypes={data:(0,l.oneOfType)([l.string,l.array,l.func]).isRequired,headers:l.array,target:l.string,separator:l.string,filename:l.string,uFEFF:l.bool,onClick:l.func,asyncOnClick:l.bool,enclosingCharacter:l.string},t.defaultProps={separator:",",filename:"generatedBy_react-csv.csv",uFEFF:!0,asyncOnClick:!1,enclosingCharacter:'"'},t.PropsNotForwarded=["data","headers"]}}]);