import Joi from 'joi';
import mongoose from 'mongoose';

interface IAnswer extends mongoose.Document {
    flashcardId: mongoose.Schema.Types.ObjectId;
    date: Date;
    isCorrect: boolean;
}

const answerSchema = new mongoose.Schema({
    flashcardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flashcard',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    }
});

const Answer = mongoose.model<IAnswer>('Answer', answerSchema);

function validateAnswer(flashcard: typeof Answer): Joi.ValidationResult {
    const schema = Joi.object({
        flashcardId: Joi.string().required(),
        isCorrect: Joi.boolean().required()
    });

    return schema.validate(flashcard);
}

export { Answer, IAnswer, validateAnswer };
