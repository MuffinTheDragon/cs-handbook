import { BundledLanguage, codeToHtml } from "shiki";

interface HighlightedCodeProps {
  code: string;
  lang: BundledLanguage;
}

export async function HighlightedCode({ code, lang }: HighlightedCodeProps) {
  const html = await codeToHtml(code, {
    lang,
    theme: "github-dark-default",
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
