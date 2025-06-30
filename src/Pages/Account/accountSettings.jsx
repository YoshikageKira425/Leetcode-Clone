import React, { useEffect, useState, useRef } from 'react'
import NavBar from '../Component/NavBar';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useNavigate } from 'react-router-dom';

function AccountSettings() {
    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', {});
    const [users, setUsers] = useLocalStorage('users', [{
        "username": "Admin",
        "email": "admin425@gmail.com",
        "password": "123456",
        "profilePhoto": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQApQMBIgACEQEDEQH/xAAbAAEAAwADAQAAAAAAAAAAAAAABQYHAgMEAf/EADkQAAICAQICBwUFBwUAAAAAAAABAgMEBREGQRIhIjFRYXGBkbLB0RNCU6GxFCQyM2KD4RVDUnKC/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwDUgAaZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHGco1xlOySjGPW5SeyRB5nFmn47caftMiS51pJe9gTwKrDjSnpdvBtSfNWJ/ImdO1vA1GShRd0bfw5raX+QJEDuAAAAAAAAAAAAAAAAAAAADrvurxqZ3XT6FcFvKXgjsKfxvnylOvT63tFLp2eb+782BEa5rV+q3NbuGNF9irx834six6AqB9Taaa6mutPwPgAuXC3EE75Rwc6bdvdVa/veT8y0mSxbjJSi9mnunv3GmaJnPUdNqyJfzNtrP8Asu/6kV7gAAAAAAAAAAAAAAAAAA9DMtctd+sZk3+NKK9E9l+hpq7zLtVj0NUzIvlfP4mB5QAaQAAAuHAVrdWZRyjKE17d18inlt4Bj2s6flBfEZVbgAAAAAAAAAAAAAAAAAA9TPeLcZ4+t2y27NyVi/R/mjQiG4n0l6nhKVK/eaXvD+pc4+0DPQfXFxbUk011NNdafgfCoAAKF84KxvsdKlbJdd1jkvRdS+ZUNJ027VMuNFSaj32T26oRNLpqhRVCmlKNcIqMV4JEHMAAAAAAAAAAAAAAAAAAAABE6vw/h6m3bLpU5D/3YLv9VzK5kcH58JP7G2m2Pjv0X7n9S7WWQqi5WzjBLnJ7I8Nuu6XU9p5tW/hF9L9AqoR4V1RvboVL+4iQwuDbG1LNyYxjv1wpW7ftf0JuPEekN7ftkV/5l9D1UapgZD2pzKZ78uns/cEc8LCx8ChU4larguvzb8W+Z6B+gCgACAAAAAAAAAAAAAAAR2t6vTpOP05rp3S/l179/n6AejOzcbBoduXaq4ct+9+i5lS1Li3JubhgR+wh3KcknP6Igs7Nyc+93ZVnTm+5dyj5Jcjzgdl992RNzvunbJ85ybOsAuIDb0AGD24Oq5+C/wB3yZqPOD7UX7GWnSuK6MiUas+Kos5TX8D+hSQCNaTUkpJ7p9zXM+lA0DiC7TpxpyG7MR8ucPNfQvlVkLq421SU65reMk+poiuYAAAAAAAAAAAADz6hmVYGHbk3Ps1rfb/k+SM01DNt1DLnk3vtSfUl3Jckid411B3ZkcKD7FHaltzk1v8AkitAAAVKAAoAAAAABYuEtY/ZMhYN8kqLZdhv7kn8mV0dfJkqxrYIvhvUP9R0uuc3vbX2LPFtc/dsShAAAAAAAAAOF1kaap2z/hri5P0RzIviW106HlyXfKKj73sBnd9s77rLrHvOyTm/a9zgAWJQAFAAAAAAAAAAEqxYuCcp1ajbjt9m+HUv6o9a/LcvJmWhWunWMOa/FS9/V8zTfEgAAAAAAAAEJxi9tCt25zh8QAGfgAsQABQAAAAAAAAAAHfgPbPxmvxofEjVACLAAEAAAf/Z",
        "problemsSolved": [],
        "isAdmin": true
    }]);
    const navigate = useNavigate();

    const [newUsername, setNewUsername] = useState('');
    const [editingUsername, setEditingUsername] = useState(false);

    const [showPasswordOverlay, setShowPasswordOverlay] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!currentUser || Object.keys(currentUser).length === 0) {
            navigate('/sign-up');
        }
    }, [currentUser, navigate]);

    function onEditPhotoClick() {
        fileInputRef.current.click();
    }

    function onPhotoChange(e) 
    {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) 
        {
            alert('Please select an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const updatedUser = { ...currentUser, profilePhoto: reader.result };
            updateUser(updatedUser);
        };
        reader.readAsDataURL(file);
    }

    function onEditUsernameClick()
    {
        setNewUsername(currentUser.username || '');
        setEditingUsername(true);
    }

    function onUsernameKeyDown(e) 
    {
        if (e.key !== 'Enter') 
            return;

        if (!newUsername.trim()) 
        {
            alert('Username cannot be empty');
            return;
        }

        if (newUsername === currentUser.username) 
        {
            setEditingUsername(false);
            return;
        }

        const usernameExists = users.some(u => u.username === newUsername && u.username !== currentUser.username);
        if (usernameExists) 
        {
            alert('Username already taken');
            return;
        }

        const updatedUser = { ...currentUser, username: newUsername.trim() };
        updateUser(updatedUser);
        setEditingUsername(false);
    }

    function updateUser(updatedUser) 
    {
        setCurrentUser(updatedUser);

        const updatedUsers = users.map(user => user.username === currentUser.username ? updatedUser : user);
        setUsers(updatedUsers);
    }

    function openPasswordOverlay() 
    {
        setOldPassword('');
        setNewPassword('');
        setPasswordError('');
        setShowPasswordOverlay(true);
    }
    function closePasswordOverlay() 
    {
        setShowPasswordOverlay(false);
    }

    function changePassword() 
    {
        if (!oldPassword || !newPassword) 
        {
            setPasswordError('Both fields are required');
            return;
        }
        if (oldPassword !== currentUser.password) 
        {
            setPasswordError('Old password is incorrect');
            return;
        }
        if (newPassword.length < 6) 
        {
            setPasswordError('New password must be at least 6 characters');
            return;
        }

        const updatedUser = { ...currentUser, password: newPassword };
        updateUser(updatedUser);
        setPasswordError('');
        alert('Password changed successfully');
        closePasswordOverlay();
    }

    function deleteAccount() {
        if (!window.confirm('Are you sure you want to delete your account? This cannot be undone.')) return;

        const filteredUsers = users.filter(u => u.username !== currentUser.username);
        setUsers(filteredUsers);
        setCurrentUser({});

        navigate('/sign-up');
    }

    return (
        <>
            <NavBar />
            <div className="mt-8 space-y-4">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-4">
                        <img src={currentUser.profilePhoto}className="rounded-full w-20 h-20 object-cover" alt="Profile" id="profileImage" width="150px"/>
                        <button id="EditProfile" onClick={onEditPhotoClick} className="px-6 py-2 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500">Edit</button>
                        <input ref={fileInputRef} type="file" id="profileInput" className="hidden" accept="image/*" onChange={onPhotoChange}/>
                    </div>

                    <div className="mt-6">
                        <div className="flex items-center justify-center gap-2">
                            {editingUsername ? (
                                <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} onKeyDown={onUsernameKeyDown} className="p-2 border border-gray-300 rounded w-[30%] text-center" placeholder="Enter your username [Enter]" autoFocus />
                            ) : (
                                <>
                                    <span className="text-4xl pb-2">{currentUser.username}</span>
                                    <button onClick={onEditUsernameClick} className="px-6 py-2 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500">Edit</button>
                                </>
                            )}
                        </div>
                    </div>

                    <button onClick={openPasswordOverlay} className="px-6 py-2 mt-4 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500">Change Password</button>
                    <br />
                    <button onClick={deleteAccount} className="px-6 py-2 mt-4 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500">Delete my account</button>
                </div>
            </div>

            {showPasswordOverlay && (
                <div id="overlay" className="fixed top-0 left-0 w-full h-screen bg-[#101828ae] bg-opacity-50 z-10 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-h-100 overflow-auto">
                        <input id="oldPassword" type="password" placeholder="Enter your old Password" className="mt-4 p-2 border border-gray-300 rounded w-full" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
                        <input id="newPassword" type="password" placeholder="Enter your new Password" className="mt-4 p-2 border border-gray-300 rounded w-full" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                        {passwordError && <p className="text-red-600 mt-2">{passwordError}</p>}

                        <div className="flex justify-end gap-4 mt-4">
                            <button onClick={closePasswordOverlay} className="px-4 py-2 bg-red-500 text-white rounded-full">Close</button>
                            <button onClick={changePassword} className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700">Change</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AccountSettings;