import type { PlatformScreenRepository } from "../platform-types";
import { buildForDivisions, isDivisionScoped } from "./divisions";
import { academicScreens } from "./academics";
import { examinationScreens } from "./examinations";
import { financeScreens } from "./finance";
import { hostelScreens } from "./hostels";
import { institutionScreens } from "./institution";
import { platformScreens } from "./platform";
import { registrationScreens } from "./registrations";
import { reportScreens } from "./reports";
import type { Builder } from "./shared";
import { userScreens } from "./users";

const SCREENS: Record<string, Builder> = {
  ...platformScreens,
  ...institutionScreens,
  ...financeScreens,
  ...userScreens,
  ...registrationScreens,
  ...academicScreens,
  ...examinationScreens,
  ...hostelScreens,
  ...reportScreens,
};

// The mock builds every screen from the institution type alone: all mock data
// belongs to one imaginary school, so it ignores ctx.tenant.id.
export const mockPlatformScreenRepository: PlatformScreenRepository = {
  async getScreen(ctx, slug) {
    const build = SCREENS[slug];
    if (!build) return undefined;
    return isDivisionScoped(slug) ? buildForDivisions(build, ctx) : build(ctx);
  },
};
