import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
    _id: { type: String, required: true},
    games: [
        {
            _id: { type: String, required: true },
            status: { type: String, required: false }
        }
    ]
});

const Games = mongoose.models.Games || mongoose.model('Games', GameSchema);

export default Games;
