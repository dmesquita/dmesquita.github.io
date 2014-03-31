Ext.define('PeerSquare.model.RuntimeVariables', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.identifier.Uuid'],
    config: {
        idProperty: 'id',
        identifier: 'uuid',
        fields: [
			{ name: 'id', type: 'auto' },
            { name: 'id_praca_atual', type: 'auto' },
            { name: 'nome_praca_atual', type: 'auto' },
            { name: 'praca_markers', type: 'auto' },
            { name: 'qtdPracas', type: 'auto' },
            { name: 'geo', type: 'boolean' }
        ]
    }
});
