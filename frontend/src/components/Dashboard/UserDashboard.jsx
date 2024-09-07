import { useSelector } from "react-redux";

const UserDashboard = () => {
  const currentUser = useSelector((store) => store.userInfo.user);
  
  return (
    <section>
      <h1 className="text-2xl md:text-4xl text-slate-900 text-center p-2">
        <span className="font-bold">{currentUser.email}</span>
        <span> Welcome to the GoalGuru the Task Manager.</span>
      </h1>
    </section>
  );
};

export default UserDashboard;
