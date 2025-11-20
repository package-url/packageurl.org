import React, { useRef, useState, useEffect } from 'react';
import styles from './styles.module.css';
// import tools from '@site/src/data/tools.json';
import tools from '@site/src/data/tools-2025-11-11.json';

/* --- Helper component for tooltip only when truncated --- */
function DescriptionWithTooltip({ description }) {
    const descRef = useRef(null);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        const el = descRef.current;
        if (el) {
            // 1px tolerance avoids false positives with line-clamp rounding
            const isOverflowing =
                el.scrollHeight - el.clientHeight > 1 ||
                el.scrollWidth - el.clientWidth > 1;
            setShowTooltip(isOverflowing);
        }
    }, [description]);

    return (
        <div className={styles.toolDescriptionWrapper}>
            <div
                ref={descRef}
                className={`${styles.toolDescription} ${styles.multiline}`}
            >
                {description}
            </div>
            {showTooltip && <div className={styles.tooltip}>{description}</div>}
        </div>
    );
}

export default function ToolGrid() {
    const [message, setMessage] = useState(null);
    const [selectedTool, setSelectedTool] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    // Close modal on Escape key
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                setSelectedTool(null);
                setActiveTab('overview');
            }
        }
        if (selectedTool) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedTool]);

    const handleLinkClick = (e, tool, linkType) => {
        if (
            linkType === 'homepage' &&
            (!tool.homepage ||
                tool.homepage === '#' ||
                tool.homepage === 'under-construction')
        ) {
            e.preventDefault();
            setMessage(`"${tool.name}" is under construction.`);
            // setTimeout(() => setMessage(null), 2500);
            setTimeout(() => setMessage(null), 5000);
        } else if (
            linkType === 'download' &&
            (!tool.download ||
                tool.download === '#' ||
                tool.download === 'under-construction')
        ) {
            e.preventDefault();
            setMessage(`"${tool.name}" is under construction.`);
            // setTimeout(() => setMessage(null), 2500);
            setTimeout(() => setMessage(null), 5000);
        } else if (
            linkType === 'download' &&
            tool.download &&
            tool.download.toLowerCase().includes('no packages found')
        ) {
            e.preventDefault();
            setMessage(`No download packages found for "${tool.name}".`);
            // setTimeout(() => setMessage(null), 2500);
            setTimeout(() => setMessage(null), 5000);
        }
    };

    const closeModal = () => {
        setSelectedTool(null);
        setActiveTab('overview');
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

                            {/* ✅ Replace old description block with helper */}
                            <DescriptionWithTooltip
                                description={tool.description}
                            />

                            <ul className={styles.toolMeta}>
                                <li>
                                    <strong>Base language:</strong>{' '}
                                    {tool.language}
                                </li>
                                <li>
                                    <strong>License:</strong> {tool.license}
                                </li>
                            </ul>
                            {/* The links at the bottom of the main page: */}
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
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleLinkClick(
                                                e,
                                                tool,
                                                'homepage'
                                            );
                                        }}
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
                                        rel='noopener noreferrer'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleLinkClick(
                                                e,
                                                tool,
                                                'download'
                                            );
                                        }}
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
                <div className={styles.modalBackdrop} onClick={closeModal}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Tabs */}
                        <div className={styles.modalTabs}>
                            <button
                                className={`${styles.tab} ${
                                    activeTab === 'overview'
                                        ? styles.tabActive
                                        : ''
                                }`}
                                onClick={() => setActiveTab('overview')}
                            >
                                Overview
                            </button>
                            <button
                                className={`${styles.tab} ${
                                    activeTab === 'details'
                                        ? styles.tabActive
                                        : ''
                                }`}
                                onClick={() => setActiveTab('details')}
                            >
                                Details
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className={styles.modalBody}>
                            {activeTab === 'overview' && (
                                <>
                                    <div className={styles.fullWidthSection}>
                                        <h2>{selectedTool.name}</h2>
                                        <p>{selectedTool.description}</p>
                                    </div>

                                    <div className={styles.twoColumnSection}>
                                        <div className={styles.column}>
                                            <h3>Technical Info</h3>
                                            <ul>
                                                <li>
                                                    <strong>Language:</strong>{' '}
                                                    {selectedTool.language}
                                                </li>
                                                <li>
                                                    <strong>License:</strong>{' '}
                                                    {selectedTool.license}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className={styles.column}>
                                            <h3>Links</h3>
                                            <div className={styles.modalLinks}>
                                                {selectedTool.homepage && (
                                                    <a
                                                        href={
                                                            selectedTool.homepage
                                                        }
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                    >
                                                        Homepage
                                                    </a>
                                                )}
                                                {selectedTool.download && (
                                                    <a
                                                        href={
                                                            selectedTool.download
                                                        }
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                    >
                                                        Download
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {activeTab === 'details' && (
                                <div className={styles.twoColumnSection}>
                                    <div className={styles.column}>
                                        <h3>Column 1</h3>
                                        <p>
                                            Additional details about{' '}
                                            {selectedTool.name} can go here.
                                        </p>
                                    </div>
                                    <div className={styles.column}>
                                        <h3>Column 2</h3>
                                        <p>
                                            More information can be displayed in
                                            this column.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Close button */}
                        <div className={styles.modalFooter}>
                            <button
                                className={styles.closeButton}
                                onClick={closeModal}
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
