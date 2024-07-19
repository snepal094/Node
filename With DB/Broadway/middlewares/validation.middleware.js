const validateRequestBody = (validationSchema) => async (req, res, next) => {
  const data = req.body;

  try {
    const validatedData = await validationSchema.validate(data);
    req.body = validatedData;
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  next();
};

//returns function: function factory
//look up  the syntax of arrow function returning only one entity if confused

export default validateRequestBody;
