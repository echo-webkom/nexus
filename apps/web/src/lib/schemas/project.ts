import { z } from "zod";

export const addProjectSchema = z.object({
  title: z.string().max(100, { message: "Tittelen kan ikke være mer enn 100 bokstaver." }),
  description: z
    .string()
    .max(500, { message: "Beskrivelsen kan ikke være mer enn 500 bokstaver." }),
  url: z.string().url({ message: "Ikke en gyldig URL." }),
});
