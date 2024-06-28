import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string().min(3).max(25).required("Please enter your name"),
  address: Yup.string().min(8).max(40).required("Please enter your address"),
  email: Yup.string().email().required("Please enter your email"),
  phone: Yup.number().required("Please enter your phone number"),
});
