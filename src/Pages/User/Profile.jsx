import dayjs from "dayjs";
import Title from "../../Components/atoms/Title";
import useAuthStore from "../../store/authStore";

const Profile = () => {
  const [user] = useAuthStore(state => [
    state.user,
  ]);

  return (
    <section>
      <Title
        text="Profile"
      />

      <ul>
        <li>
          name: <span className="font-bold">{user.name}</span>
        </li>
        <li>
          email: <span className="font-bold">{user.email}</span>
          {!user.emailVerification &&
            <span className="px-2 py-1 ml-2 text-xs font-bold text-white bg-red-500 rounded-3xl">not verified</span>
          }
        </li>
        <li>
          registration:
          <span className="ml-2 font-bold">
            {dayjs(user.registration).format("DD/MM/YYYY H:m:s")}
          </span>
        </li>
        <li>
          updated:
          <span className="ml-2 font-bold">
            {dayjs(user.$updatedAt).format("DD/MM/YYYY H:m:s")}
          </span>
        </li>
      </ul>
    </section>

  );
}

export default Profile;
