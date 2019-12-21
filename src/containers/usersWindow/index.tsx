import * as React from "react";
import "./styles.scss";
import UsersList, { User } from "../../components/usersList";
import { useStateValue } from "../../state";
import { UsersActionTypes } from "../../actions";

const refs: any = [];

interface Props {
  username: string;
}

function UsersWindow(props: Props) {
  const [{ connectedUsers }, dispatch] = useStateValue();
  const { username } = props;

  React.useEffect(() => {
    connectedUsers.map((user: User) => {
      if (user.ref === undefined) {
        refs.push({
          userId: user.id,
          ref: React.createRef()
        });

        dispatch({
          type: UsersActionTypes.SET_USER_REF,
          payload: {
            id: user.id,
            ref: React.createRef()
          }
        });
      }
    });
  }, [connectedUsers]);

  React.useEffect(() => {
    connectedUsers.map((user: User) => {
      if (
        user.ref &&
        user.ref.current !== undefined &&
        user.ref.current !== null &&
        user.leftOffset === undefined
      ) {
        dispatch({
          type: UsersActionTypes.SET_USER_LEFT_OFFSET,
          payload: {
            id: user.id,
            leftOffset: user.ref.current.offsetLeft
          }
        });
      }
    });
  });

  return (
    <div className={"usersWindowContainer"}>
      <div className={"usersList"}>
        <div className={"usersListContainer"}>
          {connectedUsers.map((user: User, index: number) => {
            let currentRef: any;
            const usernameDisplay = username === user.name ? "Me" : user.name;
            return (
              <div className={"userRow"} key={index} ref={user.ref}>
                <div className={"userAvatar"}></div>
                <div className={"username"}>{usernameDisplay}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UsersWindow;
