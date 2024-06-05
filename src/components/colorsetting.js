// // // // //colorsetting.js
// // // // import React, { useState, useEffect } from 'react';
// // // // import useAxios from 'src/utils/useAxios';
// // // // // import ColorPicker from 'src/menu/adminsetting/adminsetting'; // Import the ColorPicker component
// // // // import {
// // // //     CButton,
// // // //     CFormInput,
// // // //     CForm,
// // // //     CModal,
// // // //     CModalHeader,
// // // //     CModalTitle,
// // // //     CModalBody,
// // // //     CModalFooter,
// // // //     CRow,
// // // //     CFormFeedback,
// // // //     CCol,
// // // //     CFormLabel,
// // // //     CImage,
// // // //     CFormSelect,
// // // //     CCardImage,
// // // //     CCard
// // // // } from '@coreui/react-pro';
// // // // import CIcon from '@coreui/icons-react';
// // // // import { cilPencil, cilCheck, cilArrowBottom } from '@coreui/icons';
// // // // import { useColor } from 'src/menu/adminsetting/colorcontext';
// // // // import axios from 'axios';
// // // // // function ColorPicker({ color_id }) {

// // // //     const ColorPalette = ({ onThemeSelect }) => {
// // // //         const [colorThemes, setColorThemes] = useState([]);
// // // //        const api = useAxios();
// // // //     const [logoUrl, setLogoUrl] = useState('');
// // // //     const [faviconUrl, setFaviconUrl] = useState('');
// // // //     const { selectedColor, setSelectedColor } = useColor();
// // // //         useEffect(() => {
// // // //             fetchColorThemes();
// // // //         }, []);
// // // //           const fetchColorThemes = async () => {
// // // //             try {
// // // //               const response = await axios.get('/machine/colorstore/');
// // // //               setColorThemes(response.data);
// // // //             } catch (error) {
// // // //               console.error('Error fetching color themes:', error);
// // // //             }
// // // //           };
      
        
      
      
   

// // // //     // const handleColorChange = (e) => {
// // // //     //   setSelectedColor(e.target.value);
// // // //     // };
// // // //     const handleColorChange = (e) => {
// // // //         setSelectedColor(e.target.value); // Update selected color state
// // // //     };
   
// // // //     const handleSubmit = (e) => {
// // // //       e.preventDefault();
// // // //       // Here you can submit the selected color to be reflected throughout the project
// // // //     };
  
// // // //     useEffect(() => {
// // // //         getTopic();
// // // //     }, []);

// // // //     const getTopic = async () => {
// // // //         try {
// // // //             const response = await api.get('/machine/site_settings_api_for_logo/');
// // // //             if (response.data.success === 1) {
// // // //                 setLogoUrl(response.data.result.logo);
// // // //                 setFaviconUrl(response.data.result.favicon);
// // // //             } else if (response.data.success === 0) {
// // // //                 // Handle failure
// // // //                 console.error('Failed to fetch logo and favicon');
// // // //             }
// // // //         } catch (error) {
// // // //             console.error('Error fetching logo and favicon:', error);
// // // //         }
// // // //     };

// // // //     const saveTopic = async (e) => {
// // // //         e.preventDefault();
// // // //         const form = e.currentTarget;
// // // //         if (form.checkValidity()) {
// // // //             const uploadData = new FormData(form);
// // // //             try {
// // // //                 const response = await api.post('/machine/tenant_upload_logo/', uploadData);
// // // //                 if (response.data.success === 1) {
// // // //                     alert('Logo & favicon uploaded successfully');
// // // //                     // Refresh the logo and favicon after successful upload
// // // //                     getTopic();
// // // //                 } else if (response.data.success === 0) {
// // // //                     // Handle failure
// // // //                     console.error('Failed to upload logo and favicon:', response.data.result);
// // // //                 }
// // // //             } catch (error) {
// // // //                 console.error('Error uploading logo and favicon:', error);
// // // //             }
// // // //         } else {
// // // //             // Form is invalid
// // // //             console.log('Form validation failed');
// // // //         }
// // // //     };

// // // //     return (
// // // //         <div>


// // // // <CCard    style={{ boxShadow: '1px 1px 1px 1px #ccc' }}
// // // //           className='px-5 pt-5 cardtop-container mx-4 mb-4'>

