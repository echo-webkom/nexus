import Link from "next/link";

import { Container } from "@/components/container";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import { getAllProjects } from "@/data/projects/queries";

export default async function ProjectHubPage() {
  const projects = await getAllProjects();

  return (
    <Container className="space-y-8 py-10">
      <Heading className="font-mono">ProjectHub</Heading>
      <Text>
        Prosjekter som er laget av studenter på echo. Her kan du finne inspirasjon til egne
        prosjekter, eller kanskje finne noen å samarbeide med. Eller bare se hva andre har laget!
      </Text>

      <Button>
        <Link href="/for-studenter/project-hub/legg-til">Legg til prosjekt</Link>
      </Button>

      {projects.length === 0 && <p>Ingen prosjekter å vise :(</p>}

      <ul className="grid md:grid-cols-2">
        {projects.map((project) => (
          <li key={project.id}>
            <div className="rounded-lg border-2 p-4">
              <h2 className="pb-2 font-mono text-2xl font-bold">{project.title}</h2>
              <p className="text-muted-foreground">{project.description}</p>
              <p className="text-muted-foreground">Laget av {project.user.name}</p>
              <div className="mt-4">
                <a href={project.url} target="_blank" rel="noreferrer">
                  {project.url}
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
