import { connectDB } from '@/lib/mongodb'
import Games from '@/models/games'
import { NextResponse } from 'next/server'

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        await connectDB();
        let user = await Games.findOne({ _id: userId });
        if (!user) {
            user = await Games.create({ _id: userId, games: [] });
        }
        let gameData = user.games.map(game => ({ id: game._id, status: game.status }));
        console.log('gameData:', gameData);
        return NextResponse.json(gameData);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}

