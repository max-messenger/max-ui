export const getInitData = () => {
    try {
        const locationHash = location.hash.toString().replace(/^#/, '');
        const params = new URLSearchParams(locationHash);

        return params.get('WebAppData');
    } catch (e) {
        console.warn(e);
    }
};
