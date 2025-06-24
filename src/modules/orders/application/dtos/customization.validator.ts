import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';

@ValidatorConstraint({ name: 'customCustomizationValidator', async: false })
export class CustomizationValidator implements ValidatorConstraintInterface {
  validate(items: CreateOrderItemDto[], args: ValidationArguments) {
    for (const item of items) {
      const additions = item.customizations.filter((c) =>
        [1, 2, 3, 4, 5].includes(c.customizationOptionId),
      );
      const sauces = item.customizations.filter((c) =>
        [6, 7, 8, 9, 10].includes(c.customizationOptionId),
      );

      if (additions.length > 3) {
        args.constraints[0] = 'Máximo 3 adiciones por hamburguesa';
        return false;
      }

      if (sauces.length > 2) {
        args.constraints[0] = 'Máximo 2 salsas por hamburguesa';
        return false;
      }
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return args.constraints[0] || 'Configuración de personalización no válida';
  }
}
