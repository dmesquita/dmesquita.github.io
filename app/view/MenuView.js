Ext.define('PeerSquare.view.MenuView', {
	extend: 'Ext.form.Panel',
	xtype: 'menuview',
	requires: [
		'Ext.Menu'
	],
	
	config: {
		items: [
			{
				xtype: 'menu',
				items: [
						{	
							text: 'Mostrar eventos de hoje',
							ui: 'action',
							action: 'mostrar-eventos-de-hoje',
							parte_da_data: 'dia'                        
						},
						{	
							text: 'Mostrar eventos do m&ecirc;s',
							ui: 'action',
							action: 'mostrar-eventos-do-mes',
							parte_da_data: 'mes'                      
						},					
						{
							text: 'Sobre',
							ui: 'action',
							action: 'mostrar-sobre'                     
						}
					] 
				}
			]
		}
});
			
