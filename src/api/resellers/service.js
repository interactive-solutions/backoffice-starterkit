import axios from 'axios';
import { ResellerEntity } from './entity';

export class ResellerService {
  hydrate(data) {
    return new ResellerEntity(
      data.uuid,
      data.name,
      data.billingId
    );
  }

  hydrateArray(data) {
    return data.map(this.hydrate);
  }

  get() {
    return axios.get('backend://resellers')
      .then((response) => this.hydrateArray(response.data.data));
  }

  create(reseller: {name: string, billingId: string}) {
    return axios.post('backend://resellers', reseller)
      .then((response) => response);
  }
}
