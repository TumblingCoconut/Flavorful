const ID_KEY = 'forkful_author_id'

export function getAuthorId() {
    try {
        let id = localStorage.getItem(ID_KEY);
        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem(id);
        }
        } catch {
        // storage blocked: fall back to a per-session id
        return (getAuthorId.fallback ??= crypto.randomUUID());
    }
}