// // // //             <CRow><h3> Select the  Color Theme </h3> </CRow>
// // // //             <CRow className='mb-3'>
// // // //         {/* <CForm onSubmit={handleSubmit}>
// // // //           <CFormInput
// // // //             type="color"
// // // //             value={selectedColor}
// // // //             onChange={handleColorChange}
// // // //           />
        
// // // //         </CForm> */}
      
// // // //       <div>
// // // //       {/* <h2>Color Palette</h2> */}
// // // //      {/* Mapping over color themes to display color squares */}
// // // //    {colorThemes.map(theme => (
// // // //         <div key={theme.id}>
// // // //           <h3>{theme.name}</h3>
// // // //           {/* Color square with primary color */}
// // // //           <div
// // // //             onClick={() => onThemeSelect(theme)}
// // // //             style={{ backgroundColor: theme.primary_color, width: '50px', height: '50px', cursor: 'pointer' }}
// // // //           ></div>
// // // //           {/* Color square with secondary color */}
// // // //           <div style={{ backgroundColor: theme.secondary_color, width: '50px', height: '50px' }}></div>
// // // //           {/* Text with text color */}
// // // //           <div style={{ color: theme.text_color }}>Sample Text</div>
// // // //         </div>
// // // //       ))}
// // // //       {/* Input for selecting a custom color */}
// // // //       <input type="color" value={selectedColor} onChange={handleColorChange} />
// // // //     </div>
  

// // // //         </CRow>
// // // //       </CCard>
          
// // // //          <CCard
// // // //           style={{ boxShadow: '1px 1px 1px 1px #ccc', transition: 'transform 0.3s ease' }}
// // // //           className='px-5 pt-5 cardtop-container mx-4'
// // // //         >
// // // //             <h3>Upload Logo </h3>
           
// // // //             <CForm   onSubmit={saveTopic}
// // // //                >
// // // //                 <CRow className='mb-4'>
// // // //                     <CCol>
// // // //                  <CRow sm={12} className="mt-5 mb-5">
// // // //                                 <CCol sm={6}>
// // // //                                     <CFormLabel htmlFor="validationDefault01">
// // // //                                         Logo<span className="text-danger">*</span>
// // // //                                     </CFormLabel>
// // // //                                     <CFormInput
// // // //                                         type="file"
// // // //                                         id="logo"
// // // //                                         name="logo"
// // // //                                         required
// // // //                                         maxLength={50}
// // // //                                         size="sm"
// // // //                                         accept='.png , .jpg'
// // // //                                         // defaultValue={userdata?.qr_store_name}

// // // //                                     />
// // // //                                     <CCol ><small>Image size must be 150 x 50  </small></CCol>
// // // //                                     <CFormFeedback invalid>Please Upload Logo</CFormFeedback>
// // // //                                 </CCol>

// // // //                                 {/* <CCol sm={6}>
// // // //                                     <CFormLabel htmlFor="validationDefault01">
// // // //                                         Favicon<span className="text-danger">*</span>
// // // //                                     </CFormLabel>
// // // //                                     <CFormInput
// // // //                                         type="file"
// // // //                                         id="favicon"
// // // //                                         name="favicon"
// // // //                                         required
// // // //                                         maxLength={50}
// // // //                                         size="sm"
// // // //                                         accept='.png , .jpg'
// // // //                                         // defaultValue={userdata?.qr_store_name}

// // // //                                     />
// // // //                                     <CFormFeedback invalid>Please Upload Favicon</CFormFeedback>
// // // //                                 </CCol> */}

// // // //                            </CRow>
// // // //                             </CCol>
// // // //                             <CCol>
// // // //                                 <CRow>Current Logo</CRow>
// // // //                                 <CRow></CRow>
// // // //                                 <CCol sm={6}>   {logoUrl && <CCardImage src={logoUrl} width="100" height="120" alt="Current Logo" />}</CCol>
// // // //                             </CCol>
// // // //                             </CRow>
// // // //                             <CRow className="justify-content-center mb-4"> {/* Center align the button */}
// // // //         <CButton type="submit" color="primary"  style={{width:'100px', background: selectedColor ,height: '35px'}}>Submit 
// // // //         </CButton>
// // // //     </CRow>
               
