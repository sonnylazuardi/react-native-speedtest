export const addScan = (scan) => ({
    type: 'ADD_SCAN',
    payload: {
        scan
    }
});

export const removeScan = (timestamp) => ({
    type: 'REMOVE_SCAN',
    payload: {
        timestamp
    }
});