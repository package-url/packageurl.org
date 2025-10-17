import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import styles from "./styles.module.css";

export default function HomepageContent() {
    // Get baseUrl from Docusaurus context
    const { siteConfig } = useDocusaurusContext();
    const { baseUrl } = siteConfig;

    const packages = [
        {
            name: "alpm",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/alpm-definition.md",
            logo: `${baseUrl}img/archlinux-logo-dark-90dpi.png`,
        },
        {
            name: "apk",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/apk-definition.md",
            logo: `${baseUrl}img/alpine.png`,
        },
        {
            name: "bitbucket",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/bitbucket-definition.md",
            logo: `${baseUrl}img/Bitbucket_mark_brand_RGB_2x.png`,
        },
        {
            name: "bitnami",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/bitnami-definition.md",
            logo: `${baseUrl}img/bitnami-from-github.com_bitnami.png`,
        },
        {
            name: "cargo",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/cargo-definition.md",
            logo: `${baseUrl}img/Cargo-Logo-Small.png`,
        },
        {
            name: "cocoapods",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/cocoapods-definition.md",
            logo: "https://github.com/cocoapods.png",
        },
        {
            name: "composer",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/composer-definition.md",
            logo: `${baseUrl}img/composer.jpg`,
        },
        {
            name: "conan",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/conan-definition.md",
            logo: "https://avatars.githubusercontent.com/u/15212165?s=48&v=4",
        },
        {
            name: "conda",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/conda-definition.md",
            logo: `${baseUrl}img/conda.png`,
        },
        {
            name: "cpan",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/cpan-definition.md",
            logo: `${baseUrl}img/cpan.png`,
        },
        {
            name: "cran",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/cran-definition.md",
            logo: `${baseUrl}img/cran.png`,
        },
        {
            name: "deb",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/deb-definition.md",
            logo: `${baseUrl}img/debian-openlogo-nd-75.png`,
        },
        {
            name: "docker",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/docker-definition.md",
            logo: "https://avatars.githubusercontent.com/u/5429470?s=48&v=4",
        },
        {
            name: "gem",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/gem-definition.md",
            logo: "https://github.com/rubygems.png",
        },
        {
            name: "generic",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/generic-definition.md",
            logo: `${baseUrl}img/no_logo_placeholder.svg`,
        },
        {
            name: "github",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/github-definition.md",
            logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
        },
        {
            name: "golang",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/golang-definition.md",
            logo: "https://avatars.githubusercontent.com/u/4314092?s=48&v=4",
        },
        {
            name: "hackage",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/hackage-definition.md",
            logo: `${baseUrl}img/HaskellLogoStyPreview-1.png`,
        },
        {
            name: "hex",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/hex-definition.md",
            logo: `${baseUrl}img/hex.png`,
        },
        {
            name: "huggingface",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/huggingface-definition.md",
            logo: `${baseUrl}img/huggingface-logo.svg`,
        },
        {
            name: "luarocks",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/luarocks-definition.md",
            logo: `${baseUrl}img/LuaRockslogo.svg`,
        },
        {
            name: "maven",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/maven-definition.md",
            logo: "https://avatars.githubusercontent.com/u/47359?s=48&v=4",
        },
        {
            name: "mlflow",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/mlflow-definition.md",
            logo: `${baseUrl}img/mlflow.png`,
        },
        {
            name: "npm",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/npm-definition.md",
            logo: "https://avatars.githubusercontent.com/u/6078720?s=48&v=4",
        },
        {
            name: "nuget",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/nuget-definition.md",
            logo: "https://github.com/nuget.png",
        },
        {
            name: "oci",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/oci-definition.md",
            logo: `${baseUrl}img/oci.png`,
        },
        {
            name: "pub",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/pub-definition.md",
            logo: `${baseUrl}img/pub-gh-logo.png`,
        },
        {
            name: "pypi",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/pypi-definition.md",
            logo: "https://github.com/pypi.png",
        },
        {
            name: "qpkg",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/qpkg-definition.md",
            logo: `${baseUrl}img/BlackBerry-QNX-logo-white-new.png`,
        },
        {
            name: "rpm",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/rpm-definition.md",
            logo: `${baseUrl}img/rpm-gh-logo.png`,
        },
        {
            name: "swid",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/swid-definition.md",
            logo: `${baseUrl}img/no_logo_placeholder.svg`,
        },
        {
            name: "swift",
            url: "https://github.com/package-url/purl-spec/blob/main/types-doc/swift-definition.md",
            logo: `${baseUrl}img/Swift_logo_color.svg`,
        },
    ];

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: 0,
                    marginTop: 30,
                }}
            >
                <h1 style={{ marginBottom: 0 }}>Registered PURL Types</h1>
            </div>

            <div className={styles.purlGridWrapper}>
                <div className={styles.purlGridContainer}>
                    <div className={styles.purlGrid}>
                        {packages.map((pkg, idx) => (
                            <a
                                key={idx}
                                href={pkg.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.packageCell}
                            >
                                <img
                                    src={pkg.logo}
                                    alt={pkg.name}
                                    className={`${styles.packageLogo} ${
                                        styles[pkg.name]
                                    }`}
                                />

                                <span>{pkg.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                    style={{
                        display: "flex",
                        padding: "2rem",
                        paddingBottom: "0",
                        textAlign: "center",
                        maxWidth: "1200px",
                        width: "100%",
                        justifyContent: "center",
                    }}
                >
                    <h1>General Information</h1>
                </div>
            </div>

            <div className={styles.twoColumn}>
                <div className={styles.column}>
                    <h2>Community call</h2>
                    <div className={styles.card}>
                        <p>
                            Join our next PURL community call on 2025-10-15 to
                            discuss the status of the PURL standard submission
                            to Ecma.
                        </p>
                        <p>
                            The schedules for PURL community and TC54-TG2 calls
                            are available at{" "}
                            <a
                                class="a_page"
                                href="https://calendar.google.com/calendar/u/0/embed?src=c_884decde5a152902bb51a62f89550d0f3748484534f08c63792f2e654f2a7ebc@group.calendar.google.com"
                                target="_blank"
                            >
                                OWASP Software Supply Chain Community Calendar
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
    );
}
