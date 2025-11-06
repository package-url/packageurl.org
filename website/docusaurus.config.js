import { themes as prismThemes } from "prism-react-renderer";

// Add flexibility to config and run with different baseUrl values for GH Pages vs. DreamHost.
const isProd = process.env.NODE_ENV === "production";
// Use BASE_URL environment variable if set; fallback to "/" for dev
const baseUrl = process.env.BASE_URL || "/";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const getDeploymentTimestamp = () => {
    const now = new Date();
    const date = now.toISOString().split("T")[0]; // 2025-09-13
    const time = now.toISOString().split("T")[1].split(".")[0]; // 23:45:32
    const weekday = now.toLocaleDateString("en-US", { weekday: "long" });
    return `${date} ${time} UTC`;
};

const config = {
    title: "packageurl.org",
    tagline:
        "A simple, consistent, and flexible approach for identifying software packages with precision and clarity.",
    favicon: "img/favicon.ico",

    markdown: {
        format: "detect", // Auto-detects: .md = plain Markdown (CommonMark), .mdx = MDX
    },

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
        v4: true, // Improve compatibility with the upcoming Docusaurus v4
    },

    // Set the production url
    url: "https://package-url.github.io/",
    // For temp xyz dev use as needed:
    // url: "https://packageurl.jmh2025.xyz",

    // The /<baseUrl>/ pathname under which the site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/packageurl.org/",
    // For DreamHost deployment:
    // baseUrl: "/",

    // TODO: Determine whether still needed to address file-not-found when linking to json-schema-for-humans .html files.
    staticDirectories: ["static"], // Ensure static folder is included

    // GitHub pages deployment config.
    organizationName: "Package-URL",
    projectName: "packageurl.org",

    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },

    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    path: "docs",
                    sidebarPath: require.resolve("./sidebars.js"),
                    editUrl: ({ docPath }) => {
                        // Explicit mapping of Docusaurus path → actual GitHub source
                        const editUrlMap = {
                            // Getting Started
                            // "getting-started/getting-started-intro.md": `https://github.com/package-url/packageurl.org/blob/main/website/docs/${docPath}`,
                            // "getting-started/getting-started-use-cases.md": `https://github.com/package-url/packageurl.org/blob/main/website/docs/${docPath}`,
                            // "getting-started/getting-started-tools.mdx": `https://github.com/package-url/packageurl.org/blob/main/website/docs/${docPath}`,

                            // PURL Specification
                            "purl-spec/purl-spec-overview.md": `https://github.com/package-url/purl-spec/blob/main/docs/standard/introduction.md`,
                            // "purl-spec/purl-spec-purl-types.md": `https://github.com/package-url/packageurl.org/blob/main/website/docs/${docPath}`,
                            "purl-spec/purl-spec-purl-types.mdx": `https://github.com/package-url/packageurl.org/blob/main/website/docs/${docPath}`,
                            "purl-spec/purl-spec-documentation.md": `https://github.com/package-url/purl-spec/blob/main/purl-specification.md`,
                            "purl-spec/purl-spec-schemas.md": `https://github.com/package-url/packageurl.org/blob/main/website/docs/${docPath}`,
                            "purl-spec/purl-spec-adopters.md": `https://github.com/package-url/purl-spec/blob/main/ADOPTERS.md`,

                            // VERS Specification
                            "vers-spec/vers-spec-overview.md": `https://github.com/package-url/packageurl.org/blob/main/website/docs/${docPath}`,
                            "vers-spec/vers-spec-documentation.md": `https://github.com/package-url/vers-spec/blob/main/VERSION-RANGE-SPEC.md`,
                            "vers-spec/vers-spec-schemas.md": `https://github.com/package-url/packageurl.org/blob/main/website/docs/${docPath}`,
                            "vers-spec/vers-spec-adopters.md": `https://github.com/package-url/vers-spec/blob/main/ADOPTERS.md`,

                            // Participate
                            // "participate/participate-contribute.md": `https://github.com/package-url/packageurl.org/blob/main/website/docs/${docPath}`,
                            // "participate/participate-meetings.md": `https://github.com/package-url/packageurl.org/blob/main/website/docs/${docPath}`,
                            // "participate/participate-events.md": `https://github.com/package-url/packageurl.org/blob/main/website/docs/${docPath}`,

                            // About -- formerly participate
                            "about/about-contribute.md": `https://github.com/package-url/packageurl.org/blob/main/website/docs/${docPath}`,
                            "about/about-meetings.md": `https://github.com/package-url/packageurl.org/blob/main/website/docs/${docPath}`,
                            "about/about-events.md": `https://github.com/package-url/packageurl.org/blob/main/website/docs/${docPath}`,

                            // About
                            // "about/about-guiding-principles.md": `https://github.com/package-url/packageurl.org/blob/main/website/docs/${docPath}`,
                            // "about/about-governance.md": `https://github.com/package-url/packageurl.org/blob/main/website/docs/${docPath}`,
                            // "about/about-supporters.md": `https://github.com/package-url/packageurl.org/blob/main/website/docs/${docPath}`,
                            // "about/about-history.md": `https://github.com/package-url/packageurl.org/blob/main/website/docs/${docPath}`,
                            // "about/about-branding.md": `https://github.com/package-url/packageurl.org/blob/main/website/docs/${docPath}`,
                        };

                        // Return the mapped URL if it exists
                        if (editUrlMap[docPath]) {
                            return editUrlMap[docPath];
                        }

                        // For files that live in packageurl.org repo (about/, participate/, etc.)
                        // return `https://github.com/package-url/packageurl.org/edit/main/docs/${docPath}`;

                        // Otherwise, provide a default (so “Edit this page” still works)
                        return `https://github.com/package-url/packageurl.org/blob/main/website/docs/${docPath}`;
                    },
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            // image: "img/docusaurus-social-card.jpg",
            navbar: {
                logo: {
                    alt: 'PURL Logo',
                    src: 'img/logo.png',
                },
                style: "dark",
                items: [
                    { to: '/', label: 'Home', position: 'left', exact: true },
                    // {
                    //     type: 'docSidebar',
                    //     sidebarId: 'getting_started',
                    //     position: 'left',
                    //     label: 'Getting Started',
                    // },
                    {
                        type: 'docSidebar',
                        sidebarId: 'purl_spec',
                        position: 'left',
                        label: 'PURL Specification',
                    },
                    {
                        type: 'docSidebar',
                        sidebarId: 'vers_spec',
                        position: 'left',
                        label: 'VERS Specification',
                    },
                    // {
                    //     type: 'docSidebar',
                    //     sidebarId: 'participate',
                    //     position: 'left',
                    //     label: 'Participate',
                    // },
                    {
                        type: 'docSidebar',
                        sidebarId: 'about',
                        position: 'left',
                        label: 'About',
                    },
                    // {
                    //     type: 'docSidebar',
                    //     sidebarId: 'about',
                    //     position: 'left',
                    //     label: 'About',
                    // },
                    {
                        href: 'https://github.com/package-url',
                        label: 'GitHub',
                        position: 'right',
                    },
                    {
                        href: 'https://cyclonedx.slack.com/archives/C06KTE3BWEB',
                        label: 'Slack',
                        position: 'right',
                    },
                    {
                        type: 'dropdown',
                        label: 'Schemas',
                        position: 'right',
                        items: [
                            {
                                href: '/schemas/purl-type-definition.schema-1.0.html',
                                label: 'Package-URL Type Definition ↗',
                                target: '_blank',
                            },
                            {
                                href: '/schemas/purl-test.schema.html',
                                label: 'Package-URL test definition ↗',
                                target: '_blank',
                            },
                            {
                                href: '/schemas/purl-types-index.schema-1.0.html',
                                label: 'Package-URL types index ↗',
                                target: '_blank',
                            },
                        ],
                    },
                ],
            },
            footer: {
                style: "dark",
                links: [
                    {
                        title: '\u00A0', // non-breaking space: avoids empty-string error, renders blank
                        items: [
                            {
                                html: '<img src="/img/logo1.png" alt="Logo 1" style="max-height:40px; margin-bottom:8px;" />',
                            },
                            {
                                html: '<img src="/img/logo2.png" alt="Logo 2" style="max-height:40px;" />',
                            },
                        ],
                    },
                    {
                        title: 'Social',
                        items: [
                            { label: 'Twitter', href: '#' },
                            { label: 'Facebook', href: '#' },
                        ],
                    },
                    {
                        title: 'GitHub',
                        items: [
                            { label: 'Repo 1', href: '#' },
                            { label: 'Repo 2', href: '#' },
                        ],
                    },
                    {
                        title: 'Gitter',
                        items: [{ label: 'Room 1', href: '#' }],
                    },
                    {
                        title: 'LinkedIn',
                        items: [{ label: 'Company Page', href: '#' }],
                    },
                    {
                        title: 'Slack',
                        items: [{ label: 'Community Slack', href: '#' }],
                    },

                ],
                copyright: `Copyright © _____ &nbsp; | &nbsp; License: _____ &nbsp; | &nbsp; Built with Docusaurus <br />Last deployed: ${getDeploymentTimestamp()}`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
        }),
};

export default config;
