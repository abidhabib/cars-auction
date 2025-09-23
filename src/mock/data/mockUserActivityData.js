// src/data/mockUserActivityData.js

/**
 * Represents a user's favorite car.
 * @typedef {Object} MockFavoriteItem
 * @property {string} carId - The ID of the car that is favorited (corresponds to car.id in mockCarsData).
 * @property {string} addedAt - ISO 8601 date string when the car was favorited.
 * @property {string} [notes] - Optional user notes about why the car was favorited.
 */

/**
 * Represents a user's bid on a car.
 * @typedef {Object} MockBidItem
 * @property {string} carId - The ID of the car that was bid on (corresponds to car.id in mockCarsData).
 * @property {number} bidAmount - The amount of the user's bid in EUR.
 * @property {string} bidAt - ISO 8601 date string when the bid was placed.
 * @property {boolean} isActive - Indicates if this specific bid record is considered active/valid in the UI context.
 * @property {boolean} [isWinning] - Optional flag indicating if the user's bid is currently the highest.
 * @property {number} [currentHighestBid] - Optional, the current known highest bid on the car for comparison.
 */


/**
 * Mock data representing a specific user's activity: favorites and bids.
 * This simulates data that would typically come from a backend API or local storage,
 * filtered for the currently authenticated user.
 *
 * In a real app, you would pass the actual `userId` to fetch their specific data.
 *
 * @param {string} [_userId='mock_user_123abc'] - The ID of the user (included for conceptual clarity).
 * @returns {{ favorites: MockFavoriteItem[], bids: MockBidItem[] }} An object containing arrays of mock favorites and bids.
 */
export const loadMockUserActivityData = (_userId = 'mock_user_123abc') => {
    // In a real application, the `_userId` would be used to fetch data from a database or API.
    // For this mock, we return predefined data for demonstration purposes.

    /**
     * Mock list of cars favorited by the user.
     * @type {MockFavoriteItem[]}
     */
    const mockFavorites = [
        {
            carId: 'car_001', // BMW X5
            addedAt: '2024-07-10T14:30:00Z',
            notes: 'Love the M Sport package and color.'
        },
        {
            carId: 'car_007', // Porsche 911
            addedAt: '2024-07-15T09:15:00Z',
            notes: 'Dream car. Need to save up!'
        },
        {
            carId: 'car_004', // BMW 3 Series
            addedAt: '2024-07-12T11:00:00Z'
            // No notes for this one
        }
    ];

    /**
     * Mock list of bids placed by the user.
     * @type {MockBidItem[]}
     */
    const mockBids = [
        {
            carId: 'car_001', // BMW X5
            bidAmount: 54850,
            bidAt: '2024-07-11T10:00:00Z',
            isActive: true,
            isWinning: false, // Someone else bid higher (e.g., 54900)
            currentHighestBid: 54900 // Simulate knowing the real highest bid
        },
        {
            carId: 'car_003', // Audi Q7
            bidAmount: 47500,
            bidAt: '2024-07-13T15:45:00Z',
            isActive: true,
            isWinning: true, // This is assumed to be the highest bid
            currentHighestBid: 47500
        },
        {
            carId: 'car_006', // Tesla Model 3 (Older Bid)
            bidAmount: 44900,
            bidAt: '2024-07-14T13:20:00Z',
            isActive: false, // Superseded by a newer bid from the same user
            isWinning: false,
            currentHighestBid: 45000 // User's newer bid
        },
        {
            carId: 'car_006', // Tesla Model 3 (Updated Bid)
            bidAmount: 45000,
            bidAt: '2024-07-14T16:30:00Z',
            isActive: true,
            isWinning: true, // This is now the highest bid for this car
            currentHighestBid: 45000
        }
        // Note: car_002 (Mercedes GLE) is not included in bids, simulating no bids placed yet.
    ];

    // Return the mock data
    return {
        favorites: mockFavorites,
        bids: mockBids
    };
};