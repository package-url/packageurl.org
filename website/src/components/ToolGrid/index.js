// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import tools from '@site/src/data/tools.json'; // or JS module

export default function ToolGrid() {
  const [selectedTool, setSelectedTool] = useState(null);


  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setSelectedTool(null);
      }
    }

    if (selectedTool) {
      window.addEventListener('keydown', handleKeyDown);
    }

    // Cleanup when modal closes or component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedTool]);


  return (
    <div className={styles.toolGridWrapper}>
      <div className={styles.toolGridContainer}>
        <div className={styles.toolGrid}>
          {tools.map((tool, idx) => (
            <div
              key={idx}
              className={styles.toolCard}
              onClick={() => setSelectedTool(tool)}
            >
              {/* <img src={tool.logo} alt={tool.name} className={styles.toolLogo} /> */}
              {/* <h3 className={styles.toolName}>{tool.name}</h3> */}
              <h3 className={styles.toolName} style={{ marginBottom: '.5rem' }}>{tool.name}</h3>

            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedTool && (
        <div className={styles.modalBackdrop} onClick={() => setSelectedTool(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>{selectedTool.name}</h2>
            <p>{selectedTool.description}</p>
            <ul className={styles.toolMeta}>
              <li><strong>Base language:</strong> {selectedTool.language}</li>
              <li><strong>License:</strong> {selectedTool.license}</li>
            </ul>
            <div className={styles.toolLinks}>
              <a href={selectedTool.homepage} target="_blank" rel="noopener noreferrer">
                Home
              </a>
              {selectedTool.download && (
                <a href={selectedTool.download} target="_blank" rel="noopener noreferrer">
                  Download
                </a>
              )}
            </div>
            <button className={styles.modalClose} onClick={() => setSelectedTool(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
