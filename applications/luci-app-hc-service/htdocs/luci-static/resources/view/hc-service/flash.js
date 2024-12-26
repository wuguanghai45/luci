'use strict';
'require view';
'require dom';
'require form';
'require rpc';
'require fs';
'require ui';

var isReadonlyView = !L.hasViewPermission();

var mapdata = { actions: {}, config: {} };

return view.extend({
	handleStm32Flash: function(ev) {
		return ui.uploadFile('/tmp/stm_flash.bin', ev.target.firstChild)
		.then(L.bind(function(btn, reply) {
			btn.firstChild.data = _('flash stm...');
			return fs.exec('/usr/bin/hc_flash', ["stm"]).then(function(res) { return res; });
		}, this, ev.target))
		.then(L.bind(function(btn, res) {
			console.log(res, 111, res.stdout);

			var lines = res.stdout.split('\n').map(function(line) { return E('div', {}, line); });

			ui.addNotification(null, E('div', { 'class': 'alert-message success' }, [
				E('strong', _('Flash completed: ')),
			].concat(lines)));
		}, this, ev.target))
		.catch(function(e) { 
			ui.addNotification(null, E('div', { 'class': 'alert-message error' }, [
				E('strong', _('Error: ')),
				E('p', {}, e.message)
			]));
		})
		.finally(L.bind(function(btn) {
			btn.firstChild.data = _('Flash stm32...');
		}, this, ev.target));
	},
	handleNxpFlash: function(ev) {
		return ui.uploadFile('/tmp/nxp_flash.bin', ev.target.firstChild)
			.then(L.bind(function(btn, reply) {
				btn.firstChild.data = _('flash nxp...');
				return fs.exec('/usr/bin/hc_flash', ["nxp"]).then(function(res) { return res; });
			}, this, ev.target))
			.then(L.bind(function(btn, res) {
				console.log(res, 111, res.stdout);

				var lines = res.stdout.split('\n').map(function(line) { return E('div', {}, line); });

				ui.addNotification(null, E('div', { 'class': 'alert-message success' }, [
					E('strong', _('Flash completed: ')),
				].concat(lines)));
			}, this, ev.target))
			.catch(function(e) { 
				ui.addNotification(null, E('div', { 'class': 'alert-message error' }, [
					E('strong', _('Error: ')),
					E('p', {}, e.message)
				]));
			})
			.finally(L.bind(function(btn) {
				btn.firstChild.data = _('Flash nxp...');
			}, this, ev.target));
	},

	render: function() {
		var m, s, o, ss;
		m = new form.JSONMap(mapdata, _('Flash operations'));
		m.tabbed = true;
		m.readonly = isReadonlyView;

		s = m.section(form.NamedSection, 'actions', _('Actions'));

		o = s.option(form.SectionValue, 'actions', form.NamedSection, 'actions', 'actions',
				_('Flash new firmware for STM32'), _('Upload a stm32-flash.bin image here to flash STM32 firmware.'));
		ss = o.subsection;

		o = ss.option(form.Button, 'stm', _('Flash stm'));
		o.inputstyle = 'action important';
		o.inputtitle = _('Flash stm...');
		o.onclick = L.bind(this.handleStm32Flash, this);


		o = s.option(form.SectionValue, 'actions', form.NamedSection, 'actions', 'actions', _('Flash new firmware for RT1061'),
		 _('Upload a nxp-flash.bin image here to flash RT1061 firmware.'));

		ss = o.subsection;

		o = ss.option(form.Button, 'nxp', _('Flash nxp'));
		o.inputstyle = 'action important';
		o.inputtitle = _('Flash nxp...');
		o.onclick = L.bind(this.handleNxpFlash, this);

		return m.render();
	},

	handleSaveApply: null,
	handleSave: null,
	handleReset: null
});
