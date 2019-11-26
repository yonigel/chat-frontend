import * as React from "react";
import "./styles.scss";

interface Props {}

const usersList = ["first", "second", "avigdor", "munimuni"];

function UsersWindow(props: Props) {
  const renderUsersList = () => {
    return (
      <ul>
        {usersList.map((user: string) => {
          return <li>{user}</li>;
        })}
      </ul>
    );
  };
  return (
    <div className={"usersWindowContainer"}>
      <div className={"usersTitle"}>Who is here?</div>
      <div className={"usersList"}>{renderUsersList()}</div>
    </div>
  );
}

export default UsersWindow;
