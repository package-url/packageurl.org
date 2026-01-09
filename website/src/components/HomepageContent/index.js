import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomeInfo from './HomeInfo.mdx';
import GeneralInfo from '@site/src/components/GeneralInfo';
import SpecGrid from '@site/src/components/SpecGrid';
import ToolGrid from '@site/src/components/ToolGrid';
import styles from './styles.module.css';

export default function HomepageContent() {
    // Get baseUrl from Docusaurus context
    const { siteConfig } = useDocusaurusContext();
    const { baseUrl } = siteConfig;

    return (
        <main>
            <section className={styles.sectionContainer}>
                <div className={styles.sectionIntro}>
                    <HomeInfo />
                </div>
            </section>

            {/* ToolGrid Section */}
            <section className={styles.sectionContainer}>
                <div
                    className={styles.sectionHeader}
                    style={{ marginBottom: '15px' }}
                >
                    <h1 id='software-specifications-and-tools'>
                        Software Specifications and Tools
                    </h1>
                </div>
                <div className={styles.sectionHeader}>
                    <h2>PURL Adoption - Specifications</h2>
                </div>
                <div
                    className={styles.sectionIntro}
                >
                    These are specifications that have adopted PURL or VERS as
                    part of a specification.
                </div>
                <SpecGrid />
            </section>

            <section className={styles.sectionContainer}>
                <div className={styles.sectionHeader}>
                    <h2>Software Tools</h2>
                </div>
                <div
                    className={styles.sectionIntro}
                >
                    These are community-maintained tools that support or use the
                    Package-URL (PURL) or VERS standards.
                </div>
                <ToolGrid />
            </section>

            <section className={styles.sectionContainer}>
                <div className={styles.sectionHeader}>
                    <h1>General Information</h1>
                </div>
                <GeneralInfo />
            </section>
        </main>
    );
}
