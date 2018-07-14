export const USERNAME_DOMAIN = process.env.USERNAME_DOMAINS || "multiapp.eth";
export const USERNAME_REGEXP = /^[a-zA-Z0-9]+$/;
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 32;

export function normalizeUsername(username: string): string {
  if (!username.endsWith("." + USERNAME_DOMAIN)) {
    throw new Error("unsupported username domain");
  }

  const usernameParts = username.split(".");
  if (usernameParts.length !== 3) {
    throw new Error("invalid username");
  }

  const n = usernameParts[0];
  if (n.length > USERNAME_MAX_LENGTH) {
    throw new Error(`username too long (max ${USERNAME_MAX_LENGTH})`);
  } else if (n.length < USERNAME_MIN_LENGTH) {
    throw new Error(`username too short (min ${USERNAME_MIN_LENGTH})`);
  }

  if (!n.match(USERNAME_REGEXP)) {
    throw new Error("username contains invalid characters");
  }

  return username.toLowerCase();
}
