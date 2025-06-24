import { DocumentType } from '../../application/constants/document-types.const';
import { UserResponseDto } from '../../application/dto/user-response.dto';

export class User {
  constructor(
    public id: number,
    public name: string,
    public typeDocument: DocumentType,
    public document: string,
    public address: string,
    public phone: string,
    public email: string,
    public password: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  toResponseDto(): UserResponseDto {
    const { password, ...userData } = this;
    return userData as UserResponseDto;
  }
}
