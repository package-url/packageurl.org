// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import tools from '@site/src/data/tools.json';

export default function ToolGrid() {
    const [message, setMessage] = useState(null);
    const [selectedTool, setSelectedTool] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    // Close with esc
    useEffect(() => {
        if (selectedTool) {
            const handleKeyDown = (e) => {
                if (e.key === 'Escape') {
                    setSelectedTool(null);
                }
            };
            window.addEventListener('keydown', handleKeyDown);

            // Move focus into the modal (first button, link, or input)
            const firstFocusable = document.querySelector(
                `.${styles.modal} button, .${styles.modal} a, .${styles.modal} input`
            );
            if (firstFocusable) firstFocusable.focus();

            // Cleanup when modal closes or component unmounts
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [selectedTool]);

    const handleLinkClick = (e, tool, linkType) => {
        // 2025-10-25 Saturday 15:33:18.  Prevent bubbling to parent card so clicking link won't also open modal  ;-)
        e.stopPropagation();
        // Intercept "under construction" or missing links
        if (
            (linkType === 'homepage' &&
                (!tool.homepage ||
                    tool.homepage === '#' ||
                    tool.homepage === 'under-construction')) ||
            (linkType === 'download' &&
                (!tool.download ||
                    tool.download === '#' ||
                    tool.download === 'under-construction')) ||
            (linkType === 'download' &&
                tool.download &&
                tool.download.toLowerCase().includes('no packages found'))
        ) {
            e.preventDefault();
            setMessage(`"${tool.name}" is under construction.`);
            setTimeout(() => setMessage(null), 2500);
        }
    };

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
                                        rel="noopener noreferrer"
                                        onClick={(e) =>
                                            handleLinkClick(e, tool, 'homepage')
                                        }
                                    >
                                        Home
                                    </a>
                                )}
                                {tool.download && (
                                    <a
                                        href={tool.download}
                                        target={
                                            tool.download.startsWith('http')
                                                ? '_blank'
                                                : '_self'
                                        }
                                        rel="noopener noreferrer"
                                        onClick={(e) =>
                                            handleLinkClick(e, tool, 'download')
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

            {/* Popup message */}
            {message && <div className={styles.popupMessage}>{message}</div>}

            {/* Modal */}
            {selectedTool && (
                <div
                    className={styles.modalBackdrop}
                    onClick={() => setSelectedTool(null)}
                >
                    <div
                        className={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Tabs */}
                        <div className={styles.modalTabs}>
                            <button
                                className={`${styles.tabButton} ${
                                    activeTab === 'overview'
                                        ? styles.activeTab
                                        : ''
                                }`}
                                onClick={() => setActiveTab('overview')}
                            >
                                Overview
                            </button>
                            <button
                                className={`${styles.tabButton} ${
                                    activeTab === 'details'
                                        ? styles.activeTab
                                        : ''
                                }`}
                                onClick={() => setActiveTab('details')}
                            >
                                Details
                            </button>
                        </div>

                        {/* Tab content */}
                        <div className={styles.modalContent}>
                            {activeTab === 'overview' ? (
                                <div className={styles.tabOverview}>
                                    <div className={styles.topSection}>
                                        <h2>{selectedTool.name}</h2>
                                        <p>{selectedTool.description}</p>
                                    </div>
                                    <div className={styles.bottomSection}>
                                        <div className={styles.column}>
                                            <h3>Language</h3>
                                            <p>{selectedTool.language}</p>
                                        </div>
                                        <div className={styles.column}>
                                            <h3>License</h3>
                                            <p>{selectedTool.license}</p>
                                        </div>

                                        <div className={styles.column}>
                                            <h3>Header A</h3>
                                            <p>Some content.</p>
                                        </div>
                                        <div className={styles.column}>
                                            <h3>Header B</h3>
                                            <p>Some content.</p>
                                        </div>
                                        <div className={styles.column}>
                                            <h3>Header C</h3>
                                            <p>Some content.</p>
                                        </div>
                                        <div className={styles.column}>
                                            <h3>Header D</h3>
                                            <p>Some content.</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.tabDetails}>
                                    <div className={styles.column}>
                                        <h3>Homepage</h3>
                                        <a
                                            href={selectedTool.homepage}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {selectedTool.homepage}
                                        </a>
                                    </div>
                                    <div className={styles.column}>
                                        <h3>Download</h3>
                                        <a
                                            href={selectedTool.download}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {selectedTool.download}
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className={styles.modalActions}>
                            <button
                                className={styles.closeButton}
                                onClick={() => setSelectedTool(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
