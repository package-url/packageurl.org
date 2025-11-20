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
                tool.homepage === 'N/A')
        ) {
            e.preventDefault();
            setMessage(`A homepage is not available for "${tool.name}".`);
            setTimeout(() => setMessage(null), 2500);
        } else if (
            linkType === 'homepage' &&
            (!tool.homepage ||
                tool.homepage === 'TBD')
        ) {
            e.preventDefault();
            setMessage(`The homepage field is under construction for "${tool.name}".`);
            setTimeout(() => setMessage(null), 2500);
        } else if (
            linkType === 'source_download' &&
            (!tool.source_download ||
                tool.source_download === 'N/A')
        ) {
            e.preventDefault();
            setMessage(`A source download URL is not available for "${tool.name}".`);
            setTimeout(() => setMessage(null), 2500);
        } else if (
            linkType === 'source_download' &&
            (!tool.source_download ||
                tool.source_download === 'N/A')
        ) {
            e.preventDefault();
            setMessage(`The source download field is under construction for "${tool.name}".`);
            setTimeout(() => setMessage(null), 2500);
        }
    };

    // Experiment with mapping
    const LINK_META = {
        homepage: {
            field: 'homepage',
            missingMessage: (name) => `The homepage has not yet been determined for "${name}".`,
        },
        source_download: {
            field: 'source_download',
            missingMessage: (name) => `The source download URL has not yet been determined for "${name}".`,
        },
        package_download: {
            field: 'package_download',
            missingMessage: (name) => `The package download URL has not yet been determined for "${name}".`,
        },
    };

    const INVALID_VALUES = ['#', 'N/A', 'under-construction', 'TBD', null, undefined];

    const isMissing = (value) => INVALID_VALUES.includes(value) || value === '';

    const handleLinkClick = (e, tool, linkType) => {
        e.preventDefault();
        e.stopPropagation();

        const meta = LINK_META[linkType];
        if (!meta) return; // if an unknown linkType is passed

        const value = tool[meta.field];
        const name = tool.name;

        // Generic missing/invalid link
        if (isMissing(value)) {
            setModalMessage(meta.missingMessage(name));
            setTimeout(() => setModalMessage(null), 2500);
            return;
        }

        // Optional special validation (e.g., “no packages found”)
        if (meta.specialInvalid && meta.specialInvalid(value)) {
            setModalMessage(meta.specialMessage(name));
            setTimeout(() => setModalMessage(null), 2500);
            return;
        }

        // Otherwise: valid link → open it
        window.open(value, '_blank', 'noopener noreferrer');
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
                            {/* Make a block for title and description with set height to align display blocks */}
                            <div className={styles.toolCardTopBlock}>
                                <h4 className={styles.toolName}>{tool.name}</h4>
                            </div>
                            <div className={styles.toolCardMidBlock}>
                                <div className={styles.toolDescriptionWrapper}>
                                    <DescriptionWithTooltip
                                        text={tool.description}
                                    />
                                </div>
                            </div>

                            <div className={styles.toolCardMidBlock}>
                                <ul className={styles.toolMeta}>
                                    <li>
                                        <strong>Base language:</strong>{' '}
                                        {tool.language}
                                    </li>
                                    <li>
                                        <strong>License:</strong> {tool.license}
                                    </li>
                                    <li>
                                        <strong>Functions:</strong>{' '}
                                        {tool.functions}
                                    </li>
                                </ul>
                            </div>
                            {/* The links at the bottom of the main page: */}
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
                                        className={styles.modalLinkUrl}
                                    >
                                        {tool.homepage}
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {/* ^ end of toolGrid */}
            </div>
            {/* ^ end of toolGridContainer */}

            {/* Popup message */}
            {/* Don't display this message if the modal is open. */}
            {!isModalOpen && message && (
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
                                                    className={
                                                        styles.modalLinkUrl
                                                    }
                                                >
                                                    {selectedTool.homepage}
                                                </a>
                                            )}
                                        </div>
                                        <div className={styles.modalLinks01}>
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
                                                    className={
                                                        styles.modalLinkUrl
                                                    }
                                                >
                                                    {
                                                        selectedTool.source_download
                                                    }
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
                                                    className={
                                                        styles.modalLinkUrl
                                                    }
                                                >
                                                    {
                                                        selectedTool.package_download
                                                    }
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
                        {/* Display alert inside open modal. */}
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
