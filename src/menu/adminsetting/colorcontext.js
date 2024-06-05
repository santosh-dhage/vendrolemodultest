
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
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import baseurl from 'src/utils/baseurl';

const ColorContext = createContext();
const baseURL = baseurl();

export const ColorProvider = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState('#2c8bde');
  const [fontColor, setFontColor] = useState('white'); // Initialize with default font color

  useEffect(() => {
    getColorForLastId();
  }, []);

  useEffect(() => {
    setFontColor(calculateFontColor(selectedColor));
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
      await axios.post(`${baseURL}/machine/colorstore/`, { color_name: selectedColor });
      // alert('Color added successfully!');
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
