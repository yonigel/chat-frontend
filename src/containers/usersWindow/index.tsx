import * as React from "react";
import "./styles.scss";
import UsersList, { User } from "../../components/usersList";
import { useStateValue } from "../../state";

function UsersWindow() {
  const [{ connectedUsers }, dispatch] = useStateValue();
  return (
    <div className={"usersWindowContainer"}>
      <div className={"usersTitle"}>Who is here?</div>
      <div className={"usersList"}>
        <UsersList usersList={connectedUsers} />
      </div>
    </div>
  );
}

export default UsersWindow;
