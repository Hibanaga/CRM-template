import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../../modules/App/app.service';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMPostgresqlTestingModule } from '../../config/tests';
import { Language } from '../../models/Language';
import { INestApplication } from '@nestjs/common';
import { AppController } from '../../modules/App/app.controller';
import { AppModule } from '../../app.module';
import { Repository } from 'typeorm';

describe('AppService', () => {
  let app: INestApplication;
  let appService: AppService;
  let configService: ConfigService;
  let repository: Repository<Language>;

  const languages = [
    {
      id: '0e442338-b841-4bb1-9003-d777b7af23cf',
      language_code: 'First code',
      default: true,
    },
    {
      id: '05ea2041-57e5-4631-96a3-f17c85b168ba',
      language_code: 'Second code',
    },
  ];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeORMPostgresqlTestingModule([Language]),
        TypeOrmModule.forFeature([Language]),
      ],
      controllers: [AppController],
      providers: [AppService, ConfigService],
    }).compile();

    app = module.createNestApplication();
    appService = module.get<AppService>(AppService);
    configService = module.get<ConfigService>(ConfigService);

    repository = module.get('LanguageRepository');
    await app.init();
  });

  afterEach(async () => {
    await repository.query(`DELETE FROM languages;`);
  });

  afterAll(() => {
    app.close();
  });

  it('should return the expected message with port number', async () => {
    const mockPort = 3000;
    jest.spyOn(configService, 'get').mockReturnValue(mockPort);

    const result = await appService.entry();
    expect(result).toBe(
      `Application successfully run on http://localhost:${mockPort}`,
    );
  });

  it('should success repository', async () => {
    await repository.save(languages);

    await expect((await repository.find()).length).toEqual(2);
  });

  it('should succesfully seeding', async () => {
    const { languages } = await appService.seed();

    expect(languages.added.length).toEqual(3);
    expect(languages.readed.length).toEqual(0);
    expect(languages.deleted.length).toEqual(0);
  });

  it('should succesfully creating', async () => {
    const newLanguage = {
      id: '0e442338-b841-4bb1-9003-d777b7af23cf',
      language_code: 'First code',
      default: true,
    };

    const createdItem = await appService.create(
      repository,
      Language,
      newLanguage,
    );

    expect(createdItem[0].id).toBe(newLanguage.id);
    expect(createdItem[0].language_code).toBe(newLanguage.language_code);
    expect(createdItem[0].default).toBe(newLanguage.default);
  });
});
