import { z } from "zod";

// Public, provider-independent fields only. Never send raw recruitment records.
export const careerJobSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  department: z.string().min(1),
  location: z.string().min(1),
  employmentType: z.string().min(1),
  summary: z.string().min(1),
  applicationUrl: z
    .string()
    .url()
    .refine((value) => {
      const url = new URL(value);
      return url.protocol === "https:" && !url.username && !url.password;
    }, "Applications must use a public HTTPS URL"),
});

export const careersFeedSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("coming-soon"),
    jobs: z.array(careerJobSchema).max(0),
  }),
  z.object({ status: z.literal("live"), jobs: z.array(careerJobSchema) }),
]);

export type CareerJob = z.infer<typeof careerJobSchema>;
export type CareersFeed = z.infer<typeof careersFeedSchema>;

export function filterJobs(
  jobs: CareerJob[],
  query: string,
  department: string,
) {
  const search = query.trim().toLocaleLowerCase();
  return jobs.filter(
    (job) =>
      (!department || job.department === department) &&
      [job.title, job.department, job.location, job.summary]
        .join(" ")
        .toLocaleLowerCase()
        .includes(search),
  );
}

export async function fetchCareersFeed(
  signal?: AbortSignal,
): Promise<CareersFeed> {
  const timeout = AbortSignal.timeout(12_000);
  const response = await fetch("/api/careers", {
    signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
  });
  if (!response.ok)
    throw new Error("Opportunities are temporarily unavailable");
  return careersFeedSchema.parse(await response.json());
}
