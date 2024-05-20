import * as yup from "yup";

export const schema = yup.object({
  senderAddress: yup.object({
    street: yup
      .string()
      .required("Can't be empty")
      .max(20, "max limit reached")
      .min(5, "min 5 characters")
      .test("sender street check", "incorrect address", (value) =>
        value.includes("")
      ),
    city: yup
      .string()
      .required("Can't be empty")
      .max(20, "max limit reached")
      .min(3, "min 3 characters"),
    postCode: yup
      .string()
      .required("Can't be empty")
      .max(8, "max limit reached")
      .min(4, "min 3 characters"),
    country: yup
      .string()
      .required("Can't be empty")
      .max(15, "max limit reached")
      .min(3, "min 3 characters"),
  }),
  clientAddress: yup.object({
    street: yup
      .string()
      .required("Can't be empty")
      .max(20, "max limit reached")
      .min(5, "min 5 characters")
      .test("sender street check", "incorrect address", (value) =>
        value.includes("")
      ),
    city: yup
      .string()
      .required("Can't be empty")
      .max(20, "max limit reached")
      .min(3, "min 3 characters"),
    postCode: yup
      .string()
      .required("Can't be empty")
      .max(8, "max limit reached")
      .min(4, "min 3 characters"),
    country: yup
      .string()
      .required("Can't be empty")
      .max(15, "max limit reached")
      .min(3, "min 3 characters"),
  }),
  items: yup.array().of(
    yup.object({
      name: yup
        .string()
        .required("Can't be empty")
        .max(15, "max limit reached")
        .min(3, "min 3 characters"),
      quantity: yup
        .number()
        .required("Can't be empty")
        .positive("invalid value"),
      // .max(5, "max limit reached"),
      price: yup.number().required("Can't be empty").positive("invalid value"),
      // .max(5, "max limit reached"),
      // total: yup
      //   .number()
      //   .required("Can't be empty")
      //   .positive("invalid value"),
    })
  ),
  clientEmail: yup.string().required("Can't be empty"),
  clientName: yup.string().required("Can't be empty"),
  description: yup.string().required("Can't be empty"),
  // createdAt: yup.string().required("Can't be empty"),
  paymentTerms: yup.string().required("Can't be empty"),
  paymentDue: yup.string().required("Can't be empty"),
});
