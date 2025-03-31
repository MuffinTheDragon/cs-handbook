import { AvailableSections } from "@/components/available-sections";
import { PageContainer } from "@/components/page/page-container";
import { PAGES } from "@/components/sidebar/pages";
import { H1 } from "@/components/typography/h1";

export default function Home() {
  const designPatterns =
    PAGES.find((section) => section.title === "Design Patterns")?.items ?? [];

  return (
    <PageContainer>
      <H1
        title="Design Patterns"
        subtitle="Proven solutions to common software design problems"
      />

      <p>
        Design patterns are reusable solutions to common problems that occur in
        software design. They represent best practices evolved over time by
        experienced software developers. These patterns provide a standard
        terminology and are specific to particular scenarios.
      </p>

      <p>Understanding and implementing design patterns can help you:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Write more maintainable and scalable code</li>
        <li>Solve common design problems efficiently</li>
        <li>Communicate design solutions effectively with other developers</li>
        <li>Build robust and flexible software systems</li>
      </ul>

      <AvailableSections sections={designPatterns} />

      <p className="text-muted-foreground mt-8 text-sm">
        More patterns will be added to this collection over time. Each pattern
        includes detailed explanations, implementation examples, and best
        practices for real-world usage.
      </p>
    </PageContainer>
  );
}
