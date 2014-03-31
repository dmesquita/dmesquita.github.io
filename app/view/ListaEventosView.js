Ext.define('PeerSquare.view.ListaEventosView', {
	extend: 'Ext.dataview.List',
	xtype: 'listaeventosview',
	requires: [
		'Ext.dataview.List'
	],
	config: {
		fullscreen: true,
		id: 'lista_eventos',		
        itemTpl: "<div class='evento'>{nome_evento}</div> <div class='data'>{data}</div> <div class='hora'>{hora}</div>",
        items: [{
                   xtype: 'titlebar',
                   cls: 'title',
                   docked: 'top',                       
                   id: 'titulo_praca'
                }                        
               ] 
	}
	
	
});
