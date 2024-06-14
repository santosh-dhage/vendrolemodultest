
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import baseurl from 'src/utils/baseurl';
// import useAxios from 'src/utils/useAxios'; // Add this import

// const ColorContext = createContext();
// const baseURL = baseurl();

// export const ColorProvider = ({ children }) => {
//   const [selectedColor, setSelectedColor] = useState('#2c8bde');

//   useEffect(() => {
//     getColorForLastId();
//   }, []);

//   const getColorForLastId = async () => {
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

//   const handleAddColor = async () => {
//     try {
//       await axios.post(`${baseURL}/machine/colorstore/`, { color_name: selectedColor });
//       // alert('Color added successfully!');
//     } catch (error) {
//       alert('Error adding color:', error);
//     }
//   };

//   return (
//     <ColorContext.Provider value={{ selectedColor, setSelectedColor, handleAddColor }}>
//       {children}
//     </ColorContext.Provider>
//   );
// };

// export const useColor = () => useContext(ColorContext);
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import baseurl from 'src/utils/baseurl';

// const ColorContext = createContext();
// const baseURL = baseurl();

// export const ColorProvider = ({ children }) => {
//   const [selectedColor, setSelectedColor] = useState('#2c8bde');
//   const [fontColor, setFontColor] = useState('white'); // Initialize with default font color

//   useEffect(() => {
//     getColorForLastId();
//   }, []);

//   useEffect(() => {
//     setFontColor(calculateFontColor(selectedColor));
//   }, [selectedColor]);

//   const getColorForLastId = async () => {
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

//   const handleAddColor = async () => {
//     try {
//       await axios.post(`${baseURL}/machine/colorstore/`, { color_name: selectedColor });
//       // alert('Color added successfully!');
//     } catch (error) {
//       alert('Error adding color:', error);
//     }
//   };

//   const calculateFontColor = (color) => {
//     const hexColor = color.substring(1);
//     const r = parseInt(hexColor.substring(0, 2), 16);
//     const g = parseInt(hexColor.substring(2, 4), 16);
//     const b = parseInt(hexColor.substring(4, 6), 16);
//     const brightness = (r * 299 + g * 587 + b * 114) / 1000;
//     return brightness > 128 ? 'black' : 'white';
//   };

//   return (
//     <ColorContext.Provider value={{ selectedColor, setSelectedColor, handleAddColor, fontColor }}>
//       {children}
//     </ColorContext.Provider>
//   );
// };

// export const useColor = () => useContext(ColorContext);
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import baseurl from 'src/utils/baseurl';
// import AuthContext from 'src/context/AuthContext'; // Import the AuthContext

// const ColorContext = createContext();
// const baseURL = baseurl();

// export const ColorProvider = ({ children }) => {
//   const { authTokens } = useContext(AuthContext);

//   const [selectedColor, setSelectedColor] = useState(null); // Set initial selected color to null
//   const [fontColor, setFontColor] = useState('white'); // Initialize with default font color

//   useEffect(() => {
//     getColorForLastId();
//   }, []);

//   useEffect(() => {
//     setFontColor(calculateFontColor(selectedColor));
//   }, [selectedColor]);

//   const getColorForLastId = async () => {
//     try {
//       const response = await axios.get(`${baseURL}/machine/colorstore/`);

//       if (response.data.success === 1 && response.data.result.length > 0) {
//         const lastColor = response.data.result[0].color_name;
//         setSelectedColor(lastColor);
//       } else {
//         console.error('Failed to retrieve color from database');
//         setSelectedColor('#2c8bde'); // Use default color if no color is retrieved
//       }
//     } catch (error) {
//       console.error('Error fetching color:', error);
//       setSelectedColor('#2c8bde'); // Use default color in case of error
//     }
//   };
  

//   const handleAddColor = async () => {
//     try {
//       if (!authTokens?.access) {
//         throw new Error('No token found');
//       }

//       console.log('Token:', authTokens.access); // Debugging: Check the token value

//       await axios.post(`${baseURL}/machine/colorstore/`,
//         { color_name: selectedColor },
//         {
//           headers: {
//             'Authorization': `Bearer ${authTokens.access}`,
//           }
//         }
//       );
//       alert('Color added successfully!');
//     } catch (error) {
//       alert('Error adding color:', error);
//     }
//   };

//   const calculateFontColor = (color) => {
//     if (!color) return 'white'; // Use default font color if color is null or undefined
//     const hexColor = color.substring(1);
//     const r = parseInt(hexColor.substring(0, 2), 16);
//     const g = parseInt(hexColor.substring(2, 4), 16);
//     const b = parseInt(hexColor.substring(4, 6), 16);
//     const brightness = (r * 299 + g * 587 + b * 114) / 1000;
//     return brightness > 128 ? 'black' : 'white';
//   };
//   return (
//     <ColorContext.Provider value={{ selectedColor, setSelectedColor, handleAddColor, fontColor }}>
//       {children}
//     </ColorContext.Provider>
//   );
// };

// export const useColor = () => useContext(ColorContext);

//test
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import baseurl from 'src/utils/baseurl';
import AuthContext from 'src/context/AuthContext';

const ColorContext = createContext();
const baseURL = baseurl();

export const ColorProvider = ({ children }) => {
  const { authTokens } = useContext(AuthContext);
  const initialColor = localStorage.getItem('selectedColor') || '#2c8bde';
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [fontColor, setFontColor] = useState('white');

  useEffect(() => {
    getColorForLastId();
  }, []);

  useEffect(() => {
    setFontColor(calculateFontColor(selectedColor));
    localStorage.setItem('selectedColor', selectedColor);
  }, [selectedColor]);

  const getColorForLastId = async () => {
    try {
      const response = await axios.get(`${baseURL}/machine/colorstore/`);
      if (response.data.success === 1 && response.data.result.length > 0) {
        const lastColor = response.data.result[0].color_name;
        setSelectedColor(lastColor);
      } else {
        console.error('Failed to retrieve color from database');
      }
    } catch (error) {
      console.error('Error fetching color:', error);
    }
  };

  const handleAddColor = async () => {
    try {
      if (!authTokens?.access) {
        throw new Error('No token found');
      }
      const response = await axios.post(
        `${baseURL}/machine/colorstore/`,
        { color_name: selectedColor },
        {
          headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'x-api-key': process.env.REACT_APP_API_KEY
          }
        }
      );
      alert('Color added successfully!');
    } catch (error) {
      alert('Error adding color:', error);
    }
  };

  const calculateFontColor = (color) => {
    const hexColor = color.substring(1);
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? 'black' : 'white';
  };

  return (
    <ColorContext.Provider value={{ selectedColor, setSelectedColor, handleAddColor, fontColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => useContext(ColorContext);
