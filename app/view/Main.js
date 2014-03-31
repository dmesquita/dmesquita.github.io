Ext.define('PeerSquare.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
		'PeerSquare.view.AddEventoView',
		'PeerSquare.view.TimePickerField',
		'Ext.Map'
    ],
    config: {		
		direction: 'vertical',
		layout: 'card',
		
        items: [
			{	
				xtype: 'titlebar',
				cls: 'title',
				docked: 'top',
				title: 'PeerSquare Recife  &nbsp;',
				items: [
					{
						cls: 'back',
                        hidden: true,
                        ui: 'back',
                        action: 'back',
                        align: 'left',
                        text: 'voltar'
                   	},
                   	{
						iconCls: 'more',
						action: 'opcoes',
						ui: 'plain',
						align: 'right'						
					},
                   	{	
						cls: 'add',
						iconCls: 'add',
                        action: 'add', 
                        iconMask: true,                               
                        align: 'right',                                  
                        hidden: true, 
                        text: 'evento'					
					}
				]
			},
			{
				xtype: 'map',
				useCurrentLocation: false,
				mapOptions:{
					zoom:13,
					center: new google.maps.LatLng(-8.057445,-34.89139)
				}
			},{
				xtype: 'menuview'
			},
			{
				xtype: 'listaeventosview'
			},
			{
				xtype: 'addeventoview'
			},
           
            {
				xtype: 'toolbar',                   
                cls: 'footer',
                ui: 'light',
                docked: 'bottom',
                html: '<span>Powered by &#169; PeerSquare Recife</span>'
			}
        ]
    }
});
