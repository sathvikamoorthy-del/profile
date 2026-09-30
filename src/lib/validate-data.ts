import type { z } from 'zod'

/**
 * Parses `data` against `schema`, throwing a readable error that names the
 * source file and the exact field path when validation fails (ST-024) —
 * instead of letting a malformed content JSON surface as a blank page.
 */
export function validateData<Schema extends z.ZodType>(
  schema: Schema,
  data: unknown,
  sourceFile: string,
): z.infer<Schema> {
  const result = schema.safeParse(data)

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('\n')

    throw new Error(`Invalid data in ${sourceFile}:\n${issues}`)
  }

  return result.data
}
