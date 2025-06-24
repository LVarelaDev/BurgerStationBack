export const createOrderSchemaExample = {
  simpleOrder: {
    summary: 'Pedido simple',
    value: {
      items: [
        {
          burgerId: 1,
          quantity: 1,
          customizations: [
            { optionId: 1, price: 1.0 },
            { optionId: 5, price: 0.8 },
          ],
        },
      ],
      customerNote: 'Sin cebolla por favor',
    },
  },
  complexOrder: {
    summary: 'Pedido complejo',
    value: {
      items: [
        {
          burgerId: 2,
          quantity: 2,
          customizations: [{ optionId: 3, price: 1.5 }],
        },
        {
          burgerId: 4,
          quantity: 1,
          customizations: [],
        },
      ],
    },
  },
};