// // // //             </CForm> </CCard> 
// // // //         </div>
// // // //     );
// // // // }

// // // // export default ColorPalette;

// // // // //   return (
// // // // //     <div>
// // // // //       <h2>Color Palette</h2>
// // // // //       {/* Mapping over color themes to display color squares */}
// // // // //       {colorThemes.map(theme => (
// // // // //         <div key={theme.id}>
// // // // //           <h3>{theme.name}</h3>
// // // // //           {/* Color square with primary color */}
// // // // //           <div
// // // // //             onClick={() => onThemeSelect(theme)}
// // // // //             style={{ backgroundColor: theme.primary_color, width: '50px', height: '50px', cursor: 'pointer' }}
// // // // //           ></div>
// // // // //           {/* Color square with secondary color */}
// // // // //           <div style={{ backgroundColor: theme.secondary_color, width: '50px', height: '50px' }}></div>
// // // // //           {/* Text with text color */}
// // // // //           <div style={{ color: theme.text_color }}>Sample Text</div>
// // // // //         </div>
// // // // //       ))}
// // // // //       {/* Input for selecting a custom color */}
// // // // //       <input type="color" value={selectedColor} onChange={handleColorChange} />
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default ColorPalette;

// // import React, { useState, useEffect } from 'react';
// // import useAxios from 'src/utils/useAxios';
// // import {
// //     CButton,
// //     CFormInput,
// //     CForm,
// //     CModal,
// //     CModalHeader,
// //     CModalTitle,
// //     CModalBody,
// //     CModalFooter,
// //     CRow,
// //     CFormFeedback,
// //     CCol,
// //     CFormLabel,
// //     CImage,
// //     CFormSelect,
// //     CCardImage,
// //     CCard
// // } from '@coreui/react-pro';
// // import CIcon from '@coreui/icons-react';
// // import { cilPencil, cilCheck, cilArrowBottom } from '@coreui/icons';
// // import { useColor } from 'src/menu/adminsetting/colorcontext';
// // import axios from 'axios';
// // import { SketchPicker } from 'react-color';
// // const ColorPalette = ({ onThemeSelect }) => {
// //     const [colorThemes, setColorThemes] = useState([]);
// //     const [logoUrl, setLogoUrl] = useState('');
// //     const api = useAxios();
// //    const { selectedColor, setSelectedColor, handleAddColor } = useColor();
// //   const [showColorPicker, setShowColorPicker] = useState(false);

// //   const handleChangeColor = (newColor) => {
// //     setSelectedColor(newColor.hex);
// //     setShowColorPicker(false); // Hide the color picker after selecting a color
// //   };

// //   const handleClickAddColor = () => {
// //     handleAddColor();
  
// //   };

// //     const getTopic = async () => {
// //         try {
// //             const response = await api.get('/machine/site_settings_api_for_logo/');
// //             if (response.data.success === 1) {
// //                 setLogoUrl(response.data.result.logo);
// //             } else {
// //                 console.error('Failed to fetch logo:', response.data.result);
// //             }
// //         } catch (error) {
// //             console.error('Error fetching logo:', error);
// //         }
// //     };

// //     const saveTopic = async (e) => {
// //         e.preventDefault();
// //         const form = e.currentTarget;
// //         if (form.checkValidity()) {
// //             const uploadData = new FormData(form);
// //             try {
// //                 const response = await api.post('/machine/tenant_upload_logo/', uploadData);
// //                 if (response.data.success === 1) {
// //                     alert('Logo uploaded successfully');
// //                     // Refresh the logo after successful upload
// //                     getTopic();
// //                 } else {
// //                     console.error('Failed to upload logo:', response.data.result);
// //                 }
// //             } catch (error) {
// //                 console.error('Error uploading logo:', error);
// //             }
// //         } else {
// //             console.log('Form validation failed');
// //         }
// //     };
// //     return (
// //         <div>
// //             <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc' }} className='px-5 pt-5 cardtop-container mx-4 mb-4'>
// //                 <CRow><h3> Select the Color Theme </h3> </CRow>
// //                 {/* <CRow className='mb-3'>
// //                     <div>
// //                         {colorThemes.map(theme => (
// //                             <div key={theme.id}>
// //                                 <h3>{theme.name}</h3>
// //                                 <div onClick={() => onThemeSelect(theme)} style={{ backgroundColor: theme.primary_color, width: '50px', height: '50px', cursor: 'pointer' }}></div>
// //                                 <div style={{ backgroundColor: theme.secondary_color, width: '50px', height: '50px' }}></div>
// //                                 <div style={{ color: theme.text_color }}>Sample Text</div>
// //                             </div>
// //                         ))}
// //                         <input type="color" value={selectedColor} onChange={handleColorChange} />
// //                     </div>
// //                 </CRow> */}
// //                <CRow className='mb-4'>
// //                 <CCol  md={6}><CButton style={{background:selectedColor}} onClick={() => setShowColorPicker(!showColorPicker)}>Select Color</CButton></CCol> 
    
