import * as React from "react";
import "./styles.scss";
import UsersList, { User } from "../../components/usersList";

interface Props {
  usersList: User[];
}

function UsersWindow(props: Props) {
  const { usersList } = props;
  return (
    <div className={"usersWindowContainer"}>
      <div className={"usersTitle"}>Who is here?</div>
      <div className={"usersList"}>
        <UsersList usersList={usersList} />
      </div>
    </div>
  );
}

export default UsersWindow;
