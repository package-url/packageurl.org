// /src/data/getTools.js

export default function getTools(baseUrl) {
    return [
        {
            name: "packageurl-python",
            // description:
            //     "Python implementation of the Package URL specification.",
            description: "Python implementation of the package url spec.",
            homepage: "https://github.com/package-url/packageurl-python",
            download: "https://pypi.org/project/packageurl-python/",
            language: "Python",
            // license: "Apache-2.0",
            license: "MIT License (MIT)",
            //   logo: `${baseUrl}img/logos/python.svg`,
            logo: "https://github.com/pypi.png",
        },
        {
            name: "univers",
            // description:
            //     "Library for working with multiple packaging ecosystems in Python.",
            description: "Parse and compare all the package versions and all the ranges. From debian, npm, pypi, ruby and more. Process all the version range specs and expressions. ",
            homepage: "https://github.com/nexB/univers",
            download: "https://pypi.org/project/univers/",
            language: "Python",
            // license: "Apache-2.0",
            license: "MIT License (MIT)",
            logo: `${baseUrl}img/logos/univers.svg`,
        },
    ];
}
