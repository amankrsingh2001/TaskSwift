import { useSelector } from "react-redux";

const UserDashboard = () => {
  const currentUser = useSelector((store) => store.userInfo.user);
  console.log('home route')
  return (
    <section>
      <h1 className="text-2xl md:text-4xl text-slate-900 text-center p-2">
        <span className="font-bold">{currentUser.email}</span>
      </h1>
        <p> Welcome to the GoalGuru the Task Manager.</p>
    </section>
  );
};

export default UserDashboard;
