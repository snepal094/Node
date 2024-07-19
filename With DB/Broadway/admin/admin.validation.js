import Yup from "yup";

const registerAdminValidationSchema = Yup.object({
  email: Yup.string().required().trim().max(55).email().lowercase(),
  //yup can't find unique or not, db is needed for that
  //yup dosen't have access to database
  //.email() checks for @, . n all
  password: Yup.string().required().trim().min(4).max(20),
  firstName: Yup.string().required().trim().max(30).lowercase(),
  lastName: Yup.string().required().trim().max(30).lowercase(),
});

const loginValidationSchema = Yup.object({
  email: Yup.string().required().email().trim().lowercase(),
  password: Yup.string().required().trim(),
});

export { registerAdminValidationSchema, loginValidationSchema };
