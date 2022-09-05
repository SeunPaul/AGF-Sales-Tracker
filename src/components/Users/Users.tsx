import { useEffect, useState } from "react";
import deleteIcon from "../../assets/icons/delete.svg";
import notify from "../../helpers/notify";
import "./Users.css";

// api service
import APIService from "../../utils/apiServices";
type UserType = {
  id: string;
  username: string;
  role: string;
}[];
function Users() {
  const [usersLoading, setUsersLoading] = useState(true);
  const [users, setUsers] = useState<UserType>([]);

  const deleteUser = (id: string) => {
    if (
      window.confirm(
        "You are about to delete this user. This action can not be reversed"
      )
    ) {
      APIService.deleteUser({ userId: id })
        .then((res) => {
          if (res.success) {
            notify("success", res.message);
            window.location.reload();
          } else {
            notify("error", res.message);
          }
        })
        .catch(() => {
          notify("error", "connection error");
        });
    }
  };

  useEffect(() => {
    APIService.getUsers()
      .then((res) => {
        if (res.success) {
          const { data } = res;

          setUsers(data.users);
          setUsersLoading(false);
        } else {
          notify("error", res.message);
          setUsersLoading(false);
        }
      })
      .catch(() => {
        notify("error", "connection error");
        setUsersLoading(false);
      });
  }, []);

  return usersLoading ? (
    <p>users loading...</p>
  ) : (
    <div className="Users">
      <div className="user-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>
                <span />
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  <img
                    src={deleteIcon}
                    alt=""
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
