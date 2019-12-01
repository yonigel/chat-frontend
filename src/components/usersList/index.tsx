import * as React from "react";
import "./styles.scss";
export interface User {
  name: string;
}

interface Props {
  usersList: User[];
}

function UsersList(props: Props) {
  const { usersList } = props;

  return (
    <div className={"usersListContainer"}>
      {usersList.map((user: User, index: number) => {
        return (
          <div className={"userRow"} key={index}>
            <div className={"userAvatar"}></div>
            <div className={"username"}>{user.name}</div>
          </div>
        );
      })}
    </div>
  );
}

export default UsersList;
