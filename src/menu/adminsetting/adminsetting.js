// import React, { useState, useEffect } from 'react';
// import useAxios from 'src/utils/useAxios';
// import {
//     CButton,
//     CFormInput,
//     CForm,
//     CRow,
//     CCol,
//     CFormFeedback,
//     CCardImage,
//     CCard
// } from '@coreui/react-pro';
// import axios from 'axios';
// import { SketchPicker } from 'react-color';
// import baseurl from 'src/utils/baseurl';
// import { useColor } from 'src/menu/adminsetting/colorcontext';

// const ColorPalette = () => {
//   const { selectedColor, setSelectedColor } = useColor('#2c8bde');
//   const [showColorPicker, setShowColorPicker] = useState(false);
//   const [logoUrl, setLogoUrl] = useState('');
//   const api = useAxios();
//   const baseURL = baseurl();
//   const [errorMsg, setErrorMsg] = useState('');
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [faviconUrl, setFaviconUrl] = useState('');
    
//    useEffect(() => {
//     getSavedColor();
//   }, []);

//   const getSavedColor = async () => {
//     try {
//       const response = await axios.get(`${baseURL}/machine/colorstore/`);
//       if (response.data.success === 1 && response.data.result.length > 0) {
//         const lastColor = response.data.result[0]?.color_name;
//         setSelectedColor(lastColor);
//       } else {
//         console.error('Failed to retrieve color from database');
//       }
//     } catch (error) {
//       console.error('Error fetching color:', error);
//     }
//   };

//   const handleChangeColor = async (newColor) => {
//     setSelectedColor(newColor.hex);
//     try {
//       await axios.post(`${baseURL}/machine/colorstore/`, { color_name: newColor.hex });
//       alert('Color added successfully!');
//     } catch (error) {
//       console.error('Error adding color:', error);
//     }
//   };

//   // const handleClickAddColor = async () => {
//   //   try {
//   //     await axios.post(`${baseURL}/machine/colorstore/`, { color_name: selectedColor });
//   //     alert('Color added successfully!');
//   //     getSavedColor();
//   //   } catch (error) {
//   //     alert('Error adding color:', error);
//   //   }
//   // };

// //   useEffect(() => {
// //     getcreate_project();
// //   }, []);

// //   const getcreate_project = async () => {
// //     let response = await api.get('/machine/site_settings_api_for_logo/');
// //     if (response.data.success === 1) {
// //       setLogoUrl(response.data.result.logo);
// //     } else if (response.data.success === 0) {
// //       for (let i = 0; i < Object.values(response.data.result).length; i++) {
// //         let a = Object.values(response.data.result)[i];
// //         alert(a);
// //       }
// //     }
// //   };
// useEffect(() => {
//     getTopic();
//   }, []);


//   const getTopic = async () => {
//     try {
//       const response = await api.get('/machine/site_settings_api_for_logo/');
//       if (response.data.success === 1) {
//         setLogoUrl(response.data.result.logo);
//         // setFaviconUrl(response.data.result.favicon);
//       } else if (response.data.success === 0) {
//         // Handle failure
//         console.error('Failed to fetch logo and favicon');
//       }
//     } catch (error) {
//       console.error('Error fetching logo and favicon:', error);
//     }
//   };
//   const validateSelectedFile = (e) => {
//     const MIN_FILE_SIZE = 1; // 1kb
//     const MAX_FILE_SIZE = 100000; // 100MB
//     const fileSizeKiloBytes = e.target.files[0].size / 1024;

//     if (fileSizeKiloBytes < MIN_FILE_SIZE) {
//       setErrorMsg('File size is less than minimum limit');
//       setIsSuccess(false);
//       return;
//     }
//     if (fileSizeKiloBytes > MAX_FILE_SIZE) {
//       setErrorMsg('File size is greater than maximum limit');
//       setIsSuccess(false);
//       return;
//     }
//     setErrorMsg('');
//     setIsSuccess(true);
//   };
  
//   let getrefresh = () => {
//     window.location.reload()
//   }

//   const saveTopic = async (e) => {
//     e.preventDefault();
//     const form = e.currentTarget;
//     if (form.checkValidity()) {
//       const uploadData = new FormData(form);
//       try {
//         const response = await api.post('/machine/tenant_upload_logo/', uploadData);
//         if (response.data.success === 1) {
//           alert('Logo uploaded successfully');
//           setLogoUrl(response.data.result.logo);
//           // setFaviconUrl(response.data.result.favicon); // Set the logo URL after successful upload
//           getTopic();
//           getrefresh();
       
//         } else {
//           console.error('Failed to upload logo:', response.data.result);
//         }
//       } catch (error) {
//         console.error('Error uploading logo:', error);
//       }
//     } else {
//       console.log('Form validation failed');
//     }
//   };

