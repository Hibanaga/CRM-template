import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Language } from '../../models/Language';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityTarget, In, Not, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { languageSeeder } from '../../database/seeders/language.seeder';
import { Seeder } from '../../types/Seeder';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
    private configService: ConfigService,
  ) {}

  async entry(): Promise<string> {
    return `Application succesfully run on http://localhost:${this.configService.get<number>(
      'APP_PORT',
    )}`;
  }

  async seed(): Promise<Seeder> {
    try {
      let removedLanguages = [];
      const notInSeeder = languageSeeder.map(
        ({ language_code }) => language_code,
      );

      const elementsToExclude = await this.languageRepository.find({
        where: {
          language_code: Not(In(notInSeeder)),
        },
      });

      if (elementsToExclude) {
        removedLanguages = await this.remove(
          this.languageRepository,
          Language,
          elementsToExclude,
        );
      }

      const languages = await Promise.all(
        languageSeeder.map(async (language) => {
          const existingLanguage = await this.languageRepository.findOne({
            where: { language_code: language.language_code },
            select: ['id', 'language_code', 'default'],
          });

          if (!existingLanguage) {
            const createdLanguage = await this.create<Language>(
              this.languageRepository,
              Language,
              language,
            );

            return { added: createdLanguage };
          } else {
            return { readed: existingLanguage };
          }
        }),
      ).then((queryResult) => {
        return queryResult.reduce(
          (prev, current) => ({
            added: prev.added.concat(current.added || []),
            readed: prev.readed.concat(current.readed || []),
          }),
          {
            added: [],
            readed: [],
          },
        );
      });

      return {
        languages: {
          ...languages,
          deleted: removedLanguages,
        },
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create<T>(
    repository: Repository<T>,
    entityClass: EntityTarget<T>,
    element: Record<string, any>,
  ): Promise<T> {
    try {
      const newLanguage = await repository
        .createQueryBuilder()
        .insert()
        .into(entityClass)
        .values(element)
        .returning('*')
        .execute();

      return newLanguage.raw;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove<T>(
    repository: Repository<T>,
    entityClass: EntityTarget<T>,
    elementsToExclude: Array<any>,
  ) {
    try {
      return await Promise.all(
        elementsToExclude.map(async (language) => {
          return await this.languageRepository.remove(language);
        }),
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
