// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const formSchema = z.object({
  repoName: z.string(),
  keywords: z.array(z.string()).default([]),
});

type FormInput =z.input<typeof formSchema>
type FormOutput = z.output<typeof formSchema> // the same as z.infer<typeof formSchema>

export const validateFormInput = (values: unknown) => {
  const parsedData = formSchema.parse(values);

  return parsedData;
};

// TESTS

it("Should include keywords if passed", async () => {
  const result = validateFormInput({
    repoName: "mattpocock",
    keywords: ["123"],
  });

  expect(result.keywords).toEqual(["123"]);
});

it("Should automatically add keywords if none are passed", async () => {
  const result = validateFormInput({
    repoName: "mattpocock",
  });

  expect(result.keywords).toEqual([]);
});