//   return (
//     <div>
//        <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc' }} className='px-5 pt-5 mx-4 mb-4'>
//         <CRow><h3> Select the Color Theme </h3> </CRow>
//         <CRow className='mb-4'>
//           <CCol md={6}>
//             <CButton style={{ background: selectedColor }} onClick={() => setShowColorPicker(!showColorPicker)}>Select Color</CButton>
//           </CCol>
//         </CRow>
//         <CRow>
//           {showColorPicker && <SketchPicker color={selectedColor} onChange={handleChangeColor} />}
//         </CRow>
//       </CCard>
//       <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc' }} className='px-5 pt-5 mx-4'>
//         <h3 className='mb-3' style={{ color: '#2C384A' }}>Logo</h3>
//         <CRow className="mb-3">
//           <CCol md={6}>
//           <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc', height:'250px' }} className=' px-5 pt-5 mx-4'>
//             <CRow className='mb-3'>
// Current Logo
//             </CRow>
//             <CRow>
//             {logoUrl && <CCardImage src={baseURL + logoUrl} height="100" width="100" alt="Path not found" />}
        
//               </CRow>
//           </CCard>
//           </CCol>
//           <CCol md={6}>
//           {/* <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc', height:'250px' ,alignItems:'center'}} className=' pt-5 mx-4'> */}
//             Upload Logo<span className="text-danger">*</span>
//             <CRow>
              
//             <CForm onSubmit={saveTopic}>
//               <CFormInput
//                 type="file"
//                 id="logo"
//                 accept="image/*"
//                 onChange={validateSelectedFile}
//                 name="logo"
//                 required
//               />
//               <div>
//                 <span style={{fontSize:'12px'}}>Accept logo in JPG and PNG formats. </span><br/>
//                 <span style={{fontSize:'12px'}}>Logo size should be under 200KB</span>
//               </div>
//               {isSuccess ? <p className="text-success">File size is okay.</p> : null}
//               <p className="text-danger">{errorMsg}</p>
//               <CFormFeedback invalid>Please upload logo</CFormFeedback>
//               <CRow  className='px-5'>
//               <CButton
//                 type="submit"
//                 size="lg"
//                 className="aboutus-button mt-2 mb-2"
//                 style={{ backgroundColor: selectedColor, color: 'white', border: 'none', width: '50%'}}
//               >
//                 Submit
//               </CButton>
//               </CRow>
//             </CForm>
//             </CRow>
//           {/* </CCard> */}
// </CCol>
//           {/* <CCard>
//           <CCol sm={2} className="mb-4">
//             Current Logo
//           </CCol>
//           <CCol sm={3} className="mb-4">
//             {logoUrl && <CCardImage src={baseURL + logoUrl} height="100" width="100" alt="Current Logo" />}
//           </CCol>
//           </CCard> */}
//           {/* <CCard>
//           <CCol sm={2}>Upload Logo</CCol>
//           <CCol sm={3}>
//             <CForm onSubmit={saveTopic}>
//               <CFormInput
//                 type="file"
//                 id="logo"
//                 accept="image/*"
//                 onChange={validateSelectedFile}
//                 name="logo"
//               />
//               <div>
//                 <span>Min size: 1KB</span>&nbsp;&nbsp;
//                 <span>Max size: 100KB</span>
//               </div>
//               {isSuccess ? <p className="text-success">File size is okay.</p> : null}
//               <p className="text-danger">{errorMsg}</p>
//               <CFormFeedback invalid>Please upload logo</CFormFeedback>
//               <CRow>
//               <CButton
//                 type="submit"
//                 size="lg"
//                 className="aboutus-button mt-2 mb-2"
//                 style={{ backgroundColor: selectedColor, color: 'white', border: 'none', width: '50%' }}
//               >
//                 Submit
//               </CButton>
//               </CRow>
//             </CForm>
//           </CCol>
//           </CCard> */}
//         </CRow>
//         {/* <h3 className='mb-3' style={{ color: '#2C384A' }}>Login background Image </h3> */}
//         {/* <CRow className="mb-3">
//           <CCol sm={2} className="mb-4">
//             Current Background Image 
//           </CCol>
//           <CCol sm={3} className="mb-4">
//             {faviconUrl && <CCardImage src={baseURL + faviconUrl} height="100" width="100" alt="Current Logo" />}
//           </CCol>
//           <CCol sm={2}>Upload Background Image</CCol>
//           <CCol sm={3}>
//             <CForm onSubmit={saveTopic}>
//               <CFormInput
//                 type="file"
//                 id="favicon"
//                 accept="image/*"
//                 onChange={validateSelectedFile}
//                 name="favicon"
//               />
//               <div>
//                 <span>Min size: 1KB</span>&nbsp;&nbsp;
//                 <span>Max size: 100MB</span>
//               </div>
//               {isSuccess ? <p className="text-success">File size is okay.</p> : null}
//               <p className="text-danger">{errorMsg}</p>
//               <CFormFeedback invalid>Please upload Background Image</CFormFeedback>
//               <CRow>
//               <CButton
//                 type="submit"
//                 size="lg"
//                 className="aboutus-button mt-2 mb-2"
//                 style={{ backgroundColor: selectedColor, color: 'white', border: 'none', width: '50%' }}
//               >
//                 Submit
//               </CButton>
//               </CRow>
//             </CForm>
//           </CCol>
//         </CRow> */}
//       </CCard>
//     </div>
//   );
// };

