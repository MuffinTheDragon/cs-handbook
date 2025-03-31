import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ... other imports and constants ...

function addSection(sectionName) {
  const kebabCase = sectionName.toLowerCase().replace(/\s+/g, '-');
  const pascalCase = kebabToPascalCase(kebabCase);
  const enumName = pascalCase.toUpperCase().replace(/\s+/g, '_');

  // Update the sections enum file
  const enumPath = path.join('src', 'types', 'sections.ts');
  let enumContent = fs.readFileSync(enumPath, 'utf8');

  // Add new enum value
  const enumInsertPosition = enumContent.lastIndexOf('}');
  const newEnum = `  ${enumName} = "${pascalCase}",\n`;

  enumContent =
    enumContent.slice(0, enumInsertPosition) +
    newEnum +
    enumContent.slice(enumInsertPosition);

  // Add new URL mapping
  const urlMapPosition = enumContent.lastIndexOf('};');
  const newUrlMap = `  [SectionName.${enumName}]: "/${kebabCase}",\n`;

  enumContent =
    enumContent.slice(0, urlMapPosition) +
    newUrlMap +
    enumContent.slice(urlMapPosition);

  fs.writeFileSync(enumPath, enumContent);

  // ... rest of the function (creating directories and updating PAGES)
  // Update the section entry to use the enum
  const newSection = `${needsComma ? '' : ','}
  {
    title: SectionName.${enumName},
    url: SECTION_URLS[SectionName.${enumName}],
    isActive: false,
    items: [],
  }`;

  // ... rest of the function
} 