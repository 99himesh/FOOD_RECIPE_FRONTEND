// import UserRecipes from "../../components/Profile/UserRecipes";
// import UserProfileCard from "./UserProfileCard";

import PersonalInformation from "./PersonalInformation";
import UserProfileCard from "./UserProfileCard";

const Profile = () => {
  const user = {
    id: 2,
    name: "Himesh",
    email: "himeshkashyap347@gmail.com",
    profilePic: null,
    age: 12,
    mobile: 903444335,
    dob: null,
    gender: null,
    country: null,
    role: "user",
    isFollow: false,
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="container mx-auto py-10 max-sm:px-5">

        <UserProfileCard user={user} />

        <div className="mt-8">
          <PersonalInformation user={user} />
        </div>

     

      </div>

    </div>
  );
};

export default Profile;