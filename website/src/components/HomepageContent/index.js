import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import styles from "./styles.module.css";

// 2025-10-15 Wednesday 17:28:05.  The new .js data file
// import getPackages from "@site/src/data/getPackages";
import getTypes from "@site/src/data/getTypes";

export default function HomepageContent() {
    // Get baseUrl from Docusaurus context
    const { siteConfig } = useDocusaurusContext();
    const { baseUrl } = siteConfig;

    // 2025-10-15 Wednesday 17:27:40.  Create a separate .js data file to replace the data constant currently defined below.
    // const packages = getPackages(baseUrl);
    const types = getTypes(baseUrl);

    // const packages = [
    //     {
    //         name: "alpm",
    //         url: "https://archlinux.org/",
    //         logo: `${baseUrl}img/archlinux-logo-dark-90dpi.png`,
    //     },
    //     {
    //         name: "apk",
    //         url: "https://www.alpinelinux.org/",
    //         logo: `${baseUrl}img/alpine.png`,
    //     },
    //     {
    //         name: "bitbucket",
    //         url: "https://bitbucket.org",
    //         logo: `${baseUrl}img/Bitbucket_mark_brand_RGB_2x.png`,
    //     },
    //     {
    //         name: "bitnami",
    //         url: "https://downloads.bitnami.com/files/stacksmith",
    //         logo: `${baseUrl}img/bitnami-from-github.com_bitnami.png`,
    //     },
    //     {
    //         name: "cargo",
    //         url: "https://github.com/rust-lang/cargo",
    //         logo: `${baseUrl}img/Cargo-Logo-Small.png`,
    //     },
    //     {
    //         name: "cocoapods",
    //         url: "https://github.com/CocoaPods/CocoaPods",
    //         logo: "https://github.com/cocoapods.png",
    //     },
    //     {
    //         name: "composer",
    //         url: "https://getcomposer.org",
    //         logo: `${baseUrl}img/composer.jpg`,
    //     },
    //     {
    //         name: "conan",
    //         url: "https://github.com/conan-io/conan",
    //         logo: "https://avatars.githubusercontent.com/u/15212165?s=48&v=4",
    //     },
    //     {
    //         name: "conda",
    //         url: "https://github.com/conda/conda",
    //         logo: `${baseUrl}img/conda.png`,
    //     },
    //     {
    //         name: "cpan",
    //         url: "https://www.cpan.org",
    //         logo: `${baseUrl}img/cpan.png`,
    //     },
    //     {
    //         name: "cran",
    //         url: "https://cran.r-project.org",
    //         logo: `${baseUrl}img/cran.png`,
    //     },
    //     {
    //         name: "deb",
    //         url: "https://wiki.debian.org/PackageManagement",
    //         logo: `${baseUrl}img/debian-openlogo-nd-75.png`,
    //     },
    //     {
    //         name: "docker",
    //         url: "https://www.docker.com",
    //         logo: "https://avatars.githubusercontent.com/u/5429470?s=48&v=4",
    //     },
    //     {
    //         name: "gem",
    //         url: "https://rubygems.org",
    //         logo: "https://github.com/rubygems.png",
    //     },
    //     {
    //         name: "generic",
    //         url: "https://github.com/package-url/purl-spec/blob/main/types/generic-definition.json",
    //         logo: `${baseUrl}img/no_logo_placeholder.svg`,
    //     },
    //     {
    //         name: "github",
    //         url: "https://github.com/package-url/purl-spec/blob/main/types/github-definition.json",
    //         logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    //     },
    //     {
    //         name: "golang",
    //         url: "https://golang.org",
    //         logo: "https://avatars.githubusercontent.com/u/4314092?s=48&v=4",
    //     },
    //     {
    //         name: "hackage",
    //         url: "https://hackage.haskell.org",
    //         logo: `${baseUrl}img/HaskellLogoStyPreview-1.png`,
    //     },
    //     {
    //         name: "hex",
    //         url: "https://hex.pm",
    //         logo: `${baseUrl}img/hex.png`,
    //     },
    //     {
    //         name: "huggingface",
    //         url: "https://huggingface.co",
    //         logo: `${baseUrl}img/huggingface-logo.svg`,
    //     },
    //     {
    //         name: "luarocks",
    //         url: "https://luarocks.org",
    //         logo: `${baseUrl}img/LuaRockslogo.svg`,
    //     },
    //     {
    //         name: "maven",
    //         url: "https://github.com/apache/maven",
    //         logo: "https://avatars.githubusercontent.com/u/47359?s=48&v=4",
    //     },
    //     {
    //         name: "mlflow",
    //         url: "https://mlflow.org",
    //         logo: `${baseUrl}img/mlflow.png`,
    //     },
    //     {
    //         name: "npm",
    //         url: "https://github.com/npm/cli",
    //         logo: "https://avatars.githubusercontent.com/u/6078720?s=48&v=4",
    //     },
    //     {
    //         name: "nuget",
    //         url: "https://www.nuget.org",
    //         logo: "https://github.com/nuget.png",
    //     },
    //     {
    //         name: "oci",
    //         url: "https://github.com/opencontainers/distribution-spec",
    //         logo: `${baseUrl}img/oci.png`,
    //     },
    //     {
    //         name: "pub",
    //         url: "https://pub.dev",
    //         logo: `${baseUrl}img/pub-gh-logo.png`,
    //     },
    //     {
    //         name: "pypi",
    //         url: "https://pypi.org",
    //         logo: "https://github.com/pypi.png",
    //     },
    //     {
    //         name: "qpkg",
    //         url: "https://blackberry.qnx.com/en",
    //         logo: `${baseUrl}img/BlackBerry-QNX-logo-white-new.png`,
    //     },
    //     {
    //         name: "rpm",
    //         url: "https://github.com/rpm-software-management/rpm",
    //         logo: `${baseUrl}img/rpm-gh-logo.png`,
    //     },
    //     {
    //         name: "swid",
    //         url: "https://nvd.nist.gov/products/swid",
    //         logo: `${baseUrl}img/no_logo_placeholder.svg`,
    //     },
    //     {
    //         name: "swift",
    //         url: "https://swift.org",
    //         logo: `${baseUrl}img/Swift_logo_color.svg`,
    //     },
    // ];

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
                        {/* {packages.map((pkg, idx) => ( */}
                        {types.map((pkg, idx) => (
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
