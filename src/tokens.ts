import { Menu } from '@lumino/widgets';

import { Token } from '@lumino/coreutils';

export const IUser = new Token<IUser>('jupyverse-auth:user');

export const IUserMenu = new Token<Menu>('jupyverse-auth:userMenu');

export const IUserPanel = new Token<Menu>('jupyverse-auth:userPanel');

export interface IUser {
  readonly id: string;
  readonly name: string;
  readonly username: string;
  readonly initials: string;
  readonly color: string;
  readonly email?: string;
  readonly avatar?: string;

  readonly isAnonymous: boolean;
  //readonly isReady: boolean;
  //readonly ready: ISignal<IUser, boolean>;
  //readonly changed: ISignal<IUser, void>;

  //readonly logInMethods: string[];
  //registerLogInMethod(command: string): void;
}
