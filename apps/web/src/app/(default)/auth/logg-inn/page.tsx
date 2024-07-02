import Link from "next/link";

import { Callout } from "@/components/typography/callout";
import { Text } from "@/components/typography/text";
import { getSignInAttempt } from "@/data/cache/sign-in-attempt";
import { SignInButtons } from "./_components/sign-in-buttons";

type Props = {
  searchParams: {
    attemptId?: string;
  };
};

export default async function SignInPage({ searchParams }: Props) {
  const { attemptId } = searchParams;

  const isValidAttemptId = attemptId && (await getSignInAttempt(attemptId));

  return (
    <div className="mx-4 my-14 flex flex-col gap-4">
      {Boolean(isValidAttemptId) && (
        <Callout className="mx-auto max-w-screen-sm" type="warning">
          <Text size="sm">
            Noe gikk galt. Dette kan være grunnet til at vi ikke automatisk får til å finne ut om du
            er medlem. Om du mener dette er feil vennligst{" "}
            <Link href={`/auth/tilgang/${attemptId}`} className="underline hover:no-underline">
              be om tilgang her.
            </Link>
          </Text>
        </Callout>
      )}

      <SignInButtons />
    </div>
  );
}
