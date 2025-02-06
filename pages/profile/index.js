import React from 'react';
import ProfileLayout from './layout';

const Profile = () => {
  return (
    <div>
      <h1>Profil Ana Sayfası</h1>
      <p>Profilinizle ilgili genel bilgiler burada görünebilir.</p>
    </div>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page) {
  return <ProfileLayout>{page}</ProfileLayout>;
}