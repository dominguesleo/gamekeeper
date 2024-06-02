import { connectDB } from '@/lib/mongodb'
import Games from '@/models/games'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        const gameId = params.id;
        await connectDB();
        let user = await Games.findOne({ _id: userId });
        if (!user) {
            user = await Games.create({ _id: userId, games: [] });
        }
        let game = user.games.find(game => game._id === gameId);
        if (game) {
            return NextResponse.json({ status: game.status });
        } else {
            return NextResponse.json({});
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}

export async function POST(req, { params }) {
    try {
        const { userId, newStatus } = await req.json();
        const gameId = params.id;
        if (newStatus === undefined) {
            return new NextResponse({ status: 204 });
        }
        await connectDB();
        let user = await Games.findOne({ _id: userId });
        if (!user) {
            user = await Games.create({ _id: userId, games: [] });
        }
        let game = user.games.id(gameId);
        if (!game) {
            user.games.push({ _id: gameId, status: newStatus });
        } else {
            game.status = newStatus;
        }
        await user.save();
        const gameResponse = { _id: gameId, status: newStatus };
        return NextResponse.json(gameResponse);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        const gameId = params.id;
        await connectDB();
        let user = await Games.findOne({ _id: userId });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        const game = user.games.find(game => game.id.toString() === gameId);
        if (!game) {
            return NextResponse.json({ error: 'Game not found' }, { status: 404 });
        }
        user.games.pull(game);
        await user.save();
        return NextResponse.json({ message: 'Game removed successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}