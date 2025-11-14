import React, { useState, useEffect } from 'react';
// 2025-11-12 Wednesday 12:54:49.  add this for the tooltip only whenh needed code below
import styles from './styles.module.css';
// import tools from '@site/src/data/tools.json';
import tools from '@site/src/data/tools-2025-11-11.json';

export default function ToolGrid() {
    const [message, setMessage] = useState(null);
    const [selectedTool, setSelectedTool] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    // 2025-11-13 Thursday 11:15:19.  Monitor when the modal is open so that
    // state prevents the main-page alert from being displayed.
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (tool) => {
        setSelectedTool(tool); // sets modal content
        // any other logic you want when opening, e.g., resetting modalMessage
    };

    // 2025-11-13 Thursday 11:49:19.  Use a separate state for the modal alert (e.g., modalMessage) so it doesn’t interfere with the global alert:
    const [modalMessage, setModalMessage] = useState(null);

    // 2025-11-13 Thursday 09:34:32.  I commented out the next block due to
    // the "tesxt is not defined" error, and now this only displays a tooltip
    // when it needs to.

    // 2025-11-12 Wednesday 18:28:43.  This might prevent a description
    // within the defined line-height from still displaying a tooltip.
    // React.useEffect(() => {
    //     const el = descRef.current;
    //     if (el) {
    //         const isOverflowing =
    //             el.scrollHeight - el.clientHeight > 1 ||
    //             el.scrollWidth - el.clientWidth > 1;
    //         setShowTooltip(isOverflowing);
    //     }
    // }, [text]);

    // 2025-11-12 Wednesday 18:02:32.  This limits when the tooltip appears ==
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
    // =======================================================================

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

    // 2025-11-13 Thursday 12:14:38.  What if I rename and try to reuse this code, which originally worked with the main page links.
    // const handleLinkClick = (e, tool, linkType) => {
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

    // 2025-11-13 Thursday 12:13:04.  Handle a link on the main page.

    // 2025-11-13 Thursday 10:23:21.  This enables an alert to be triggered from within the modal.

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
            // setMessage(message);
            // setTimeout(() => setMessage(null), 2500);

            // 2025-11-13 Thursday 12:09:26.  new modalMessage
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
                            // onClick={() => setSelectedTool(tool)}
                            // 2025-11-13 Thursday 11:44:57.  Replace above ^ with this new constant to handle clicks from inside an open modal.
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
                        {/* Tabs */}
                        {/* <div className={styles.modalTabs}>
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
                        </div> */}

                        {/* Tab Content */}
                        {/* <div className={styles.modalBody}>
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
                                                        onClick={(e) =>
                                                            handleLinkClick(
                                                                e,
                                                                selectedTool,
                                                                'homepage'
                                                            )
                                                        }
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
                        </div> */}

                        {/* {modalMessage && (
                            <div className={styles.modalAlertOverlay}>
                                {modalMessage}
                            </div>
                        )} */}

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
                                        {/* <div className={styles.modalLinks}> */}
                                        {/* <div className={styles.toolLinks}> */}
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