// //       {/* </CRow>
// //       {/* Button to add/update color */}
// //      {/* <CRow> */}
// //          <CCol md={6}><CButton style={{background:selectedColor}} onClick={handleClickAddColor}>Add Color</CButton></CCol></CRow> 
// //            <CRow>
// //               {/* Color picker */}
// //       {showColorPicker && (
// //         <SketchPicker color={selectedColor} onChange={handleChangeColor} />
// //       )}
// //            </CRow>
// //             </CCard>
// //             <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc', transition: 'transform 0.3s ease' }} className='px-5 pt-5 cardtop-container mx-4'>
// //                 <h3>Upload Logo </h3>
// //                 <CForm onSubmit={saveTopic}>
// //                     <CRow className='mb-4'>
// //                         <CCol>
// //                             <CRow sm={12} className="mt-5 mb-5">
// //                                 <CCol sm={6}>
// //                                     <CFormLabel htmlFor="validationDefault01">
// //                                         Logo<span className="text-danger">*</span>
// //                                     </CFormLabel>
// //                                     <CFormInput type="file" id="logo" name="logo" required maxLength={50} size="sm" accept='.png , .jpg' />
// //                                     <CCol ><small>Image size must be 150 x 50 </small></CCol>
// //                                     <CFormFeedback invalid>Please Upload Logo</CFormFeedback>
// //                                 </CCol>
// //                             </CRow>
// //                         </CCol>
// //                         <CCol>
// //                             <CRow>Current Logo</CRow>
// //                             <CRow></CRow>
// //                             <CCol sm={6}>{logoUrl && <CCardImage src={logoUrl} width="100" height="120" alt="Current Logo" />}</CCol>
// //                         </CCol>
// //                     </CRow>
// //                     <CRow className="justify-content-center mb-4">
// //                         <CButton type="submit" color="primary" style={{ width: '100px', background: selectedColor, height: '35px' }}>Submit</CButton>
// //                     </CRow>
// //                 </CForm>
// //             </CCard>
// //         </div>
// //     );
// // }

// // export default ColorPalette;



// // // const ExampleComponent = () => {
// // //   const { selectedColor, setSelectedColor, handleAddColor } = useColor();
// // //   const [showColorPicker, setShowColorPicker] = useState(false);

// // //   const handleChangeColor = (newColor) => {
// // //     setSelectedColor(newColor.hex);
// // //   };

// // //   const handleClickAddColor = () => {
// // //     handleAddColor();
// // //   };

// // //   return (
// // //     <div>
     
// // //       {/* Button to toggle color picker */}
// // //      <CRow> <CButton onClick={() => setShowColorPicker(!showColorPicker)}>Select Color</CButton>
// // //       {/* Color picker */}
// // //       {showColorPicker && (
// // //         <SketchPicker color={selectedColor} onChange={handleChangeColor} />
// // //       )}
// // //       </CRow>
// // //       {/* Button to add/update color */}
// // //      <CRow> <CButton onClick={handleClickAddColor}>Add Color</CButton></CRow>
// // //     </div>
// // //   );
// // // };

