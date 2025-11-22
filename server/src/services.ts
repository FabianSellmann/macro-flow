import { FredService } from './services/fred.service';

class Services {
  private _fred: FredService | null = null;

  get fred(): FredService {
    if (!this._fred) {
      this._fred = new FredService();
    }
    return this._fred;
  }
}

export const services = new Services();
export { Services };