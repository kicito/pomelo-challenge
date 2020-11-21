import Joi from 'joi';

export const Alg1InputElem: Joi.ObjectSchema = Joi.object({
	id: Joi.number().integer().min(0).required(),
	title: Joi.string().required(),
	level: Joi.number().integer().min(0),
	children: Joi.array().items(Joi.link('#Alg1InputElem')).required(),
	parent_id: Joi.number().integer().min(0).required().allow(null),
});

export const Alg1Input: Joi.ObjectSchema = Joi.object().pattern(
	/\w/,
	Joi.array().items(Alg1InputElem).required()
);
export default {
	Alg1InputElem,
	Alg1Input,
};
