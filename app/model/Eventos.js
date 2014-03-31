Ext.define('PeerSquare.model.Eventos', {
	extend: 'Ext.data.Model',
	
	config: {
		idProperty: 'id',
		identifier: 'uuid',
		requires: ['Ext.data.identifier.Uuid'],
		
		fields: [
			{ name: 'id', type: 'int' },
			{ name: 'nome_evento', type: 'string' },
			{ name: 'data', type: 'string' },
			{ name: 'hora', type: 'string' },
			{ name: 'id_praca', type: 'int' },
			{ name: 'tags', type: 'string' }
		],
		
		validations: [
			 { type: 'presence', field: 'id_praca', message: "Necessita de uma pra&#231;a." },
			 { type: 'presence', field: 'nome_evento', message: "Por favor forne&#231;a o nome do evento."},
			 //{ type: 'presence', field: 'data', message: "Por favor forne&#231;a a data do evento."},
			 { type: 'presence', field: 'hora', message: "Por favor forne&#231;a a hora do evento."}
		],
		
		proxy: {
		type: 'localstorage',
		id: 'peersettings'
		}
	}	
});
