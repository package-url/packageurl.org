import React, { useEffect, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import getTools from "@site/src/data/getTools";
import styles from "./styles.module.css";

export default function ToolGrid() {
  const { siteConfig } = useDocusaurusContext();
  const { baseUrl } = siteConfig;
  const tools = getTools(baseUrl);

  const [selectedTool, setSelectedTool] = useState(null);

  // ✅ ESC key support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedTool(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
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
            <img
              src={tool.logo}
              alt={tool.name}
              className={styles.toolLogo}
            />
            <span>{tool.name}</span>
          </div>
        ))}
      </div>


      {selectedTool && (
        <div className={styles.modalBackdrop} onClick={() => setSelectedTool(null)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{selectedTool.name}</h3>
            <p>{selectedTool.description}</p>
            <p><strong>Language:</strong> {selectedTool.language}</p>
            <p><strong>License:</strong> {selectedTool.license}</p>
            <p>
              <a href={selectedTool.homepage} target="_blank" rel="noopener noreferrer">
                Homepage
              </a>
            </p>
            {selectedTool.download && (
              <p>
                <a href={selectedTool.download} target="_blank" rel="noopener noreferrer">
                  Download
                </a>
              </p>
            )}
            <button onClick={() => setSelectedTool(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