// // // export default ExampleComponent;
// // import React, { useState, useEffect } from 'react';
// // import { useColor } from 'src/menu/adminsetting/colorcontext';
// // import axios from 'axios';
// // import { SketchPicker } from 'react-color';
// // import { CButton, CCard, CCol, CRow } from '@coreui/react-pro'; // Assuming these are CoreUI components
//  import React, { useState, useEffect } from 'react';
// import useAxios from 'src/utils/useAxios';
// import {
//     CButton,
//     CFormInput,
//     CForm,
//     CModal,
//     CModalHeader,
//     CModalTitle,
//     CModalBody,
//     CModalFooter,
//     CRow,
//     CFormFeedback,
//     CCol,
//     CFormLabel,
//     CImage,
//     CFormSelect,
//     CCardImage,
//     CCard
// } from '@coreui/react-pro';
// import CIcon from '@coreui/icons-react';
// import { cilPencil, cilCheck, cilArrowBottom } from '@coreui/icons';
// import { useColor } from 'src/menu/adminsetting/colorcontext';
// import axios from 'axios';
// import { SketchPicker } from 'react-color';
// import baseurl from 'src/utils/baseurl'
// import ivendlogo from 'src/assets/images/logo_ivendsoft_logo_2__1_-removebg-preview (1).png'

// const ColorPalette = () => {
//   const { selectedColor, setSelectedColor } = useColor('#2c8bde');
//   const [showColorPicker, setShowColorPicker] = useState(false);
//   const [logoUrl, setLogoUrl] = useState('');
//   const api = useAxios();
// const baseURL = baseurl()

// let [notes, setNotes] = useState([])

// const [errorMsg, setErrorMsg] = useState(false)
// const [isSuccess, setIsSuccess] = useState(false)
//   useEffect(() => {
//     getSavedColor();
//     // getTopic();
//   }, []);

//   const getSavedColor = async () => {
//     try {
//       const response = await axios.get(`${baseURL}/machine/colorstore/`);
//       if (response.data.success === 1 && response.data.result.length > 0) {
//         const lastColor = response.data.result[0].color_name;
//         setSelectedColor(lastColor);
//       } else {
//         console.error('Failed to retrieve color from database');
//       }
//     } catch (error) {
//       console.error('Error fetching color:', error);
//     }
//   };
//   const handleClickSelectColor = () => {
//     setShowColorPicker(!showColorPicker);
//     console.log("showColorPicker:", showColorPicker); // Add this line
//   };
//   const handleChangeColor = (newColor) => {
//     setSelectedColor(newColor.hex);
//     setShowColorPicker(false); // Hide the color picker after selecting a color
//   };
//   const handleClickAddColor = async () => {
//     try {
//       await axios.post(`${baseURL}/machine/colorstore/`, { color_name: selectedColor });
//       alert('Color added successfully!');
//       getSavedColor(); // Fetch the latest color after adding it
//     } catch (error) {
//       alert('Error adding color:', error);
//     }
//   };
// //======================================================================
// useEffect(() => {
//   getcreate_project()
// }, [])

// let getcreate_project = async () => {
//   let response = await api.get('/machine/site_settings_api_for_logo/')
//   if (response.data.success === 1) {
//     setNotes(response.data.result)
//   } else if (response.data.success === 0) {
//     for (let i = 0; i < Object.values(response.data.result).length; i++) {
//       let a = Object.values(response.data.result)[i]
//       alert(a)
//     }
//   }
// }

// const validateSelectedFile = (e) => {
//   const MIN_FILE_SIZE = 1 // 1kb
//   const MAX_FILE_SIZE = 100000 // 5MB
//   const fileSizeKiloBytes = e.target.files[0].size / 1024

//   if (fileSizeKiloBytes < MIN_FILE_SIZE) {
//     setErrorMsg('File size is less than minimum limit')
//     setIsSuccess(false)
//     return
//   }
//   if (fileSizeKiloBytes > MAX_FILE_SIZE) {
//     setErrorMsg('File size is greater than maximum limit')
//     setIsSuccess(false)
//     return
//   }
//   setErrorMsg('')
//   setIsSuccess(true)
// }
//   // const getTopic = async () => {
//   //   try {
//   //     const response = await api.get('/machine/site_settings_api_for_logo/');
//   //     if (response.data.success === 1) {
//   //       setLogoUrl(response.data.result.logo);
//   //     } else {
//   //       console.error('Failed to fetch logo:', response.data.result);
//   //     }
//   //   } catch (error) {
//   //     console.error('Error fetching logo:', error);
//   //   }
//   // };

