import {
  JupyterFrontEndPlugin,
  JupyterFrontEnd,
  ILabShell,
  IRouter
} from '@jupyterlab/application';

import { LabIcon } from '@jupyterlab/ui-components';

import { ReactWidget } from '@jupyterlab/apputils';

import { Message } from '@lumino/messaging';

import { Widget } from '@lumino/widgets';

import { requestAPI } from './handler';

import * as github from '../style/img/github-logo.svg';

import * as React from 'react';

const userIcon: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-auth:logo',
  autoStart: true,
  requires: [ILabShell, IRouter],
  activate: (app: JupyterFrontEnd, shell: ILabShell, router: IRouter) => {
    const spacer = new Widget();
    spacer.id = 'jp-topbar-spacer';
    spacer.addClass('topbar-spacer');
    shell.add(spacer, 'top', { rank: 1000 });

    const logo = new LogInIcon(router);
    shell.add(logo, 'top', { rank: 10000 });
  }
};

export default userIcon;

class LogInIcon extends ReactWidget {
  constructor(router: IRouter) {
    super();
    this.id = 'jp-MainLogo';
    this.title.label = 'LogIn';
    this.title.caption = 'LogIn with GitHub';

    this._router = router;
    this._profile = null;
  }

  protected onBeforeShow(msg: Message): void {
    requestAPI<any>('user').then(data => {
      if (data.login) {
        this._profile = data;
        this.update();
      }
    });
  }

  private _logIn = () => {
    this._router.navigate('/login', { hard: true });
    console.debug('Route to login');
  };

  private _logOut = () => {
    this._router.navigate('/logout', { hard: true });
    console.debug('Route to logout');
  };

  render(): React.ReactElement {
    if (this._profile) {
      return (
        <div>
          <a onClick={this._logOut}>
            <img
              className="user-img"
              src={this._profile.avatar_url}
              alt="avatar"
            />
          </a>
        </div>
      );
    } else {
      const avatar = new LabIcon({
        name: 'github_icon',
        svgstr: github.default
      });

      return (
        <div>
          <a onClick={this._logIn}>
            <avatar.react
              className="user-img"
              tag="span"
              width="28px"
              height="28px"
            />
          </a>
        </div>
      );
    }
  }

  private _router: IRouter;
  private _profile: { [key: string]: any };
}
