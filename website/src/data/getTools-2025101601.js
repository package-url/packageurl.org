import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import toolsData from "./tools.json";

/**
 * getTools() loads tools.json and prefixes baseUrl to any relative logo paths.
 */
export default function getTools() {
  const { siteConfig } = useDocusaurusContext();
  const { baseUrl } = siteConfig;

  // Adjust any logo paths that start with '/'
//   const tools = toolsData.map(tool => ({
//     ...tool,
//     logo: tool.logo.startsWith("/")
//       ? `${baseUrl.replace(/\/$/, "")}${tool.logo}`
//       : tool.logo,
//   }));

//   return tools;

  // Return tools list with correct baseUrl applied
  return toolsData.map(tool => ({
    ...tool,
    logo: tool.logo.startsWith("http")
      ? tool.logo
      : `${baseUrl}${tool.logo.replace(/^\//, "")}`,
  }));

}
