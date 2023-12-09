const { z } = require('zod');

module.exports.createProductDTOSchema = z.object({
  title: z
    .string()
    .min(5, "Product title shouldn't be less than 5 chars")
    .max(20, "Product title shouldn't be more than 20 chars"),
  price: z.number().positive(),
});
