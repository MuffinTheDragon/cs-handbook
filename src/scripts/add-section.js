import fs from 'fs';
import path from 'path';

// Template for the page.tsx file
const PAGE_TEMPLATE = `import { AvailableSections } from "@/components/available-sections";
import { PageContainer } from "@/components/page/page-container";
import { H1 } from "@/components/typography/h1";
import { PAGES } from "@/components/sidebar/pages";

export default function Home() {
  const sections = PAGES.find(section => section.title === "{sectionName}")?.items ?? [];

  return (
    <PageContainer>
      <H1
        title="{sectionName}"
        subtitle="Add your section subtitle here"
      />

      <p>
        Add your section description here.
      </p>

      <AvailableSections
        sections={sections}
      />

      <p className="text-muted-foreground mt-8 text-sm">
        More content will be added to this section over time.
      </p>
    </PageContainer>
  );
}`;

// Template for the layout.tsx file
const LAYOUT_TEMPLATE = `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "{sectionName}",
  description: "Add your section description here",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}`;

function addSection(sectionName) {
  // Convert section name to kebab case for URL
  const kebabCase = sectionName.toLowerCase().replace(/\s+/g, '-');

  // Create the section directory
  const sectionDir = path.join('src', 'app', kebabCase);
  if (!fs.existsSync(sectionDir)) {
    fs.mkdirSync(sectionDir, { recursive: true });
  }

  // Create page.tsx with proper replacements
  const pageContent = PAGE_TEMPLATE.replace(/{sectionName}/g, sectionName);
  fs.writeFileSync(path.join(sectionDir, 'page.tsx'), pageContent);

  // Create layout.tsx with proper replacements
  const layoutContent = LAYOUT_TEMPLATE.replace(/{sectionName}/g, sectionName);
  fs.writeFileSync(path.join(sectionDir, 'layout.tsx'), layoutContent);

  // Update the pages.ts file
  const pagesPath = path.join('src', 'components', 'sidebar', 'pages.ts');
  let pagesContent = fs.readFileSync(pagesPath, 'utf8');

  // Find the position to insert the new section (before the last closing bracket)
  const lastArrayBracket = pagesContent.lastIndexOf('];');
  if (lastArrayBracket === -1) {
    console.error('Could not find PAGES array');
    process.exit(1);
  }

  // Check if we need to add a comma (if there are existing sections)
  const needsComma = pagesContent.slice(0, lastArrayBracket).trim().endsWith('},');

  // Create the new section entry
  const newSection = `${needsComma ? '' : ','}
  {
    id: :"${kebabCase}",
    title: "${sectionName}",
    url: "/${kebabCase}",
    isActive: false,
    items: [],
  }`;

  // Insert the new section
  pagesContent = pagesContent.slice(0, lastArrayBracket) +
    newSection +
    pagesContent.slice(lastArrayBracket);

  // Write back to pages.ts
  fs.writeFileSync(pagesPath, pagesContent);

  console.log(`Successfully added new section: ${sectionName}`);
  console.log(`Created files in: ${sectionDir}`);
  console.log('Don\'t forget to:');
  console.log('1. Update the section description in page.tsx');
  console.log('2. Update the section metadata in layout.tsx');
  console.log('3. Add subsections using npm run add-subsection');
}

// Get section name from command line argument
const sectionName = process.argv[2];
if (!sectionName) {
  console.error('Please provide a section name as an argument');
  console.error('Example: npm run add-section "Best Practices"');
  process.exit(1);
}

addSection(sectionName); 