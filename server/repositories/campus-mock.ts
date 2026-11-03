import type { CampusRepository } from "./campus-types";

// "North Campus" is invented mock data so the switcher can be tested.
export const mockCampusRepository: CampusRepository = {
  async list() {
    return [
      { id: "main", name: "Main Campus" },
      { id: "north", name: "North Campus" },
    ];
  },
};