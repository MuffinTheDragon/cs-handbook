import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ... other imports and constants ...

function addSubsection(sectionEnum, subsectionName, url) {
  // Update the regex to match enum usage
  const sectionRegex = new RegExp(`title: SectionName\\.${sectionEnum}[^}]*items:\\s*\\[(.*?)\\s*\\]`, 's');

  // ... rest of the function remains the same
}

// Update the command line argument handling
const sectionEnum = process.argv[2];
const subsectionName = process.argv[3];
const url = process.argv[4];

if (!sectionEnum || !subsectionName || !url) {
  console.error('Please provide all required arguments');
  console.error('Example: npm run add-subsection "DESIGN_PATTERNS" "Factory Method" "/design-patterns/factory-method"');
  process.exit(1);
} 