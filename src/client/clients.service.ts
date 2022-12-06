import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './clients.model';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client) private clientRepositry: typeof Client) {}

  async createClient(dto: CreateClientDto): Promise<Client> {
    const client = await this.clientRepositry.create(dto);
    return client;
  }

  async getAllClient(): Promise<Client[]> {
    const clients = await this.clientRepositry.findAll();
    return clients;
  }
}
