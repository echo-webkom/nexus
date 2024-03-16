import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

import { db } from "@echo-webkom/db";

import { Container } from "@/components/container";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPastHappenings } from "@/data/happenings/queries";
import { getAllUserStrikes } from "@/data/strikes/queries";
import { unbanUser } from "@/data/users/mutations";
import { getBanInfo } from "@/lib/ban-info";
import { split } from "@/utils/list";
import { AddStrikeButton, RemoveBanButton, RemoveStrikeButton } from "./strike-button";

type Props = {
  params: {
    userId: string;
  };
};

export default async function UserStrikesPage({ params }: Props) {
  const { userId } = params;

  const user = await db.query.users.findFirst({
    where: (user) => eq(user.id, userId),
  });

  if (!user) {
    return notFound();
  }

  const strikes = (await getAllUserStrikes(userId)).reverse();

  const { trueArray: validStrikes, falseArray: earlierStrikes } = split(
    strikes,
    (strike) => strike.id > (user.bannedFromStrike ?? -1),
  );

  const prevBedpresses = await getPastHappenings(10, "bedpres");

  try {
    const banInfo = user.isBanned ? await getBanInfo(user) : undefined;

    if (banInfo && banInfo?.remainingBan <= 0) {
      await unbanUser(user.id);
    }

    return (
      <Container>
        <div className="justify-between sm:flex">
          <div>
            <Heading>{user.name}</Heading>

            {banInfo && banInfo.remainingBan >= 0 && (
              <div className="text-lg text-destructive">
                Brukeren er utestengt{" "}
                {banInfo.nextBedpres && (
                  <>
                    til:{" "}
                    <Link className="hover:underline" href={`/bedpres/${banInfo.nextBedpres.slug}`}>
                      {banInfo.nextBedpres.title}
                    </Link>
                  </>
                )}
              </div>
            )}

            <Text>
              <div>Gyldige prikker: {validStrikes.length}</div>
              <div> Totalt antall prikker: {strikes.length}</div>
            </Text>
          </div>
          <div className="flex flex-col gap-4">
            <AddStrikeButton
              happenings={prevBedpresses}
              user={{
                id: userId,
                name: user.name,
                email: user.email,
              }}
              currentAmount={validStrikes.length}
              variant="destructive"
              className="min-w-28 "
            />
            {banInfo && banInfo?.remainingBan >= 0 && (
              <RemoveBanButton userId={userId} variant="default" className="min-w-28" />
            )}
          </div>
        </div>

        {validStrikes.length === 0 && earlierStrikes.length === 0 && (
          <Text className="mt-5 font-semibold">Brukeren har ingen prikker</Text>
        )}

        {validStrikes.length > 0 && (
          <>
            <Heading className="mt-8" level={3}>
              Gyldige prikker
            </Heading>
            <Text size="sm">Prikker siden forrige gang brukeren ble utestengt.</Text>
            <StrikeTable strikes={validStrikes} userId={userId} />
          </>
        )}

        {earlierStrikes.length > 0 && (
          <>
            <Heading level={3} className="mt-8">
              Tidligere prikker
            </Heading>
            <Text size="sm">Disse prikkene regnes ikke med i neste utestengelse.</Text>
            <StrikeTable strikes={earlierStrikes} userId={userId} />
          </>
        )}
      </Container>
    );
  } catch (error) {
    console.error(error);
    return (
      <Container>
        <Heading>{user.name}</Heading>
        <Text className="text-destructive">En feil har skjedd. Ta kontakt med Webkom.</Text>
      </Container>
    );
  }
}

function StrikeTable({
  strikes,
  userId,
}: {
  strikes: Awaited<ReturnType<typeof getAllUserStrikes>>;
  userId: string;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">Bedpres</TableHead>
          <TableHead scope="col">Årsak</TableHead>
          <TableHead scope="col">Dato gitt</TableHead>
          <TableHead scope="col">Gitt av</TableHead>
          <TableHead scope="col">Handling</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {strikes.map((strike) => {
          return (
            <TableRow key={strike.id}>
              <TableCell>
                <Link
                  className="hover:underline"
                  href={`/bedpres/${strike.strikeInfo.happening.slug}`}
                >
                  {strike.strikeInfo.happening.title}
                </Link>
              </TableCell>
              <TableCell>{strike.strikeInfo.reason}</TableCell>
              <TableCell>{new Date(strike.strikeInfo.createdAt).toDateString()}</TableCell>
              <TableCell>
                {strike.strikeInfo.issuer.id === userId
                  ? "Automatisk"
                  : strike.strikeInfo.issuer.name}
              </TableCell>

              <TableCell>
                <RemoveStrikeButton strikeId={strike.id} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
