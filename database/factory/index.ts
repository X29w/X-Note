import { CategoriesController } from "../controller/CategoriesController";
import { MissionsController } from "../controller/MissionsController";
import { CategoriesSQLiteRepository } from "../repository/CategoriesSQLiteRepository";
import { MissionsSQLiteRepository } from "../repository/MissionsSQLiteRepository";

/** 任务Controller工厂 */
export const missionsFactory = (): MController.IController<MMission.Base> =>
  MissionsController.initialize(new MissionsSQLiteRepository());

/** 分类Controller工厂 */
export const categoriesFactory = (): MController.IController<MCategory.Base> =>
  CategoriesController.initialize(new CategoriesSQLiteRepository());
