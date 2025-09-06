export const DB_NAME = "OrganDonationSystem";
export const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only secure in production
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax' // Less restrictive for development
};