// export default ColorPalette;
import React, { useState ,useEffect} from 'react';
import {
  CButton,
  CFormInput,
  CForm,
  CRow,
  CCol,
  CFormFeedback,
  CCardImage,
  CCard
} from '@coreui/react-pro';
import { SketchPicker } from 'react-color';
import { useColor } from 'src/menu/adminsetting/colorcontext'; // Adjust the import path as needed
import useAxios from 'src/utils/useAxios';
import baseurl from 'src/utils/baseurl';

const ColorPalette = () => {
  const { selectedColor, setSelectedColor, handleAddColor, fontColor } = useColor();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const api = useAxios();
  const baseURL = baseurl();
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validateSelectedFile = (e) => {
    const MIN_FILE_SIZE = 1; // 1kb
    const MAX_FILE_SIZE = 200; // 200KB
    const fileSizeKiloBytes = e.target.files[0].size / 1024;

    if (fileSizeKiloBytes < MIN_FILE_SIZE) {
      setErrorMsg('File size is less than minimum limit');
      setIsSuccess(false);
      return;
    }
    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      setErrorMsg('File size is greater than maximum limit');
      setIsSuccess(false);
      return;
    }
    setErrorMsg('');
    setIsSuccess(true);
  };

  const getTopic = async () => {
    try {
      const response = await api.get('/machine/site_settings_api_for_logo/');
      if (response.data.success === 1) {
        setLogoUrl(response.data.result.logo);
      } else {
        console.error('Failed to fetch logo and favicon');
      }
    } catch (error) {
      console.error('Error fetching logo and favicon:', error);
    }
  };

  useEffect(() => {
    getTopic();
  }, []);

  const saveTopic = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      const uploadData = new FormData(form);
      try {
        const response = await api.post('/machine/tenant_upload_logo/', uploadData);
        if (response.data.success === 1) {
          alert('Logo uploaded successfully');
          setLogoUrl(response.data.result.logo);
          getTopic();
          window.location.reload();
        } else {
          console.error('Failed to upload logo:', response.data.result);
        }
      } catch (error) {
        console.error('Error uploading logo:', error);
      }
    } else {
      console.log('Form validation failed');
    }
  };

  return (
    <div>
      <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc' }} className='px-5 pt-5 mx-4 mb-4'>
        <CRow><h3 style={{ color: fontColor }}> Select the Color Theme </h3> </CRow>
        <CRow className='mb-4'>
          <CCol md={6}>
            <CButton style={{ background: selectedColor, color: fontColor }} onClick={() => setShowColorPicker(!showColorPicker)}>Select Color</CButton>
          </CCol>
        </CRow>
        {showColorPicker && (
          <CRow>
            <SketchPicker color={selectedColor} onChange={(color) => setSelectedColor(color.hex)} />
            <CCol md={6} className='mt-3'>
              <CButton style={{ background: selectedColor, color: fontColor }} onClick={handleAddColor}>Submit Color</CButton>
            </CCol>
          </CRow>
        )}
      </CCard>
      <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc' }} className='px-5 pt-5 mx-4'>
        <h3 className='mb-3' style={{ color: '#2C384A' }}>Logo</h3>
        <CRow className="mb-3">
          <CCol md={6}>
            <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc', height:'250px' }} className=' px-5 pt-5 mx-4'>
              <CRow className='mb-3' style={{ color: fontColor }}>Current Logo</CRow>
              <CRow>
                {logoUrl && <CCardImage src={baseURL + logoUrl} height="100" width="100" alt="Path not found" />}
              </CRow>
            </CCard>
          </CCol>
          <CCol md={6}>
            <CRow style={{ color: fontColor }}>
              Upload Logo<span className="text-danger">*</span>
            </CRow>
            <CRow>
              <CForm onSubmit={saveTopic}>
                <CFormInput
                  type="file"
                  id="logo"
                  accept="image/*"
                  onChange={validateSelectedFile}
                  name="logo"
                  required
                />
                <div>
                  <span style={{fontSize:'12px'}}>Accept logo in JPG and PNG formats. </span><br/>
                  <span style={{fontSize:'12px'}}>Logo size should be under 200KB</span>
                </div>
                {isSuccess ? <p className="text-success">File size is okay.</p> : null}
                <p className="text-danger">{errorMsg}</p>
                <CFormFeedback invalid>Please upload logo</CFormFeedback>
                <CRow className='px-5'>
                  <CButton
                    type="submit"
                    size="lg"
                    className="aboutus-button mt-2 mb-2"
                    style={{ backgroundColor: selectedColor, color: fontColor, border: 'none', width: '50%' }}
                  >
                    Submit
                  </CButton>
                </CRow>
              </CForm>
            </CRow>
          </CCol>
        </CRow>
      </CCard>
    </div>
  );
};

export default ColorPalette;
