// 2025-11-22 Saturday 09:58:08.  From ToolGrid
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import specs from '@site/src/data/specifications.json';

export default function SpecGrid() {
    const [message, setMessage] = useState(null);
    const [selectedSpec, setSelectedSpec] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    // Monitor open modal -- state prevents display of main-page alert
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (spec) => {
        setSelectedSpec(spec); // sets modal content
    };
    // Use a separate state for the modal alert
    const [modalMessage, setModalMessage] = useState(null);

    // Limit when the tooltip appears
    // Maybe name this ConditionalTooltip instead?
    // 2025-11-23 Sunday 17:15:34.  Remove.
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
            <div className={styles.specDescriptionWrapper}>
                <div
                    ref={descRef}
                    className={`${styles.specDescription} ${styles.multiline}`}
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
                setSelectedSpec(null);
                setActiveTab('overview');
            }
        }
        if (selectedSpec) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedSpec]);

    // main page link events
    // const handleMainLinkClick = (e, spec, linkType) => {
    //     if (
    //         linkType === 'homepage' &&
    //         (!spec.homepage ||
    //             spec.homepage === 'n/a')
    //     ) {
    //         e.preventDefault();
    //         setMessage(`The homepage for "${spec.name}" is not available.`);
    //         setTimeout(() => setMessage(null), 3000);
    //     }
    // };

    // modal link events
    const handleLinkClick = (e, spec, linkType) => {
        e.preventDefault();
        e.stopPropagation();

        let message = null;

        if (
            linkType === 'homepage' &&
            (!spec.homepage || spec.homepage === 'n/a')
        ) {
            message = `The homepage for "${spec.name}" is not available.`;
        } else if (
            linkType === 'source_download' &&
            (!spec.source_download || spec.source_download === 'n/a')
        ) {
            message = `The source download URL for "${spec.name}" is not available.`;
        } else if (
            linkType === 'package_download' &&
            (!spec.package_download || spec.package_download === 'n/a')
        ) {
            message = `The package download URL for "${spec.name}" is not available.`;
        }

        if (message) {
            setModalMessage(message);
            setTimeout(() => setModalMessage(null), 3000);
        } else {
            // manually open the valid link if it passed checks
            const url =
                linkType === 'homepage' ? spec.homepage : spec.source_download;
            window.open(url, '_blank', 'noopener noreferrer');
        }
    };

    const closeModal = () => {
        setSelectedSpec(null);
        setActiveTab('overview');
    };

    return (
        <div className={styles.specGridWrapper}>
            <div className={styles.specGridContainer}>
                <div className={styles.specGrid}>
                    {specs.map((spec, idx) => (
                        <div
                            key={idx}
                            className={styles.specCard}
                            onClick={() => openModal(spec)}
                        >
                            {/* <div className={styles.specCardTopBlock}>
                                <h4>
                                    {spec.homepage ? (
                                        <a
                                            href={spec.homepage}
                                            target={
                                                spec.homepage.startsWith('http')
                                                    ? '_blank'
                                                    : '_self'
                                            }
                                            rel='noopener noreferrer'
                                            className={styles.modalLinkUrl}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {spec.name}
                                        </a>
                                    ) : (
                                        spec.name
                                    )}
                                </h4>
                            </div> */}

<div className={styles.specCardTopBlock}>
    <div className={styles.topRow}>
        <h4 className={styles.specName}>
            {spec.homepage ? (
                <a
                    href={spec.homepage}
                    target={spec.homepage.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    // className={styles.modalLinkUrl}
                    className={styles.modalLinkUrl_break_word}
                    onClick={(e) => e.stopPropagation()}
                >
                    {spec.name}
                </a>
            ) : (
                spec.name
            )}
        </h4>

        {/* Optional logo (only if available) */}
        {spec.logo && (
            <div className={styles.logoWrapper}>
                <img
                    src={spec.logo}
                    alt={`${spec.name} logo`}
                    className={styles.logoImg}
                />
            </div>
        )}
    </div>
</div>


                            <div className={styles.specCardMidBlock}>
                                <div className={styles.specDescriptionWrapper}>
                                    <DescriptionWithTooltip
                                        text={spec.description}
                                    />

                                    {/* {spec.description} */}
                                </div>
                            </div>

                            <div className={styles.specCardMidBlock}>
                                <ul className={styles.specMeta}>
                                    <li>
                                        <strong>Base language:</strong>{' '}
                                        {spec.language}
                                    </li>
                                    <li>
                                        <strong>License:</strong> {spec.license}
                                    </li>
                                    <li>
                                        {/* <strong>Functions:</strong>{' '}
                                        {spec.functions} */}
                                        <strong>Standards:</strong>{' '}
                                        {spec.standards}
                                    </li>
                                </ul>
                            </div>

                            {/* The links at the bottom of the main page: */}
                            {/* <div className={styles.specLinks}>
                                <span style={{ fontWeight: 'bold' }}>
                                    Home:{' '}
                                </span>
                                {spec.homepage && (
                                    <a
                                        href={spec.homepage}
                                        target={
                                            spec.homepage.startsWith('http')
                                                ? '_blank'
                                                : '_self'
                                        }
                                        rel='noopener noreferrer'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleMainLinkClick(
                                                e,
                                                spec,
                                                'homepage'
                                            );
                                        }}
                                        className={styles.modalLinkUrl}
                                    >
                                    <DescriptionWithTooltip
                                        text={spec.homepage}
                                    />
                                    </a>
                                )}
                            </div> */}
                        </div>
                    ))}
                </div>
                {/* ^ end of specGrid */}
            </div>
            {/* ^ end of specGridContainer */}

            {/* Popup message */}
            {/* Don't display this message if the modal is open. */}
            {!isModalOpen && message && (
                <div className={styles.modalAlertOverlay_main}>{message}</div>
            )}

            {/* Modal */}
            {selectedSpec && (
                <div className={styles.modalBackdrop} onClick={closeModal}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.modalBody}>
                            <>
                                {/* Full width section */}
                                <div className={styles.fullWidthSection}>
                                    <h2>{selectedSpec.name}</h2>
                                    <p>{selectedSpec.description}</p>
                                </div>

                                {/* Two column section */}
                                <div className={styles.twoColumnSection}>
                                    <div className={styles.column}>
                                        <ul className={styles.featureList}>
                                            <li>
                                                <strong>Base language:</strong>{' '}
                                                {selectedSpec.language}
                                            </li>
                                            <li>
                                                <strong>License:</strong>{' '}
                                                {selectedSpec.license}
                                            </li>
                                            <li>
                                                <strong>Functions:</strong>{' '}
                                                {selectedSpec.functions}
                                            </li>
                                            <li>
                                                <strong>Type:</strong>{' '}
                                                {selectedSpec.type}
                                            </li>
                                            <li>
                                                <strong>Standards:</strong>{' '}
                                                {selectedSpec.standards}
                                            </li>
                                            <li>
                                                <strong>Platform:</strong>{' '}
                                                {selectedSpec.platform}
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
                                            {/* {selectedSpec.homepage && (
                                                <a
                                                    href={selectedSpec.homepage}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    // onClick={(e) =>
                                                    //     handleLinkClick(
                                                    //         e,
                                                    //         selectedSpec,
                                                    //         'homepage'
                                                    //     )
                                                    // }
                                                    className={
                                                        styles.modalLinkUrl
                                                    }
                                                >
                                                    {selectedSpec.homepage}
                                                </a>
                                            )} */}

                                            {selectedSpec.homepage &&
                                            selectedSpec.homepage !== 'n/a' &&
                                            selectedSpec.homepage !== '#' ? (
                                                <a
                                                    href={selectedSpec.homepage}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className={
                                                        styles.modalLinkUrl
                                                    }
                                                >
                                                    {selectedSpec.homepage}
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
                                            {/* {selectedSpec.source_download && (
                                                <a
                                                    href={
                                                        selectedSpec.source_download
                                                    }
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    // onClick={(e) =>
                                                    //     handleLinkClick(
                                                    //         e,
                                                    //         selectedSpec,
                                                    //         'source_download'
                                                    //     )
                                                    // }
                                                    className={
                                                        styles.modalLinkUrl
                                                    }
                                                >
                                                    {
                                                        selectedSpec.source_download
                                                    }
                                                </a>
                                            )} */}

                                            {selectedSpec.source_download &&
                                            selectedSpec.source_download !==
                                                'n/a' &&
                                            selectedSpec.source_download !==
                                                '#' ? (
                                                <a
                                                    href={
                                                        selectedSpec.source_download
                                                    }
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className={
                                                        styles.modalLinkUrl
                                                    }
                                                >
                                                    {
                                                        selectedSpec.source_download
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
                                            {/* {selectedSpec.package_download && (
                                                <a
                                                    href={
                                                        selectedSpec.package_download
                                                    }
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    // onClick={(e) =>
                                                    //     handleLinkClick(
                                                    //         e,
                                                    //         selectedSpec,
                                                    //         'package_download'
                                                    //     )
                                                    // }
                                                    className={
                                                        styles.modalLinkUrl
                                                    }
                                                >
                                                    {
                                                        selectedSpec.package_download
                                                    }
                                                </a>
                                            )} */}

                                            {selectedSpec.package_download &&
                                            selectedSpec.package_download !==
                                                'n/a' &&
                                            selectedSpec.package_download !==
                                                '#' ? (
                                                <a
                                                    href={
                                                        selectedSpec.package_download
                                                    }
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className={
                                                        styles.modalLinkUrl
                                                    }
                                                >
                                                    {
                                                        selectedSpec.package_download
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
                                                {selectedSpec.notes}
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
