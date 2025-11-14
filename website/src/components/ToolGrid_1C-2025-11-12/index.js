import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import tools from '@site/src/data/tools-2025-11-11.json';

export default function ToolGrid() {
    const [message, setMessage] = useState(null);
    const [selectedTool, setSelectedTool] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    // Monitor open modal -- state prevents display of main-page alert
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (tool) => {
        setSelectedTool(tool); // sets modal content
    };
    // Use a separate state for the modal alert
    const [modalMessage, setModalMessage] = useState(null);

    // Limit when the tooltip appears
    function DescriptionWithTooltip({ text }) {
        const descRef = React.useRef(null);
        const [showTooltip, setShowTooltip] = React.useState(false);

        React.useEffect(() => {
            const el = descRef.current;
            if (el) {
                // check if content is overflowing its container
                setShowTooltip(
                    el.scrollHeight > el.clientHeight ||
                        el.scrollWidth > el.clientWidth
                );
            }
        }, [text]);

        return (
            <div className={styles.toolDescriptionWrapper}>
                <div
                    ref={descRef}
                    className={`${styles.toolDescription} ${styles.multiline}`}
                >
                    {text}
                </div>
                {showTooltip && <div className={styles.tooltip}>{text}</div>}
            </div>
        );
    }

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

    const handleMainLinkClick = (e, tool, linkType) => {
        if (
            linkType === 'homepage' &&
            (!tool.homepage ||
                tool.homepage === '#' ||
                tool.homepage === 'N/A' ||
                tool.homepage === 'under-construction')
        ) {
            e.preventDefault();
            setMessage(`"${tool.name}" is under construction.`);
            setTimeout(() => setMessage(null), 2500);
        } else if (
            linkType === 'source_download' &&
            (!tool.source_download ||
                tool.source_download === '#' ||
                tool.source_download === 'N/A' ||
                tool.source_download === 'under-construction')
        ) {
            e.preventDefault();
            setMessage(`"${tool.name}" is under construction.`);
            setTimeout(() => setMessage(null), 2500);
        } else if (
            linkType === 'source_download' &&
            tool.source_download &&
            tool.source_download.toLowerCase().includes('no packages found')
        ) {
            e.preventDefault();
            setMessage(`No download packages found for "${tool.name}".`);
            setTimeout(() => setMessage(null), 2500);
        }
    };

    const handleLinkClick = (e, tool, linkType) => {
        e.preventDefault();
        e.stopPropagation();

        let message = null;

        if (
            linkType === 'homepage' &&
            (!tool.homepage ||
                tool.homepage === '#' ||
                tool.homepage === 'N/A' ||
                tool.homepage === 'under-construction')
        ) {
            message = `"${tool.name}" is under construction.`;
        } else if (
            linkType === 'source_download' &&
            (!tool.source_download ||
                tool.source_download === '#' ||
                tool.source_download === 'N/A' ||
                tool.source_download === 'under-construction')
        ) {
            message = `"${tool.name}" is under construction.`;
        } else if (
            linkType === 'source_download' &&
            tool.source_download &&
            tool.source_download.toLowerCase().includes('no packages found')
        ) {
            message = `No download packages found for "${tool.name}".`;
        }

        if (message) {
            setModalMessage(message);
            setTimeout(() => setModalMessage(null), 2500);
        } else {
            // manually open the valid link if it passed checks
            const url =
                linkType === 'homepage' ? tool.homepage : tool.source_download;
            window.open(url, '_blank', 'noopener noreferrer');
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
                            onClick={() => openModal(tool)}
                        >
                            <h3 className={styles.toolName}>{tool.name}</h3>

                            <div className={styles.toolDescriptionWrapper}>
                                <DescriptionWithTooltip
                                    text={tool.description}
                                />
                            </div>

                            <ul className={styles.toolMeta}>
                                <li>
                                    <strong>Base language:</strong>{' '}
                                    {tool.language}
                                </li>
                                <li>
                                    <strong>License:</strong> {tool.license}
                                </li>
                                <li>
                                    <strong>Functions:</strong> {tool.functions}
                                </li>
                            </ul>
                            {/* 2025-11-13 Thursday 12:01:06.  The links at the bottom of the main page: */}
                            <div className={styles.toolLinks}>
                                <span style={{ fontWeight: 'bold' }}>
                                    Home:{' '}
                                </span>
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
                                            handleMainLinkClick(
                                                e,
                                                tool,
                                                'homepage'
                                            );
                                        }}
                                    >
                                        {tool.homepage}
                                    </a>
                                )}
                                {/* {tool.download && (
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
                                            handleMainLinkClick(
                                                e,
                                                tool,
                                                'download'
                                            );
                                        }}
                                    >
                                        Download
                                    </a>
                                )} */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popup message */}
            {/* {message && <div className={styles.popupMessage}>{message}</div>} */}
            {/* 2025-11-13 Thursday 11:11:39.  Don't display this message if the modal is open. */}
            {!isModalOpen && message && (
                // <div className={styles.popupMessage}>{message}</div>
                <div className={styles.modalAlertOverlay_main}>{message}</div>
            )}

            {/* Modal */}
            {selectedTool && (
                <div className={styles.modalBackdrop} onClick={closeModal}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className={styles.modalBody}>
                            <>
                                {/* Full width section */}
                                <div className={styles.fullWidthSection}>
                                    <h2>{selectedTool.name}</h2>
                                    <p>{selectedTool.description}</p>
                                </div>

                                {/* Two column section */}
                                <div className={styles.twoColumnSection}>
                                    <div className={styles.column}>
                                        {/* <h3>Technical Info</h3> */}
                                        <ul>
                                            <li>
                                                <strong>Base language:</strong>{' '}
                                                {selectedTool.language}
                                            </li>
                                            <li>
                                                <strong>License:</strong>{' '}
                                                {selectedTool.license}
                                            </li>
                                            <li>
                                                <strong>Functions:</strong>{' '}
                                                {selectedTool.functions}
                                            </li>
                                            <li>
                                                <strong>Type:</strong>{' '}
                                                {selectedTool.type}
                                            </li>
                                            <li>
                                                <strong>Standards:</strong>{' '}
                                                {selectedTool.standards}
                                            </li>
                                            <li>
                                                <strong>Platform:</strong>{' '}
                                                {selectedTool.platform}
                                            </li>
                                        </ul>
                                    </div>

                                    <div className={styles.column}>
                                        {/* <h3>Links</h3> */}
                                        <div className={styles.modalLinks01}>
                                            <span
                                                style={{ fontWeight: 'bold' }}
                                            >
                                                Home:{' '}
                                            </span>
                                            {selectedTool.homepage && (
                                                <a
                                                    href={selectedTool.homepage}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    onClick={(e) =>
                                                        handleLinkClick(
                                                            e,
                                                            selectedTool,
                                                            'homepage'
                                                        )
                                                    }
                                                >
                                                    {/* Homepage?? */}
                                                    {selectedTool.homepage}
                                                </a>
                                            )}
                                        </div>
                                        {/* <div className={styles.toolLinks}> */}
                                        <div className={styles.modalLinks01}>
                                            {/* {selectedTool.download && (
                                                <a
                                                    href={selectedTool.download}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    onClick={(e) =>
                                                        handleLinkClick(
                                                            e,
                                                            selectedTool,
                                                            'download'
                                                        )
                                                    }
                                                >
                                                    Download
                                                </a>
                                            )} */}
                                            <span
                                                style={{ fontWeight: 'bold' }}
                                            >
                                                Source download:{' '}
                                            </span>
                                            {selectedTool.source_download && (
                                                <a
                                                    href={
                                                        selectedTool.source_download
                                                    }
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    onClick={(e) =>
                                                        handleLinkClick(
                                                            e,
                                                            selectedTool,
                                                            'source_download'
                                                        )
                                                    }
                                                >
                                                    {/* Source download */}
                                                    {selectedTool.source_download}
                                                </a>
                                            )}
                                        </div>

                                        <div className={styles.modalLinks01}>
                                            <span
                                                style={{ fontWeight: 'bold' }}
                                            >
                                                Package download:{' '}
                                            </span>
                                            {selectedTool.package_download && (
                                                <a
                                                    href={
                                                        selectedTool.package_download
                                                    }
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    onClick={(e) =>
                                                        handleLinkClick(
                                                            e,
                                                            selectedTool,
                                                            'package_download'
                                                        )
                                                    }
                                                >
                                                    {selectedTool.package_download}
                                                </a>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </>
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
                        {/* 2025-11-13 Thursday 10:54:03.  Try to display alert inside open modal. */}
                        {/* {message && (
                            <div className={styles.modalAlert}>{message}</div>
                        )} */}

                        {/* {message && (
                            <div className={styles.modalAlertOverlay}>
                                {message}
                            </div>
                        )} */}

                        {modalMessage && (
                            <div className={styles.modalAlertOverlay}>
                                {modalMessage}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {/* end of modal */}
        </div>
    );
}
