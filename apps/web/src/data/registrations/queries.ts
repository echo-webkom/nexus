import { unstable_cache as cache } from "next/cache";
import { eq } from "drizzle-orm";
import { log } from "next-axiom";

import { db } from "@echo-webkom/db";

import { cacheKeyFactory } from "./revalidate";

export async function getRegistrationsByHappeningId(happeningId: string) {
  return cache(
    async () => {
      return await db.query.registrations
        .findMany({
          where: (registration) => eq(registration.happeningId, happeningId),
          with: {
            user: true,
          },
        })
        .catch(() => {
          log.error("Failed to fetch registrations", {
            happeningId,
          });

          return [];
        });
    },
    [cacheKeyFactory.registrationsHappening(happeningId)],
    {
      tags: [cacheKeyFactory.registrationsHappening(happeningId)],
    },
  )();
}

export async function getRegistrationsByUserId(userId: string) {
  return cache(
    async () => {
      return await db.query.registrations
        .findMany({
          where: (registration) => eq(registration.userId, userId),
          with: {
            happening: true,
          },
        })
        .catch(() => {
          log.error("Failed to fetch registrations", {
            userId,
          });

          return [];
        });
    },
    [cacheKeyFactory.registrationsUser(userId)],
    {
      tags: [cacheKeyFactory.registrationsUser(userId)],
    },
  )();
}
