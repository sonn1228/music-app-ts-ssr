import unidecode from "unidecode";

export const convertToSlug = (text: string): string => {
  const unidecodeText: string = unidecode(text).toLowerCase().trim();
  const slug: string = unidecodeText.replace(/\s+/g, "-");
  return slug;
};
