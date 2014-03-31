Ext.define('PeerSquare.controller.Main', {
    extend: 'Ext.app.Controller',
    
    requires: [
		'Ext.Ajax',
		'Ext.MessageBox'
    ],
    
    id_praca_atual: '',
    nome_praca_atual: '',
    
    config: {
		stores: 'PeerSquare.store.RuntimeVariables',
        refs: {
			mainView: 'main',	
			addEventoView: 'addeventoview',		
			
			btnBack: 'main button[action=back]',			
			btnOpcoes: 'main button[action=opcoes]',
			btnEventosHoje: 'menuview button[action=mostrar-eventos-de-hoje]',
			btnEventosMes: 'menuview button[action=mostrar-eventos-do-mes]',
			btnAdd: 'main button[action=add]',
			btnEnviar: 'addeventoview button[action=enviar]',
			btnSobre: 'menuview button[action=mostrar-sobre]',
			
			myMap: 'map'
            
        },
        control: {
			'btnOpcoes': {
				tap: 'onOpcoesBtnTap'
			},
			'btnBack': {
				tap: 'onBackBtnTap'
			},
			'map': {
				maprender: 'renderTheMap'
			},
			'btnEventosHoje': {
				tap: 'onEventosMesOuDiaBtnTap'
			},
			'btnEventosMes': {
				tap: 'onEventosMesOuDiaBtnTap'
			},
			'btnAdd': {
				tap: 'onAddBtnTap'
			},
			'btnEnviar': {
				tap: 'onEnviarBtnTap'
			},
			'btnSobre': {
				tap: 'onSobreBtnTap'
			}      
        }      
    },
    
    onOpcoesBtnTap: function() {
		this.getMainView().animateActiveItem(1, {type: 'slide', direction: 'left'});	
		this.getBtnOpcoes().hide();
		this.getBtnBack().show();		
	},
	
	onBackBtnTap: function() {
		this.getMainView().animateActiveItem(0, {type: 'slide', direction: 'right'});	
		this.getBtnOpcoes().show();
		this.getBtnBack().hide();	
		this.getBtnAdd().hide();	
	},
	
	onSobreBtnTap: function() {
		Ext.Msg.alert('Sobre', "PeerSquare Recife v1.5", Ext.emptyFn);
	},
	
	onAddBtnTap: function(){
		Ext.ComponentQuery.query('textfield[name="nome_praca"]').pop().setValue(nome_praca_atual);
		this.getMainView().animateActiveItem(3, {type: 'slide', direction: 'left'});
		this.getBtnAdd().hide();	
		var model = Ext.create("PeerSquare.model.Eventos", {});
        this.getAddEventoView().updateRecord(model);
        var dia = Ext.ComponentQuery.query('datepickerfield[name="data"]').pop().getValue().getDate();
        var mes = Ext.ComponentQuery.query('datepickerfield[name="data"]').pop().getValue().getUTCMonth()+1;
        var ano = Ext.ComponentQuery.query('datepickerfield[name="data"]').pop().getValue().getFullYear();    
	},
	
	onEnviarBtnTap: function(){
		var model = Ext.create("PeerSquare.model.Eventos", {});
        this.getAddEventoView().updateRecord(model);
		var dia = Ext.ComponentQuery.query('datepickerfield[name="data"]').pop().getValue().getDate();
        var mes = Ext.ComponentQuery.query('datepickerfield[name="data"]').pop().getValue().getUTCMonth()+1;
        var ano = Ext.ComponentQuery.query('datepickerfield[name="data"]').pop().getValue().getFullYear();
        model.set('id_praca', id_praca_atual);       
        var errors = model.validate();
        if (errors.isValid() === false){
			Ext.Msg.alert('Erro', "O formulário foi preenchido incorretamente.", Ext.emptyFn);
		}else{
			Ext.Viewport.setMasked({
				xtype: 'loadmask',
				indicator: true,
				message: 'Adicionando o evento...'
			});
			
			var evento_json = {
				"id_praca": model.get("id_praca"),
				"nome_evento": model.get("nome_evento"),
				"dia": dia,
				"mes": mes,
				"ano": ano,
				"hora": model.get("hora"),
				"name": model.get("nome_evento")
			};
			PeerSquare.utils.Functions.adicionarEventoApigee(evento_json);
			var store = Ext.getStore('RuntimeVariables');
			var qtdPracas = store.getAt(0).get('qtdPracas');
			PeerSquare.utils.Functions.limparCorDosEventos(qtdPracas);
			PeerSquare.utils.Functions.mostrarEventos("mes", new Date().getUTCMonth()+1);
			this.getMainView().animateActiveItem(0, {type: 'slide', direction: 'right'});
			
			Ext.Viewport.unmask(); 
		};
	},
	
	onEventosMesOuDiaBtnTap: function(button) {
		Ext.Viewport.setMasked({
				xtype: 'loadmask',
				indicator: true,
				message: 'Limpando os eventos das outras datas...'
		});
		
		var store = Ext.getStore('RuntimeVariables');
		var qtdPracas = store.getAt(0).get('qtdPracas');
		PeerSquare.utils.Functions.limparCorDosEventos(qtdPracas);
		
		Ext.Viewport.unmask(); 
		
		Ext.Viewport.setMasked({
				xtype: 'loadmask',
				indicator: true,
				message: 'Carregando os eventos...'
		});
		
		var parte_da_data = button.parte_da_data;
		var valor_data = '';
		
		if (parte_da_data == 'dia'){
			valor_data = new Date().getDate();
		} else {
			valor_data = new Date().getUTCMonth()+1;
		}
		
		PeerSquare.utils.Functions.mostrarEventos(parte_da_data, valor_data);
		
		Ext.Viewport.unmask(); 
		
		this.getBtnOpcoes().show();
		this.getBtnBack().hide();
		this.getMainView().animateActiveItem(0, {type: 'slide', direction: 'right'});		
		
		Ext.Msg.alert('PeerSquare Recife', "Mostrando eventos do " + parte_da_data + " " + valor_data, Ext.emptyFn);
	},	
	
	//Carregar e mostrar as coordenadas do mapa
	renderTheMap: function(component, googleMap, eOpts){ 
		Ext.Viewport.setMasked({
			xtype: 'loadmask',
			indicator: true,
			message: 'Carregando os marcadores das pra&ccedil;as ...'
		});	
			
		var mainview = this.getMainView();
		var btnOpcoes = this.getBtnOpcoes();
		var btnBack = this.getBtnBack();
		var btnAdd = this.getBtnAdd();
		
		Ext.Ajax.request({
				url: 'resources/json/parquespracas.geojson',
										   
				success: function(response) {
					var pracas = Ext.decode(response.responseText);
					var praca_markers = [];				
					
					for(var i in pracas){
						for (var j in pracas.features){                                                     
							var pracaCoordsGoogleMaps = [];
							var coordenadas_praca = pracas.features[j].geometry.coordinates[0];    
							for(var i = 0; i < coordenadas_praca.length; i++){                  
								pracaCoordsGoogleMaps.push(new google.maps.LatLng(coordenadas_praca[i][1], coordenadas_praca[i][0]));
							};
							var id = pracas.features[j].id;
							var nome = pracas.features[j].properties.NMNOME;                                                          
							var cor_poligono = '#374140';  
							//var cor_poligono = '#8E00CB';						
							praca = new google.maps.Polygon({
								paths: pracaCoordsGoogleMaps,
								strokeColor: cor_poligono,
								strokeOpacity: 0.4,
								strokeWeight: 2,
								fillColor: cor_poligono,
								fillOpacity: 0.2
							});
							mostrarId(praca, id, nome);                       
							praca_markers[id] = (praca);																
							praca.setMap(googleMap); 
						}; 
						                                                
					};  
					
					var store = Ext.getStore('RuntimeVariables');
					store.removeAll();
					store.sync();
					store.add({'qtdPracas': 498, 'praca_markers': praca_markers});								
					
					/* Neste ponto os marcadores ja estao no mapa, agora muda a cor dos que tem eventos */
						//Janeiro eh 0
						PeerSquare.utils.Functions.mostrarEventos("mes", new Date().getUTCMonth()+1);
					
					function mostrarId (praca, id, nome) {
						google.maps.event.addListener(praca, 'click', function() {						
						
							/* Como o usuario clicou no marcador da praca, dizer pro resto do app que tudo que acontecer vai ser com esta praca */
							id_praca_atual = id;
							nome_praca_atual = nome;
							
							Ext.getCmp("titulo_praca").setTitle("<div class='title_praca'>"+nome+"</div>");
							
							var storeEventos = Ext.getStore('Eventos');
							storeEventos.clearFilter();
							storeEventos.filter('id_praca', id);														
							
							if( storeEventos.getCount() != 0){						
								Ext.getCmp("lista_eventos").setStore(storeEventos);
							}else{								
								var storeSemEventos = Ext.create('Ext.data.Store', {	
									storeId: 'storesemeventos',
									fields: ['nome_evento'],
									data: [
										{nome_evento: 'Nenhum evento adicionado a essa pra&ccedil;a'}
										
									]	
								});
								Ext.getCmp("lista_eventos").setStore(storeSemEventos);		
							};
							
							mainview.animateActiveItem(2, {type: 'slide', direction: 'left'});	
							btnOpcoes.hide();
							btnBack.show();	
							btnAdd.show();					
					});
				};                          
			},
			failure: function() {
				Ext.Msg.alert('Erro', "Erro ao carregar as pra&ccedil;as.", Ext.emptyFn);			               
            }
      }); 
      Ext.Viewport.unmask();    
	},
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
		this.getMainView().setActiveItem(0);			
        PeerSquare.utils.Functions.loadData();        
    }
});
