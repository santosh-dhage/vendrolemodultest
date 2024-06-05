import React, { useState } from 'react';

const YourComponent = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [activeSubmodule, setActiveSubmodule] = useState(null);

  const modules = [
    {
      id: 1,
      name: 'Module 1',
      submodules: [
        { id: 11, name: 'Submodule 1.1' },
        { id: 12, name: 'Submodule 1.2' },
      ],
    },
    {
      id: 2,
      name: 'Module 2',
      submodules: [
        { id: 21, name: 'Submodule 2.1' },
        { id: 22, name: 'Submodule 2.2' },
      ],
    },
    // Add more modules and submodules as needed
  ];
  

  const handleModuleClick = (moduleId) => {
    setActiveModule(moduleId);
    setActiveSubmodule(null); // Reset active submodule when a module is clicked
  };

  const handleSubmoduleClick = (submoduleId) => {
    setActiveSubmodule(submoduleId);
  };

  return (
    <div>
      {/* Header or Navbar with background color #2A409A */}
      <nav style={{ backgroundColor: '#2A409A' }}>
        {/* Your header/navbar content */}
      </nav>

      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ backgroundColor: 'white' }}>
          {/* Module list */}
          {modules.map((module) => (
            <div
              key={module.id}
              onClick={() => handleModuleClick(module.id)}
              style={{
                backgroundColor: activeModule === module.id ? '#D3D9F1' : 'transparent',
                color: '#2A409A',
              }}
            >
              {module.name}
              {/* Submodule list */}
              {module.submodules.map((submodule) => (
                <div
                  key={submodule.id}
                  onClick={() => handleSubmoduleClick(submodule.id)}
                  style={{
                    paddingLeft: '20px', // Adjust indentation for submodules
                    backgroundColor: activeSubmodule === submodule.id ? '#D3D9F1' : 'transparent',
                    color: '#2A409A',
                  }}
                >
                  {submodule.name}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div>
          {/* Your main content */}
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
