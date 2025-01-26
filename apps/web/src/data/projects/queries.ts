import { type Showcase, type User } from "@echo-webkom/db/schemas";

import { apiServer } from "@/api/server";

export const getAllProjects = async () => {
  return await apiServer.get("projects").json<
    Array<
      Showcase & {
        user: User;
      }
    >
  >();
};
