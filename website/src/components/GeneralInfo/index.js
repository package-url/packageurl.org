import React from 'react';
import styles from './styles.module.css';

export default function GeneralInfoSection() {
    return (
        <div className={styles.generalInfoWrapper}>
            <div className={styles.twoColumn}>
                {/* Column 1 */}
                <div className={styles.column}>
                    <h2>Community call</h2>
                    <div className={styles.card}>
                        <p>
                            Join our next PURL community call on 2026-01-07 to
                            discuss the status of the PURL standard submission
                            to Ecma.
                        </p>
                        <p>
                            The schedules for the PURL community and TC54-TG2
                            calls are available at{' '}
                            <a
                                className='a_page'
                                href='https://calendar.google.com/calendar/u/0/embed?src=c_884decde5a152902bb51a62f89550d0f3748484534f08c63792f2e654f2a7ebc@group.calendar.google.com'
                                target='_blank'
                            >
                                OWASP Software Supply Chain Community Calendar
                            </a>
                            .
                        </p>
                    </div>
                </div>

                {/* Column 2 */}
                <div className={styles.column}>
                    <h2>Releases</h2>
                    <div className={styles.card}>
                        <h3>Release 1.0.0</h3>
                        <p>Coming soon . . .</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
