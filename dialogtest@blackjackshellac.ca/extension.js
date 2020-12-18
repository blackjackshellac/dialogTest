/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

const GETTEXT_DOMAIN = 'dialogtest-blackjackshellac-ca';

const { GObject, St, Gtk } = imports.gi;

const Gettext = imports.gettext.domain(GETTEXT_DOMAIN);
const _ = Gettext.gettext;

const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const ModalDialog = imports.ui.modalDialog.ModalDialog;


// GNOME Shell imports
const Main = imports.ui.main;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
 
// You can import your modules using the extension object we imported as `Me`.
// const ExampleLib = Me.imports.exampleLib;

const Indicator = GObject.registerClass(
class Indicator extends PanelMenu.Button {
    _init() {
        super._init(0.0, _('Dialog Test Blackjackshellac'));

        let box = new St.BoxLayout({ style_class: 'panel-status-menu-box' });
        box.add_child(new St.Icon({
            icon_name: 'dialog-test-dialog-symbolic',
            style_class: 'system-status-icon',
        }));
        box.add_child(PopupMenu.arrowIcon(St.Side.BOTTOM));
        this.add_child(box);

        let preferences = new PopupMenu.PopupMenuItem(_('Preferences…'));
        preferences.connect('activate', () => {
          log("Show preferences ...");
          new DialogTest({});
        });
        this.menu.addMenuItem(preferences);
    }
});

const DialogTest = GObject.registerClass(
class DialogTest extends ModalDialog {
  _init(params) {
    super._init(params);
    log("DialogTest init")
    
    this._fadeOpen(true);
  }
});

// x-special/nautilus-clipboard
// copy
// file:///home/foo/github/dialogTest/dialogtest@blackjackshellac.ca/dialogtest.ui

// You can't use GTK in the Shell, #extensions:gnome.org is the main Extensions channel.
/*
let DialogTestDialog = GObject.registerClass({
  GTypeName: 'DialogTestDialog',
  Template: 'dialogtestdialog.ui',
  InternalChildren: [ 'button_close', 'entry', 'play', 'pause', 'check', 'radio1', 'radio2', 'radio3' ]
}, class DialogTestDialog extends Gtk.Dialog {
  
  _init(params={}) {
    log("initializing DialogTestDialog with params="+params);
    super._init(params);
    
    //this._button_close.connect('clicked', () => this._close());
    //this._check_loop('clicked', () => this._loop());
  }
  
  wtf() {
    log("What the fuck");
  }
  
  show() {
    log("In show()");
    //this.show_all();
  }
  
  on_button_close_clicked() {
    log("on_button_close_clicked");
  }
  
  on_check_toggled() {
    log("on_check_toggled");
  }
  on_entry_changed() {
    log("on_entry_changed");
  }

  on_radio1_toggled() {
    log("on radio1 toggled");
  }

  on_radio2_toggled() {
    log("on radio2 toggled");
  }

  on_radio3_toggled() {
    log("on radio3 toggled");
  }
  
});
*/

class Extension {
    constructor(uuid) {
        this._uuid = uuid;
        log(Me.description);
        ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
    }

    enable() {
        this._indicator = new Indicator();
        Main.panel.addToStatusArea(this._uuid, this._indicator);
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
}

function init(meta) {
  return new Extension(meta.uuid);
}
