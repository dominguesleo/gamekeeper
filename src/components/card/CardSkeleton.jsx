import './cardskeleton.css';

export const CardSkeleton = () => {
    return (
        <div class="container-card-skeleton">
            <div class="card">
                <div class="card-img skeleton"></div>
                <div class="card-body skeleton"></div>
            </div>
        </div>
    )
}
