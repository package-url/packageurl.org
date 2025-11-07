import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomeInfo from './HomeInfo.mdx';
import ToolGrid from '@site/src/components/ToolGrid';

import styles from './styles.module.css';

// 2025-10-15 Wednesday 17:28:05.  The new .js data file
// import getPackages from "@site/src/data/getPackages";
import getTypes from '@site/src/data/getTypes';

export default function HomepageContent() {
    // Get baseUrl from Docusaurus context
    const { siteConfig } = useDocusaurusContext();
    const { baseUrl } = siteConfig;
    const types = getTypes(baseUrl);

    return (
        <main>
            {/* Intro Section */}
            <section className='container margin-vert--lg'>
                <div className={styles.introContainer}>
                    {/* <h1>General Information</h1> */}
                    <HomeInfo />
                </div>
            </section>

            {/* ToolGrid Section */}
            <section className='styles.introContainer'>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h1>Software Tools</h1>
                </div>
                <div
                    className={styles.introContainer}
                    style={{ paddingTop: '0', marginTop: '0' }}
                >
                    These are community-maintained tools that support or use the
                    Package-URL (PURL) or VERS standards.
                </div>
                <ToolGrid />
            </section>

            {/* General Info Section */}
            <section className='container margin-vert--lg'>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div
                        style={{
                            display: 'flex',
                            padding: '2rem',
                            paddingBottom: '0',
                            textAlign: 'center',
                            maxWidth: '1200px',
                            width: '100%',
                            justifyContent: 'center',
                        }}
                    >
                        <h1>General Information</h1>
                    </div>
                </div>
                <div className={styles.generalInfo}>
                    {/* your twoColumn layout here */}

                    <div className={styles.twoColumn}>
                        <div className={styles.column}>
                            <h2>Community call</h2>
                            <div className={styles.card}>
                                <p>
                                    Join our next PURL community call on
                                    2025-10-15 to discuss the status of the PURL
                                    standard submission to Ecma.
                                </p>
                                <p>
                                    The schedules for PURL community and
                                    TC54-TG2 calls are available at{' '}
                                    <a
                                        class='a_page'
                                        href='https://calendar.google.com/calendar/u/0/embed?src=c_884decde5a152902bb51a62f89550d0f3748484534f08c63792f2e654f2a7ebc@group.calendar.google.com'
                                        target='_blank'
                                    >
                                        OWASP Software Supply Chain Community
                                        Calendar
                                    </a>
                                    .
                                </p>
                            </div>
                        </div>

                        <div className={styles.column}>
                            <h2>Releases</h2>
                            <div className={styles.card}>
                                <h3>Release 1.0.0</h3>
                                <p>Coming soon . . .</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <div> */}
            {/* <div className={styles.introContainer}>
                    <HomeInfo />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div
                        style={{
                            display: 'flex',
                            padding: '2rem',
                            paddingTop: '0',
                            paddingBottom: '0',
                            textAlign: 'center',
                            maxWidth: '1200px',
                            width: '100%',
                            justifyContent: 'center',
                        }}
                    >
                        <h1>Software Tools</h1>


                    </div>
                </div> */}

            {/* <div className={styles.toolGridWrapper}>
                    <div className={styles.toolGridContainer}>
                        <div className={styles.toolGrid}>Hello!!!!!</div>
                    </div>
                </div> */}

            {/* <div className='container margin-top--lg'>
                    <section
                        style={{
                            textAlign: 'left',
                            margin: '2rem',
                            marginTop: '.5rem',
                        }}
                    >

                    </section>
                    These are community-maintained tools that support or use the
                    Package-URL (PURL) or VERS standards.

                    <ToolGrid />

                </div> */}

            {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div
                        style={{
                            display: 'flex',
                            padding: '2rem',
                            paddingBottom: '0',
                            textAlign: 'center',
                            maxWidth: '1200px',
                            width: '100%',
                            justifyContent: 'center',
                        }}
                    >
                        <h1>General Information</h1>
                    </div>
                </div> */}

            {/* <div className={styles.twoColumn}>
                    <div className={styles.column}>
                        <h2>Community call</h2>
                        <div className={styles.card}>
                            <p>
                                Join our next PURL community call on 2025-10-15
                                to discuss the status of the PURL standard
                                submission to Ecma.
                            </p>
                            <p>
                                The schedules for PURL community and TC54-TG2
                                calls are available at{' '}
                                <a
                                    class='a_page'
                                    href='https://calendar.google.com/calendar/u/0/embed?src=c_884decde5a152902bb51a62f89550d0f3748484534f08c63792f2e654f2a7ebc@group.calendar.google.com'
                                    target='_blank'
                                >
                                    OWASP Software Supply Chain Community
                                    Calendar
                                </a>
                                .
                            </p>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h2>Releases</h2>
                        <div className={styles.card}>
                            <h3>Release 1.0.0</h3>
                            <p>Coming soon . . .</p>
                        </div>
                    </div>
                </div> */}
            {/* </div> */}
        </main>
    );
}
