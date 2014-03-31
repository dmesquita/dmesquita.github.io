Ext.define('PeerSquare.view.MapaView', {
	extend: 'Ext.form.Panel',
	xtype: 'map',
	useCurrentLocation: false,
	mapOptions:{ 
		zoom: 13,
        center: new google.maps.LatLng(-8.057445,-34.89139)                     
    }
	
	
});


