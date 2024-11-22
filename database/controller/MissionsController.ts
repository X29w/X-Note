import { MissionsSQLiteRepository } from "@/database/repository/MissionsSQLiteRepository";

export class MissionsController
  implements MController.IController<MMission.IMission>
{
  private readonly missionsRepository: MissionsSQLiteRepository;

  public static initialize (petRepository: MissionsSQLiteRepository): MController.IController<MMission.Base> {
    return new MissionsController(petRepository)
}

  constructor(petRepository: MissionsSQLiteRepository) {
    this.missionsRepository = petRepository;
  }

  async create(value: MMission.Base): Promise<MMission.IMission> {
    return await this.missionsRepository.create(value);
  }

  async findAll(): Promise<MMission.IMission[]> {
    return await this.missionsRepository.findAll();
  }

  async findById(id: number): Promise<MMission.IMission> {
    return await this.missionsRepository.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.missionsRepository.delete(id);
  }

  async update(value: MMission.IMission): Promise<MMission.IMission> {
    return await this.missionsRepository.update(value);
  }
}
