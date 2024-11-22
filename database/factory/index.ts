import { MissionsController } from "../controller/MissionsController";
import { MissionsSQLiteRepository } from "../repository/MissionsSQLiteRepository";

export const missionsFactory = (): MController.IController<MMission.Base> =>
  MissionsController.initialize(new MissionsSQLiteRepository());
