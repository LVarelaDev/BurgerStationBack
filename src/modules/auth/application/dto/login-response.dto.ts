import { Expose } from 'class-transformer';

export class LoginResponseDto {
  @Expose()
  user: {
    id: string;
    name: string;
    email: string;
    typeDocument: string;
    document: string;
    address: string;
    phone: string;
  };

  @Expose()
  token: string;

  static fromDomain(user: any, token: string): LoginResponseDto {
    const response = new LoginResponseDto();
    response.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      typeDocument: user.typeDocument,
      document: user.document,
      address: user.address,
      phone: user.phone,
    };
    response.token = token;
    return response;
  }
}
