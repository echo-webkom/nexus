"use server";

import { type z } from "zod";

import { showcases } from "@echo-webkom/db/schemas";
import { db } from "@echo-webkom/db/serverless";

import { getUser } from "@/lib/get-user";
import { addProjectSchema } from "@/lib/schemas/project";

export const addProject = async (project: z.infer<typeof addProjectSchema>) => {
  const user = await getUser();

  if (!user) {
    return {
      success: false,
      message: "Du må være logget inn for å legge til prosjekt",
    };
  }

  const { success, data } = addProjectSchema.safeParse(project);

  if (!success) {
    return {
      success: false,
      message: "Noe gikk galt",
    };
  }

  await db.insert(showcases).values({
    title: data.title,
    description: data.description,
    url: data.url,
    userId: user.id,
  });

  return {
    success: true,
    message: "Prosjektet ditt ble lagt til!",
  };
};
