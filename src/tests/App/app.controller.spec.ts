import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../../modules/App/app.service';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AppService', () => {
  let appService: AppService;
  let configService: ConfigService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        ConfigService,
        {
          provide: 'LanguageRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should return the expected message with port number', async () => {
    const mockPort = 3000;
    jest.spyOn(configService, 'get').mockReturnValue(mockPort);

    const result = await appService.entry();
    expect(result).toBe(
      `Application successfully run on http://localhost:${mockPort}`,
    );
  });

  it('should handle errors and throw an HttpException', async () => {
    jest.spyOn(configService, 'get').mockReturnValue(3000);

    const expectedError = new HttpException(
      "Cannot read properties of undefined (reading 'find')",
      HttpStatus.INTERNAL_SERVER_ERROR,
    );

    await expect(appService.seed()).rejects.toEqual(expectedError);
  });
});
