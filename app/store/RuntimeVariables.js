Ext.define('PeerSquare.store.RuntimeVariables', {
	extend: 'Ext.data.Store',
	requires: ['PeerSquare.model.RuntimeVariables'],
    config: {
    	model: 'PeerSquare.model.RuntimeVariables',
    	autoLoad: true
	}
});
