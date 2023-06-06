// //fucntion refrnace 
// validate(p){
//     const schema = Joi.object().keys({
//       id: Joi.number().integer(),
//       name: Joi.string().min(3).max(30).required(),
//       price: Joi.number().precision(2).required()
//     });
//     const {error} = Joi.validate(p, schema);
//     if(error){
//       return error.details[0].message;
//     }
//     return null;
//   }