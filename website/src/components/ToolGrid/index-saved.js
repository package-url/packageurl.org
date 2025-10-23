import React, { useState } from 'react';
import styles from './styles.module.css';
import tools from '@site/src/data/tools.json';

export default function ToolGrid() {
    const [message, setMessage] = useState(null);

    const handleLinkClick = (e, tool) => {
        // If homepage looks like a placeholder or is missing, intercept click
        if (
            !tool.homepage ||
            tool.homepage === '#' ||
            tool.homepage === 'under-construction'
        ) {
            e.preventDefault();
            setMessage(`"${tool.name}" is under construction.`);
            // Automatically clear the message after a few seconds
            setTimeout(() => setMessage(null), 2500);
        }
        // If download contains 'no packages found', intercept click
        else if (
            tool.download &&
            tool.download.toLowerCase().includes('no packages found')
        ) {
            e.preventDefault();
            setMessage(`No download packages found for "${tool.name}".`);
            // Automatically clear the message after a few seconds
            setTimeout(() => setMessage(null), 2500);
        }
    };

    return (
        <div className={styles.toolGridWrapper}>
            <div className={styles.toolGridContainer}>
                <div className={styles.toolGrid}>
                    {tools.map((tool, idx) => (
                        <div key={idx} className={styles.toolCard}>
                            <h3 className={styles.toolName}>{tool.name}</h3>
                            <p className={styles.toolDescription}>
                                {tool.description}
                            </p>
                            <ul className={styles.toolMeta}>
                                <li>
                                    <strong>Base language:</strong>{' '}
                                    {tool.language}
                                </li>
                                <li>
                                    <strong>License:</strong> {tool.license}
                                </li>
                            </ul>

                            <div className={styles.toolLinks}>
                                {tool.homepage && (
                                    <a
                                        href={tool.homepage}
                                        target={
                                            tool.homepage.startsWith('http')
                                                ? '_blank'
                                                : '_self'
                                        }
                                        rel='noopener noreferrer'
                                        onClick={(e) =>
                                            handleLinkClick(e, tool)
                                        }
                                    >
                                        Home
                                    </a>
                                )}
                                {tool.download && (
                                    <a
                                        href={tool.download}
                                        // target='_blank'
                                        target={
                                            // tool.homepage.startsWith('http')
                                            tool.download.startsWith('http')
                                                ? '_blank'
                                                : '_self'
                                        }
                                        rel='noopener noreferrer'
                                        onClick={(e) =>
                                            handleLinkClick(e, tool)
                                        }
                                    >
                                        Download
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

      {/* Popup message appears here */}
      {message && (
        <div className={styles.popupMessage}>
          {message}
        </div>
      )}

        </div>
    );
}
