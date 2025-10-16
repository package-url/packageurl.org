import React, { useState } from 'react';
import styles from './styles.module.css';
// import tools from '@site/src/data/tools.json'; // or JS module

// new .js module
// import getTools from "./getTools";
// import getTools from "@site/src/data/getTools";
// import getTools from "../../data/getTools";

import getTools from "@site/src/data/getTools";


export default function ToolGrid() {
//   const [selectedTool, setSelectedTool] = useState(null);
  const tools = getTools();
  const [selectedTool, setSelectedTool] = useState(null);

  // 2025-10-16 Thursday 10:19:25.  Add ESC key close
  // Allow ESC key to close modal
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setSelectedTool(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
              <h3 className={styles.toolName}>{tool.name}</h3>
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
              <li><strong>Base language:</strong> {selectedTool.base_language}</li>
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
