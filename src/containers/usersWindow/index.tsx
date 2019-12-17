import * as React from "react";
import "./styles.scss";
import UsersList, { User } from "../../components/usersList";
import { useStateValue } from "../../state";

function UsersWindow() {
  const [{ connectedUsers }, dispatch] = useStateValue();

  return (
    <div className={"usersWindowContainer"}>
      <div className={"usersList"}>
        {/* <UsersList usersList={connectedUsers} /> */}
        <div className={"usersListContainer"}>
          {connectedUsers.map((user: User, index: number) => {
            const currentRef: any = React.createRef();
            console.log(currentRef);
            return (
              <div className={"userRow"} key={index} ref={currentRef}>
                <div className={"userAvatar"}></div>
                <div className={"username"}>{user.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UsersWindow;
