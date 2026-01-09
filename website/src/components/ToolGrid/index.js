import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import tools from '@site/src/data/tools.json';

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

    // modal link events
    const handleLinkClick = (e, tool, linkType) => {
        e.preventDefault();
        e.stopPropagation();

        let message = null;

        if (
            linkType === 'homepage' &&
            (!tool.homepage || tool.homepage === 'n/a')
        ) {
            message = `The homepage for "${tool.name}" is not available.`;
        } else if (
            linkType === 'source_download' &&
            (!tool.source_download || tool.source_download === 'n/a')
        ) {
            message = `The source download URL for "${tool.name}" is not available.`;
        } else if (
            linkType === 'package_download' &&
            (!tool.package_download || tool.package_download === 'n/a')
        ) {
            message = `The package download URL for "${tool.name}" is not available.`;
        }

        if (message) {
            setModalMessage(message);
            setTimeout(() => setModalMessage(null), 3000);
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

<div className={styles.toolCardTopBlock}>
    <div className={styles.topRow}>
        <h4 className={styles.toolName}>
            {tool.homepage ? (
                <a
                    href={tool.homepage}
                    target={tool.homepage.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className={styles.modalLinkUrl_break_word}
                    onClick={(e) => e.stopPropagation()}
                >
                    {tool.name}
                </a>
            ) : (
                tool.name
            )}
        </h4>

        {/* Optional logo (only if available) */}
        {tool.logo && (
            <div className={styles.logoWrapper}>
                <img
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    className={styles.logoImg}
                />
            </div>
        )}
    </div>
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
                                        <strong>Software License:</strong> {tool.software_license}
                                    </li>
                                    <li>
                                        <strong>Standards:</strong>{' '}
                                        {tool.standards}
                                    </li>
                                </ul>
                            </div>

                            {/* The links at the bottom of the main page: */}
                            {/* <div className={styles.toolLinks}>
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
                                    <DescriptionWithTooltip
                                        text={tool.homepage}
                                    />

                                    </a>
                                )}
                            </div> */}
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
                                        <ul className={styles.featureList}>
                                            <li>
                                                <strong>Base language:</strong>{' '}
                                                {selectedTool.language}
                                            </li>
                                            <li>
                                                <strong>Software License:</strong>{' '}
                                                {selectedTool.software_license}
                                            </li>
                                            <li>
                                                <strong>Data License:</strong>{' '}
                                                {selectedTool.data_license}
                                            </li>
                                            <li>
                                                <strong>Service License:</strong>{' '}
                                                {selectedTool.service_license}
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

                                            {selectedTool.homepage &&
                                            selectedTool.homepage !== 'n/a' &&
                                            selectedTool.homepage !== '#' ? (
                                                <a
                                                    href={selectedTool.homepage}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className={
                                                        styles.modalLinkUrl
                                                    }
                                                >
                                                    {selectedTool.homepage}
                                                </a>
                                            ) : (
                                                <span>n/a</span>
                                            )}
                                        </div>
                                        <div className={styles.modalLinks01}>
                                            <span
                                                style={{ fontWeight: 'bold' }}
                                            >
                                                Source download:{' '}
                                            </span>

                                            {selectedTool.source_download &&
                                            selectedTool.source_download !==
                                                'n/a' &&
                                            selectedTool.source_download !==
                                                '#' ? (
                                                <a
                                                    href={
                                                        selectedTool.source_download
                                                    }
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className={
                                                        styles.modalLinkUrl
                                                    }
                                                >
                                                    {
                                                        selectedTool.source_download
                                                    }
                                                </a>
                                            ) : (
                                                <span>n/a</span>
                                            )}
                                        </div>

                                        <div className={styles.modalLinks01}>
                                            <span
                                                style={{ fontWeight: 'bold' }}
                                            >
                                                Package download:{' '}
                                            </span>

                                            {selectedTool.package_download &&
                                            selectedTool.package_download !==
                                                'n/a' &&
                                            selectedTool.package_download !==
                                                '#' ? (
                                                <a
                                                    href={
                                                        selectedTool.package_download
                                                    }
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className={
                                                        styles.modalLinkUrl
                                                    }
                                                >
                                                    {
                                                        selectedTool.package_download
                                                    }
                                                </a>
                                            ) : (
                                                <span>n/a</span>
                                            )}
                                        </div>

                                        <div className={styles.note_field}>
                                            <span
                                                style={{ fontWeight: 'bold' }}
                                            >
                                                Notes:{' '}
                                            </span>
                                            <div className={styles.modalText}>
                                                {selectedTool.notes}
                                            </div>
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
