import { CategoriesSQLiteRepository } from "../repository/CategoriesSQLiteRepository";

export class CategoriesController
  implements MController.IController<MCategory.Base>
{
  private readonly categoriesRepository: CategoriesSQLiteRepository;

  public static initialize(
    categoriesRepository: CategoriesSQLiteRepository
  ): MController.IController<MCategory.Base> {
    return new CategoriesController(categoriesRepository);
  }

  constructor(categoriesRepository: CategoriesSQLiteRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async create(value: MCategory.Base): Promise<MCategory.ICategory> {
    return await this.categoriesRepository.create(value);
  }

  async findAll(): Promise<MCategory.ICategory[]> {
    return await this.categoriesRepository.findAll();
  }

  async findById(id: number): Promise<MCategory.ICategory> {
    return await this.categoriesRepository.findById(id);
  }

  async update(value: MCategory.ICategory): Promise<MCategory.ICategory> {
    return await this.categoriesRepository.update(value);
  }

  async delete(id: number): Promise<void> {
    await this.categoriesRepository.delete(id);
  }
}
