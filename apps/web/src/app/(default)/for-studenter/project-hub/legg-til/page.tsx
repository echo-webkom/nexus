import { Container } from "@/components/container";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { getUser } from "@/lib/get-user";
import { AddProjectForm } from "./_components/add-project-form";

export default async function AddToProjectHub() {
  const user = await getUser();

  if (!user) {
    return (
      <Container className="space-y-8 py-10">
        <p>Du må være logget inn for å legge til prosjekt</p>
      </Container>
    );
  }

  return (
    <Container className="space-y-8 py-10">
      <div className="w-full md:max-w-[500px]">
        <Heading>Legg til prosjekt</Heading>
        <Text>Legg til prosjektet ditt her! Det trenger ikke å være ferdig.</Text>
        <AddProjectForm />
      </div>
    </Container>
  );
}
