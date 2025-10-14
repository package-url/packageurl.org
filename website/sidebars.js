/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
// const sidebars = {
//   mySidebar: [
//     {
//       type: 'doc',
//       id: 'PURL_SPECIFICATION', // must match the file's frontmatter `id` or filename (see note below)
//       label: 'PURL Specification',
//     },
//     {
//       type: 'doc',
//       id: 'PURL_TYPES', // must match the file's frontmatter `id` or filename (see note below)
//       label: 'PURL Types',
//     },
//   ],
// };

const sidebars = {
    //   mySidebar: [
    //     {
    //       type: 'doc',
    //       id: 'PURL_SPECIFICATION', // must match the file's frontmatter `id` or filename (see note below)
    //       label: 'PURL Specification',
    //     },
    //     {
    //       type: 'doc',
    //       id: 'PURL_TYPES', // must match the file's frontmatter `id` or filename (see note below)
    //       label: 'PURL Types',
    //     },
    //     {
    //       type: 'doc',
    //       id: 'purl-standard', // must match the file's frontmatter `id` or filename (see note below)
    //       label: 'PURL Standard',
    //     },
    //   ],

    // New group 1
    // package_url: [
    //     'package-url/package-url-overview',
    //     'package-url/package-url-purl-and-vers',
    //     'package-url/package-url-projects',
    // ],

    // 2025-10-10 Friday 11:57:42.  Replace package_url with getting_started
    getting_started: [
        'getting-started/getting-started-intro',
        'getting-started/getting-started-use-cases',
        'getting-started/getting-started-tools',
    ],

    // New group 2
    purl_spec: [
        'purl-spec/purl-spec-overview',
        'purl-spec/purl-spec-purl-types',
        'purl-spec/purl-spec-documentation',
        'purl-spec/purl-spec-schemas',
        'purl-spec/purl-spec-adopters',
    ],

    // Group 3
    vers_spec: [
        'vers-spec/vers-spec-overview',
        'vers-spec/vers-spec-documentation',
        'vers-spec/vers-spec-schemas',
        'vers-spec/vers-spec-adopters',
    ],

    // Group 4
    participate: [
        'participate/participate-contribute',
        'participate/participate-meetings',
        'participate/participate-events',
    ],

    // Group 5
    about: [
        'about/about-guiding-principles',
        'about/about-governance',
        'about/about-supporters',
        'about/about-history',
        'about/about-branding',
    ],

    // test_nesting: [


    //     // 'schemas/some-md-file',
    //     'some-md-file',
    //     {
    //         type: 'category',  // This creates the nested group
    //         label: 'Nested schemas',  // The clickable category title in the sidebar
    //         collapsed: true,  // Optional: Starts collapsed (true) or expanded (false). Default is true.
    //         items: [  // Array of nested items (can be docs, links, or even more categories)
    //             // 'purl-spec/nested/nested01',  // Doc ID for docs/nested/page1.md
    //             // 'purl-spec/nested/nested02',  // Doc ID for docs/nested/page2.md

    //             // {
    //             //     type: 'link',
    //             //     label: 'PURL Type Definition Schema!!!',
    //             //     href: '/schemas/purl-type-definition.schema-1.0.html',
    //             // },

    //             {
    //                 type: 'link',
    //                 label: 'PURL Type Definition Schema!!!',
    //                 // href: '/schemas/purl-type-definition.schema-1.0.html',
    //                 href: 'http://localhost:3000/website/static/schemas/purl-type-definition.schema-1.0.html',
    //                 // target: '_blank',
    //                 // rel: 'noopener noreferrer',
    //             },
    //         ],
    //     },

    // ],
};

export default sidebars;
