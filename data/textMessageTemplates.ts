const textMessageTemplates = [
  'Help! I got in a car accident!',
  'Help! I injured myself!',
];

export const getTextMessageTemplates = (location?: string) =>
  textMessageTemplates.map(
    (template) => `${template}\n\n${location || 'Location: unknown'}`
  );