//   // const saveTopic = async (e) => {
//   //   e.preventDefault();
//   //   const form = e.currentTarget;
//   //   if (form.checkValidity()) {
//   //     const uploadData = new FormData(form);
//   //     try {
//   //       const response = await api.post('/machine/tenant_upload_logo/', uploadData);
//   //       if (response.data.success === 1) {
//   //         alert('Logo uploaded successfully');
//   //         getTopic(); // Refresh the logo after successful upload
//   //       } else {
//   //         console.error('Failed to upload logo:', response.data.result);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error uploading logo:', error);
//   //     }
//   //   } else {
//   //     console.log('Form validation failed');
//   //   }
//   // };

//   return (
//     <div>
//       <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc' }} className='px-5 pt-5  mx-4 mb-4'>
//         <CRow><h3> Select the Color Theme </h3> </CRow>
//         <CRow className='mb-4'>
//           <CCol md={6}>
//             <CButton style={{ background: selectedColor }} onClick={() => setShowColorPicker(!showColorPicker)}>Select Color</CButton>
//           </CCol>
//           <CCol md={6}>
//             <CButton style={{ background: selectedColor }} onClick={handleClickAddColor}>Add Color</CButton>
//           </CCol>
//         </CRow>
//         <CRow>
//           {/* {showColorPicker && (
//             <SketchPicker color={selectedColor} onChange={handleChangeColor} />
//           )} */}
//           {showColorPicker && <SketchPicker color={selectedColor} onChange={handleChangeColor} />}
//         </CRow>
//       </CCard>
//       <CCard style={{ boxShadow: '1px 1px 1px 1px #ccc' }} className='px-5 pt-5   mx-4'>
//         {/* <h3>Upload Logo</h3>
//         <CForm onSubmit={saveTopic}>
//           <CRow className='mb-4'>
//             <CCol>
//               <CRow sm={12} className="mt-5 mb-5">
//                 <CCol sm={6}>
//                   <CFormLabel htmlFor="validationDefault01">
//                     Logo<span className="text-danger">*</span>
//                   </CFormLabel>
//                   <CFormInput type="file" id="logo" name="logo" required maxLength={50} size="sm" accept='.png , .jpg' />
//                   <CCol ><small>Image size must be 150 x 50 </small></CCol>
//                   <CFormFeedback invalid>Please Upload Logo</CFormFeedback>
//                 </CCol>
//               </CRow>
//             </CCol>
//             <CCol>
//               <CRow>Current Logo</CRow>
//               <CRow></CRow>
//               <CCol sm={6}>{logoUrl && <CCardImage src={logoUrl} width="100" height="120" alt="Current Logo" />}</CCol>
//             </CCol>
//           </CRow>
//           <CRow className="justify-content-center mb-4">
//             <CButton type="submit" color="primary" style={{ width: '100px', background: selectedColor, height: '35px' }}>Submit</CButton>
//           </CRow>
//         </CForm> */}
//           <h3 className='mb-3' style={{color:'#2C384A'}}>Logo</h3>
//       <CRow className="mb-3">
//         {(() => {
//           if (notes[0]?.logo1) {
//             return (
//               <>  
//                 <CCol sm={2} className="mb-4">
//                   Current Logo
//                 </CCol>
//                 <CCol sm={9} className="mb-4">
//                   <img src={baseurl + notes[0]?.logo1} height="100" width="100" alt="img" />
//                 </CCol>
//               </>
//             )
//           }
//         })()}
//         <CCol sm={2}>Upload Logo</CCol>
//         <CCol sm={9}>
//           <CFormInput
//             type="file"
//             id="logo"
//             accept="image/*"
//             onChange={validateSelectedFile}
//             name="logo"
//           />
//           <div>
//             <span>Min size: 1KB</span>&nbsp;&nbsp;
//             <span>Max size: 100MB</span>
//           </div>
//           {isSuccess ? <p className="text-success">File size is okay.</p> : null}
//           <p className="text-danger">{errorMsg}</p>

//           <CFormFeedback invalid>Please upload logo</CFormFeedback>
//         </CCol>
//       </CRow>
//       <CRow className="justify-content-center">
//         <CButton
//           type="submit"
//           size="lg"
//           className="aboutus-button mt-2 mb-2"
//           style={{ backgroundColor:selectedColor, color: 'white', border: 'none', width: '15%' }}
//         >
//           Submit
//         </CButton>
//       </CRow>
//       </CCard>
//     </div>
//   );
// };

// export default ColorPalette;
