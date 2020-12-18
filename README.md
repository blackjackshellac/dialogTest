# dialogTest

Gnome Shell extension to test GObject Template dialogbox creation

```
let DialogTestDialog = GObject.registerClass({
  GTypeName: 'DialogTestDialog',
  Template: 'file:///home/steeve/github/dialogTest/dialogtest@blackjackshellac.ca/dialogtestdialog.ui',
  //InternalChildren: [ 'button_close' ] //[ 'check_play_sound', 'check_loop', 'sound_file', 'button_close' ]
}, class DialogTestDialog extends Gtk.Dialog {
  
  _init(params={}) {
    log("initializing DialogTestDialog with params="+params);
    super._init(params);
    
    //this._button_close.connect('clicked', () => this._close());
    //this._check_loop('clicked', () => this._loop());
  }
...
}
```

## References

