import { GitHub, Google } from "arctic";

export const github = new GitHub(
  import.meta.env.GITHUB_CLIENT_ID,
  import.meta.env.GITHUB_CLIENT_SECRET,
  import.meta.env.GITHUB_REDIRECT_URI,
);

export const google = new Google(
  import.meta.env.GOOGLE_CLIENT_ID,
  import.meta.env.GOOGLE_CLIENT_SECRET,
  import.meta.env.GOOGLE_REDIRECT_URI,
);
