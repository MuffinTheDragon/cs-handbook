import { AvailableSections } from "@/components/available-sections";
import { PageContainer } from "@/components/page/page-container";
import { PAGES } from "@/components/sidebar/pages";
import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";

export default function Home() {
  return (
    <PageContainer>
      <H1
        title="Introduction"
        subtitle="Community-driven handbook for all things related to CS"
      />
      <p>
        This is a collection of various topics relevant to CS. Think of it as
        one giant handbook that explains all kinds of different topics that you
        can use to study, learn, get a refresher, etc.
      </p>
      <p>
        The main goal of this handbook is to provide content of the highest
        quality—carefully curated and crafted to ensure clarity and accuracy. It
        aims to provide value that encourages readers to return time and again,
        knowing that they'll find up-to-date, relevant, and comprehensive
        information on all things CS.
      </p>
      <H2 title="Open source" />
      <p>
        Everything in here is open-source and fully accessible to anyone. That
        means anyone can also add or edit content in the handbook. If there's
        anything you want to add or edit, take a look at the contributing
        section to learn more.
      </p>
      <AvailableSections
        title="What's included?"
        sections={PAGES.filter((page) => page.url != "#")}
      />
      <p className="text-muted-foreground text-sm">
        Note: more sections will be added over time
      </p>
    </PageContainer>
  );
}
