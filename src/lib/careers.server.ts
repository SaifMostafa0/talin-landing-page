import "@tanstack/react-start/server-only";
import { careersFeedSchema, type CareersFeed } from "./careers";

// Implement this boundary with a Zoho adapter once access and public fields are confirmed.
// The provider must return only approved, published openings and hosted application URLs.
export interface CareersProvider {
  getFeed(): Promise<CareersFeed>;
}

const pendingProvider: CareersProvider = {
  async getFeed() {
    return { status: "coming-soon", jobs: [] };
  },
};

export async function getCareersFeed(
  provider: CareersProvider = pendingProvider,
): Promise<CareersFeed> {
  return careersFeedSchema.parse(await provider.getFeed());
}
