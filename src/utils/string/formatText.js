export function formatSlug(slug) {
    const words = slug.split('-');
    const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return formattedWords.join(' ');
}