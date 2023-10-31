import { Language } from '../models/Language';

export interface Seeder {
  languages: {
    readed: Language[];
    added: Language[];
    deleted: Language[];
  };
}
