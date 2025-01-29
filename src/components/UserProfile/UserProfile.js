import { useEffect, useState } from 'react';
import ProfileService from '../../service/ProfileService';

const UserProfile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await ProfileService.fetchUser(); // Await API call
                setUserInfo(response); // Axios returns data directly inside `response.data`
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch user info");
            }
        };

        fetchUserInfo();
    }, []);

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6 bg-white rounded-2xl shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">User Profile</h2>
            {userInfo.picture && (
                <div className="flex justify-center">
                    <img
                        src={userInfo.picture}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-2 border-gray-200 shadow-md"
                    />
                </div>
            )}
            <div className="space-y-4">
                <p className="text-gray-600">
                    <strong className="font-medium text-gray-800">Email:</strong> {userInfo.email}
                </p>
                <p className="text-gray-600">
                    <strong className="font-medium text-gray-800">First Name:</strong> {userInfo.firstName}
                </p>
                <p className="text-gray-600">
                    <strong className="font-medium text-gray-800">Last Name:</strong> {userInfo.lastName}
                </p>
            </div>
        </div>
    );
};

export default UserProfile;
