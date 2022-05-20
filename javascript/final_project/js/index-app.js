const storageManager = new StorageManager();
window.onload = () => {
    storageManager.getAccountLoggedIn() == null && (location.href = `../index.html`);
};