"use client"
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs'
import {ButtonDelete} from '@/components/button/ButtonDelete'
import './gamestatus.css'

export function GameStatus({ gameId }) {
    const { user, isSignedIn } = useUser();
    const [selectedStatus, setSelectedStatus] = useState(null);
    const statusName = ["owned", "toplay", "playing", "beaten", "dropped"]

    useEffect(() => {
        const fetchStatus = async () => {
            if (user && user.id) {
                try {
                    const response = await fetch(`/api/games/${gameId}?userId=${user.id}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const statusDB = await response.json();
                    if (statusDB) {
                        setSelectedStatus(statusDB.status);
                    }
                } catch (error) {
                    console.error('Failed to fetch game status:', error);
                }
            }
        };
        fetchStatus();
    }, [user, gameId]);

    useEffect(() => {
        const updateStatus = async () => {
            if (user && user.id && selectedStatus !== null) {
                try {
                    const response = await fetch(`/api/games/${gameId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userId: user.id,
                            newStatus: selectedStatus
                        })
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                } catch (error) {
                    console.error('Failed to update game status:', error);
                }
            }
        };
        updateStatus();
    }, [selectedStatus, user, gameId]);

    const deleteGame = async () => {
        try {
            await fetch(`/api/games/${gameId}?userId=${user.id}`, { method: 'DELETE' });
            setSelectedStatus(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleStatusChange = (event) => {
        if (user && user.id) {
            setSelectedStatus(event.target.value);
        }
    };

    return (
        <div className='game-status-container'>
            <div className="game-status">
                {statusName.map((status, index) => {
                    return (
                        <div className="option" key={index}>
                            <input
                                className="input"
                                type="radio"
                                name="btn"
                                value={status}
                                checked={status === selectedStatus}
                                onChange={handleStatusChange}
                                disabled={!isSignedIn} />
                            <div className="btn">
                                <span className="span">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
            {isSignedIn && selectedStatus && <ButtonDelete onClick={deleteGame}></ButtonDelete>}
        </div>
    )
}
