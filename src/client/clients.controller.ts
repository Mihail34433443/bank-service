import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Client } from './clients.model';
import { ClientService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: 'Создание клента' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Client })
  @Post()
  create(@Body() clientDto: CreateClientDto): Promise<Client> {
    return this.clientService.createClient(clientDto);
  }

  @ApiOperation({ summary: 'Получение всех клиентов' })
  @ApiResponse({ status: HttpStatus.OK, type: [Client] })
  @Get()
  getAll(): Promise<Client[]> {
    return this.clientService.getAllClient();
  }
}
