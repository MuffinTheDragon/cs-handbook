import { AvailableSections } from "@/components/available-sections";
import { PageContainer } from "@/components/page/page-container";
import { PAGES } from "@/components/sidebar/pages";
import { H1 } from "@/components/typography/h1";

export default function Home() {
  const sections =
    PAGES.find((section) => section.title === "DSA")?.items ?? [];

  return (
    <PageContainer>
      <H1 title="DSA" subtitle="Data structures & Algorithms" />

      <p>
        This section contains common data structures and algorithms useful to
        know along with their use cases, examples, templates, and much more.
      </p>

      <AvailableSections sections={sections} />

      <p className="text-muted-foreground mt-8 text-sm">
        More content will be added to this section over time.
      </p>
    </PageContainer>
  );
}
