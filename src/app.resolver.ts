import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { AppEntity } from './app.entity';
import { UserType } from './user.type';
import { Users } from './users';

@Resolver()
export class AppResolver {
  @Query(() => [AppEntity])
  getAllUsers(): UserType[] {
    return Users;
  }
  @Mutation(() => [AppEntity])
  createUser(
    @Args({ name: 'userName', type: () => String }) userName: string,
  ): AppEntity[] {
    const userIdGenerator: number = Math.floor(Math.random() * 9999);
    Users.push({ id: userIdGenerator, name: userName });
    return [{ id: userIdGenerator, name: userName }];
  }

  @Mutation(() => [AppEntity])
  deleteUser(
    @Args({ name: 'userId', type: () => Number }) userId: number,
  ): AppEntity[] {
    const userObj = Users.find((user) => user.id === userId);
    const userIndex = Users.indexOf(userObj);
    if (userIndex === -1)
      return [{ id: -1, name: 'user not found to be deleted' }];
    Users.splice(userIndex, 1);

    return [
      {
        id: userObj.id,
        name: userObj.name,
      },
    ];
  }

  @Mutation(() => [AppEntity])
  updateUser(
    @Args({ name: 'userId', type: () => Number }) userId: number,
    @Args({ name: 'newName', type: () => String }) newName: string,
  ): AppEntity[] {
    const userObj = Users.find((user) => user.id === userId);

    const userIndex = Users.indexOf(userObj);
    const oldUserName: string = Users[userIndex].name;

    Users[userIndex].name = newName;

    return [
      {
        id: userObj.id,
        name: userObj.name,
      },
    ];
  }

  @Subscription(() => [AppEntity])
  alertUser(): AppEntity[] {
    return [{ id: 235, name: 'subs' }];
  }
}
