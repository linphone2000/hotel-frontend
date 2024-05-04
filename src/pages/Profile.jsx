import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <div className="text-center my-8">
        <h1 className="text-5xl">{currentUser.fullName}</h1>
      </div>
    </>
  );
};

export default Profile;
