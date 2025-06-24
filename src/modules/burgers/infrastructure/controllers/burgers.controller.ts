import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BurgersService } from '../../application/burgers.service';
import { BurgerResponseDto } from '../../application/dtos/create-burger.dto';

@ApiTags('Burgers')
@Controller('burgers')
export class BurgersController {
  constructor(private readonly burgersService: BurgersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all burgers' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all burgers',
    type: [BurgerResponseDto],
  })
  async findAll(): Promise<BurgerResponseDto[]> {
    return this.burgersService.getAllBurgers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get burger by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Burger ID',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Burger details',
    type: BurgerResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Burger not found',
  })
  async findOne(@Param('id') id: number): Promise<BurgerResponseDto> {
    return await this.burgersService.getBurgerById(id);
  }
}
