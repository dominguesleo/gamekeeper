import './gamestatuslibrary.css'

export function GameStatusLibrary({ selectedStatus, setSelectedStatus }) {
    const statusName = ["All", "owned", "toplay", "playing", "beaten", "dropped"]

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    return (
        <div className="game-status-library">
            {statusName.map((status, index) => (
                <div className="option" key={index}>
                    <input
                        className="input"
                        type="radio"
                        name="btn"
                        value={status}
                        checked={status === selectedStatus}
                        onChange={handleStatusChange}/>
                    <div className="btn">
                        <span className="span">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
