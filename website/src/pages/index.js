import Layout from "@theme/Layout";
// import Link from "@docusaurus/Link";
// import styles from "./index.module.css";

// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// import clsx from 'clsx';
// import Heading from '@theme/Heading';

import HomepageHeader from '../components/HomepageHeader'; // added 2025-10-10 Friday 18:07:40.
import HomepageContent from '../components/HomepageContent'; // added 2025-10-10 Friday 18:59:48.

export default function Home() {
    return (
        <Layout title="Home" description="Landing page for schema project">
            <HomepageHeader />
            <HomepageContent />
        </Layout>
    );
}


// import clsx from 'clsx';
// import Link from '@docusaurus/Link';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// import Layout from '@theme/Layout';
// import HomepageContent from '../components/HomepageContent/HomepageContent';

// import Heading from '@theme/Heading';
// import styles from './index.module.css';

// function HomepageHeader() {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <header className={clsx('hero hero--primary', styles.heroBanner)}>
//       <div className="container">
//         <Heading as="h1" className="hero__title">
//           {siteConfig.title}
//         </Heading>
//         <p className="hero__subtitle">{siteConfig.tagline}</p>
//         <div className={styles.buttons}>
//           <Link
//             className="button button--secondary button--lg"
//             to="/docs/PURL_SPECIFICATION">
//             View PURL Specification 📘!!!?
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default function Home() {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <Layout
//       title={`Hello from ${siteConfig.title}!`}
//       description="">
//       <HomepageHeader />
//       <main>
//         <HomepageContent />
//       </main>
//     </Layout>
//   );
// }
