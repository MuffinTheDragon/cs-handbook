import { PageContainer } from "@/components/page/page-container";
import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";
import { H3 } from "@/components/typography/h3";

export default function Home() {
  return (
    <PageContainer>
      <H1 title="Contributing" subtitle="How to contribute" />
      <p>
        To make contributions to the handbook, visit the GitHub, clone the repo,
        and install the dependencies with <code>npm i</code>. Then, have a look
        around the project to see what you want to contribute.
      </p>
      <H2 title="Adding a new section" />
      <p>
        If you want to add a new section (e.g. DSA), you can use the{" "}
        <code>add-section</code> script inside <code>/src/srcipts</code>.
      </p>
      <p>
        Run this script with <code>npm run add-section</code> and pass in the
        new section name you want to add. This script will update the pages data
        and create the required folders for you.
      </p>
      <p>
        All the existing routes in the project are defined under
        <code>/src/components/sidebar/pages.ts</code>.
      </p>
      <H3 title="Usage" />
      <code>npm run add-section "&lt;section-name&gt;"</code>
      <H3 title="Example" />
      <code>npm run add-section DSA</code>
      <H2 title="Adding a new subsection" />
      <p>
        To add a new subsection, use the <code>add-subsection</code> script
        inside
        <code>src/scripts</code>
      </p>
      <p>
        Run this script with npm run add-subsection and pass in the main section
        id, subsection name, and subsection url. Follow the existing conventions
        on how other routes are defined.
      </p>
      <p>
        This will auto update the routes config and add the required folders for
        you.
      </p>
      <H3 title="Usage" />
      <code>
        npm run add-subsection "&lt;section-id&gt;" "&lt;subsection-name&gt;"
        "&lt;subsection-url&gt;"
      </code>
      <p className="text-muted-foreground text-sm">
        note: section id must be a valid id of an existing section
      </p>
      <H3 title="Example" />
      <code>
        npm run add-subsection "dsa" "Sliding window" "/dsa/sliding-window"
      </code>
      <H2 title="Other changes" />
      <p>
        You can make any other changes you want. Whether its a new feature or an
        improvement to how something is done, make a change and open a PR on
        github.
      </p>
    </PageContainer>
  );
}
