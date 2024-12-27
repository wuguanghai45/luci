'use strict';
'require view';
'require uci';

return view.extend({
	render: function() {
		return E('iframe', {
			src: 'http' + '://' + window.location.hostname + ':7682',
			style: 'width: 100%; min-height: 500px; border: none; border-radius: 3px; resize: vertical;'
		});
	},
	handleSaveApply: null,
	handleSave: null,
	handleReset: null
});
