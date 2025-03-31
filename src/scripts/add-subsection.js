import fs from "fs";
import path from "path";

// Template for the page.tsx file
const PAGE_TEMPLATE = `import { PageContainer } from "@/components/page/page-container";
import { H1 } from "@/components/typography/h1";

export default function Home() {
  return (
    <PageContainer>
      <H1 title="{subsectionName}" subtitle="{subsectionName} pattern" />

      <p>
        Description goes here
      </p>

    </PageContainer>
  );
}`;

// Template for the layout.tsx file
const LAYOUT_TEMPLATE = `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "{subsectionName}",
  description: "{subsectionName} pattern implementation and examples",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}`;

function addSubsection(
  sectionId,
  subsectionName,
  url,
) {

  // Update the pages.ts file
  const pagesPath = path.join("src", "components", "sidebar", "pages.ts");
  let pagesContent = fs.readFileSync(pagesPath, "utf8");

  // Find the section to add the subsection to
  const sectionRegex = new RegExp(`id: "${sectionId}"[^}]*items:\\s*\\[(.*?)\\s*\\]`, 's');
  const sectionMatch = pagesContent.match(sectionRegex);

  if (!sectionMatch || !sectionMatch.index) {
    console.error(`Section with id "${sectionId}" not found`);
    process.exit(1);
  }

  // Create the new directory based on the URL path
  const urlParts = url.split("/").filter(Boolean); // Remove empty strings
  const dirPath = path.join("src", "app", ...urlParts);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Create page.tsx with proper replacements
  const pageContent = PAGE_TEMPLATE.replace(
    /{subsectionName}/g,
    subsectionName,
  );
  fs.writeFileSync(path.join(dirPath, "page.tsx"), pageContent);

  // Create layout.tsx with proper replacements
  const layoutContent = LAYOUT_TEMPLATE.replace(
    /{subsectionName}/g,
    subsectionName,
  );
  fs.writeFileSync(path.join(dirPath, "layout.tsx"), layoutContent);

  // Find the position of the closing bracket of the items array
  const insertPosition = sectionMatch.index + sectionMatch[0].length - 1; // Position right before the closing bracket

  // Create the new subsection entry
  const newSubsection = `
      {
        title: "${subsectionName}",
        url: "${url}",
      },`;

  // Insert the new subsection
  pagesContent =
    pagesContent.slice(0, insertPosition) +
    newSubsection +
    pagesContent.slice(insertPosition);

  // Write back to pages.ts
  fs.writeFileSync(pagesPath, pagesContent);

  console.log(`Successfully added new subsection: ${subsectionName}`);
  console.log(`Created files in: ${dirPath}`);
  console.log("Don't forget to:");
  console.log("1. Add your pattern description in the page.tsx file");
  console.log(
    "2. Add your code examples in the OLD_CODE and NEW_CODE constants",
  );
  console.log("3. Update the pattern description in pages.ts");
}

// Get arguments from command line
const sectionId = process.argv[2];
const subsectionName = process.argv[3];
const url = process.argv[4];

if (!sectionId || !subsectionName || !url) {
  console.error("Please provide all required arguments");
  console.error(
    'Usage: npm run add-subsection <section-id> <subsection-name> <subsection-url>')
  console.error(
    'Example: npm run add-subsection "design-patterns" "Factory Method" "/design-patterns/factory-method"',
  );
  process.exit(1);
}

addSubsection(sectionId, subsectionName, url);
