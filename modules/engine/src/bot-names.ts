// Bots' names (spec §6): the cast agreed with the user (D35), shown with a 🤖 in the player colours.
// Each gets a personality and a letter-writing voice with the rules (spec §6.1). Names, so they
// aren't translated.
export const botNames = ['Lord Pennypinch', 'Lady Prunella', 'Count Bartholomew', 'Mr Grimsby', 'Miss Featherwick', 'Sir Reginald Fogg'] as const;

// The first bot name nobody at the table has; after that, a number makes one unique.
export const pickBotName = (taken: ReadonlySet<string>): string => {
  const free = botNames.find((name) => !taken.has(name));

  if (free) return free;

  let suffix = 2;

  while (taken.has(`${botNames[0]} ${suffix}`)) {
    suffix++;
  }

  return `${botNames[0]} ${suffix}`;
};
