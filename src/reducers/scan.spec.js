import scan from './scan'

describe('reducers', () => {
    describe('scan', () => {
        const initialState = {
            history: []
        }

        it('should provide the initial state', () => {
            expect(scan(undefined, {})).toEqual(initialState)
        })

        it('should handle ADD_SCAN action #1', () => {
            expect(scan(initialState, { type: 'ADD_SCAN', payload: { scan: { timestamp: 1, download: 80, upload: 12, ping: 100 } } })).toEqual({
                history: [
                    { timestamp: 1, download: 80, upload: 12, ping: 100 }
                ]
            })
        })
        describe('when scan is already in history', () => {
            it('should handle ADD_SCAN action #2', () => {
                const initialState = {
                    history: [
                        { timestamp: 1, download: 80, upload: 12, ping: 100 }
                    ]
                };
                expect(scan(initialState, { type: 'ADD_SCAN', payload: { scan: { timestamp: 2, download: 60, upload: 70, ping: 20 } } })).toEqual({
                    history: [
                        { timestamp: 1, download: 80, upload: 12, ping: 100 },
                        { timestamp: 2, download: 60, upload: 70, ping: 20 }
                    ]
                })
            })

            it('should handle REMOVE_SCAN action #1', () => {
                const initialState = {
                    history: [
                        { timestamp: 1, download: 80, upload: 12, ping: 100 },
                        { timestamp: 2, download: 60, upload: 70, ping: 20 }
                    ]
                };
                expect(scan(initialState, { type: 'REMOVE_SCAN', payload: { timestamp: 1 } })).toEqual({
                    history: [
                        { timestamp: 2, download: 60, upload: 70, ping: 20 }
                    ]
                })
            })
        })
    })
})