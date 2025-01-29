import React from 'react'
//import  Profile  from '../components/Profile/Profile'

export default function ProfilePage() {
  const handleSendData = (data: string) => {
    console.log("Data received:", data);
  };

  return ""//<Profile onSendData={handleSendData} />;
}