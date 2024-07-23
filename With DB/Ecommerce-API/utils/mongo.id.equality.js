const checkMongoIdEquality = (id1, id2) => {
  const equalIds = id1.equals(id2); //not asynchronous, instant
  return equalIds; //boolean value
};

export default checkMongoIdEquality;
