import React from 'react';
import styles from './styles.module.css';
import tools from '@site/src/data/tools.json'; // ← easy import

export default function ToolGrid() {
  return (
    <div className={styles.toolGridWrapper}>
      <div className={styles.toolGridContainer}>
        <div className={styles.toolGrid}>
          {tools.map((tool, idx) => (
            <div key={idx} className={styles.toolCard}>
              <img
                src={tool.logo}
                alt={tool.name}
                className={styles.toolLogo}
              />
              <h3 className={styles.toolName}>{tool.name}</h3>
              <p className={styles.toolDescription}>{tool.description}</p>
              <ul className={styles.toolMeta}>
                <li><strong>Language:</strong> {tool.language}</li>
                <li><strong>License:</strong> {tool.license}</li>
              </ul>
              <div className={styles.toolLinks}>
                <a href={tool.homepage} target="_blank" rel="noopener noreferrer">
                  Home
                </a>
                {tool.download && (
                  <a href={tool.download} target="_blank" rel="noopener noreferrer">
                    Download
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
