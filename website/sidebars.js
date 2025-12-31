/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    purl: [
        'purl/purl-spec-introduction',
        {
            type: 'category',
            label: 'Specification',
            link: {
                type: 'doc',
                id: 'purl/purl-spec-folder-page', // The doc to display
            },
            collapsed: false,
            items: [
                'purl/specification',
                'purl/how-to-build',
                'purl/how-to-parse',
                'purl/tests',
            ],
        },
        'purl/purl-spec-purl-types',
        'purl/purl-spec-schemas',
        'purl/purl-spec-adopters',
        // 2025-12-30 Tuesday 15:30:35.Is the next one superseded?  Yes
        // 'purl/purl-spec-documentation',
    ],
    vers_spec: [
        'vers-spec/vers-spec-overview',
        'vers-spec/vers-spec-documentation',
        'vers-spec/vers-spec-schemas',
        'vers-spec/vers-spec-adopters',
    ],
    about: [
        'about/about-contribute',
        'about/about-meetings',
        'about/about-events',
    ],
};

export default sidebars;
