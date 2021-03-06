import {
  JupyterFrontEndPlugin,
  JupyterFrontEnd,
  IRouter
} from '@jupyterlab/application';

import { ServerConnection } from '@jupyterlab/services';

import { URLExt } from '@jupyterlab/coreutils';

import { LabIcon } from '@jupyterlab/ui-components';

import { Menu } from '@lumino/widgets';

import { User } from './user';

import { IUser, IUserMenu } from './tokens';

import * as github from '../style/img/github-logo.svg';

/**
 * A namespace for command IDs.
 */
export namespace CommandIDs {
  export const github = 'jupyverse-auth:github';
}

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyverse-auth:github',
  autoStart: true,
  requires: [IRouter, IUser, IUserMenu],
  activate: (
    app: JupyterFrontEnd,
    router: IRouter,
    user: User,
    menu: Menu
  ): void => {
    const { commands } = app;

    const icon = new LabIcon({
      name: 'githubIcon',
      svgstr: github.default
    });

    commands.addCommand(CommandIDs.github, {
      label: 'Sign In with GitHub',
      icon: icon,
      isEnabled: () => user.isAnonymous,
      //isVisible: () => user.isAnonymous,
      execute: () => {
        const settings = ServerConnection.makeSettings();
        const requestUrl = URLExt.join(
          settings.baseUrl,
          '/auth/github/authorize?authentication_backend=cookie'
        );
        const init: RequestInit = {
          method: 'GET',
          headers: { accept: 'application/json' }
        };
        ServerConnection.makeRequest(requestUrl, init, settings).then(
          async resp => {
            const data = await resp.json();
            window.location.href = data.authorization_url;
          }
        );
      }
    });
    menu.insertItem(0, { command: CommandIDs.github });

    user.registerLogInMethod(CommandIDs.github);
  }
};

export default plugin;
