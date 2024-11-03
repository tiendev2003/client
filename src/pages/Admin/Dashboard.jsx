import { toast } from "react-toastify";

const DashboardAdmin = () => {
  const notify = () => toast("Wow so easy!");

  return (
    <div>
      <button onClick={notify}>Notify!</button>
    </div>
  );
};

export default DashboardAdmin;
