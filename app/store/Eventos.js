Ext.define('PeerSquare.store.Eventos', {
	extend: 'Ext.data.Store',
	requires: ['PeerSquare.model.Eventos'],
    config: {
    	model: 'PeerSquare.model.Eventos',
    	autoLoad: true,
    	filters: [{property: 'id_praca'}]
	}
});
