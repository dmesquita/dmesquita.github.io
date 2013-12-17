// We've added a third and final item to our tab panel - scroll down to see it
Ext.application({
    name: 'Sencha',
    
    requires: ['Ext.Ajax',
                    'Ext.data.Store',
                    'Ext.TitleBar',
                    'Ext.Toolbar',
                    'Ext.Map',
                    'Ext.dataview.List',
                    'Ext.form.Panel',
                    'Ext.form.FieldSet',
                    'Ext.field.Text',
                    'Ext.field.Toggle',
                    'Ext.field.Select',
                    'Ext.field.DatePicker'                  
                    ],    

    launch: function() {

                                    Ext.define("App.view.TimePickerField", {

                            extend: "Ext.field.Text",
                            xtype: "timepickerfield",

                            constructor: function (config) {

                        // We're going to start by making string values of all of the times.

                                var i,
                                    data = [],
                                    stringVal,
                                    that = this,

                        // Let's set some default options.

                                    startTime = config.startTime,
                                    endTime = parseInt(config.endTime, 10) || 2200,
                                    increment = parseInt(config.increment, 10) || 15,
                                    value = String(config.value) || "12:00 PM",

                        // This function should generate a human-readable time string based on the
                        // integer that's passed in.

                                    timeToString = function (n) {
                                        var hours = Math.floor(n / 100),
                                            minutes = n % 100,
                                            meridian = "AM";

                                        if (hours === 24 || hours === 0) {
                                            hours = "12";
                                        } else if (hours >= 12) {
                                            meridian = "PM";

                                            if (hours > 12) {
                                                hours = hours - 12;
                                            }
                                        } else if (hours === 0) {
                                            hours = "12";
                                        }

                                        if (minutes < 10) {
                                            minutes = "0" + minutes;
                                        }

                                        return "" + hours + ":" + minutes + " " + meridian;
                                    },

                                    sixtyMinusIncrement = 60 - increment,
                                    minuteWrap = 100 - sixtyMinusIncrement;

                        // This check is being done here because of the possibility of startTime being
                        // set to 0.

                                if (startTime !== null && startTime !== undefined) {
                                    startTime = parseInt(startTime, 10);
                                } else {
                                    startTime = 600;
                                }

                                i = startTime;

                        // Very basic parameter checking.

                                if (endTime < startTime) {
                                    throw "The endTime cannot be less than startTime.";
                                }

                                if (endTime < 0) {
                                    throw "The endTime cannot be less than 0.";
                                }

                                if (startTime > 2400) {
                                    throw "The startTime cannot be greater than 2400.";
                                }

                        // Loop from startTime to endTime to generate the list of times.

                                while (i <= endTime) {
                                    stringVal = timeToString(i);

                                    data.push({
                                        text: stringVal,
                                        value: stringVal
                                    });

                                    if (i % 100 === sixtyMinusIncrement) {
                                        i = i + minuteWrap;
                                    } else {
                                        i = i + increment;
                                    }
                                }

                        // Make the time picker...

                                this.picker = Ext.create("Ext.Picker", {
                                    hidden: true,
                                    zIndex: 9999,

                                    slots: [{
                                        name: "time",
                                        title: "Select Time",
                                        data: data
                                    }],

                                    listeners: {
                                        change: function (picker, values) {
                                            if (values && values.time !== null && values.time !== undefined) {
                                                that.setValue(values.time);
                                            } else {
                                                that.setValue(value);
                                            }
                                        }
                                    }
                                });
                                /***************/

                                Ext.Viewport.add(this.picker);

                        // We want to release focus on the field so that the keyboard doesn't show up
                        // while we're picking a time.

                                this.on("focus", function (field, e) {
                                    that.picker.show();
                                    field.blur();
                                });

                                this.callParent(arguments);
                            }
                        });

            //Variavel global mas eh por uma boa causa (ganhar tempo)
            var id_praca_global;
            var nome_praca_global;

            Ext.define('Evento', {
                                    extend: 'Ext.data.Model',
                                    config: {
                                        fields: ['evento', 'hora', 'date']
                                    }
                                });
                                
                                var store = Ext.create('Ext.data.Store', {
                                   model: 'Evento',
                                   sorters: 'date',
                                
                                   grouper: {
                                       groupFn: function(record) {
                                           return record.get('data');
                                       }
                                   }
                                
                                   
                                });    
        
            /*****/
             var client = new Usergrid.Client({
                                orgName:'dehmesquita', // Your Usergrid organization name (or apigee.com username for App Services)
                                appName:'sandbox' // Your Usergrid app name
                            });
    
           /*****/
                                                                    var pracas_com_eventos = "";
                                                                   var pracas_array;
                                                                   var options = {
                                                                        type:'id_pracas_com_eventos',
                                                                        qs:{ql:'select *' }
                                                                    }
                                                                    var pracas;
                                                                    client.createCollection(options, function (err, pracas) {
                                                                        if (err) {
                                                                            //console.log("Couldn't get the list of books.");
                                                                        } else {                                                                           
                                                                            while( pracas.hasNextEntity()){
                                                                                pracas_array = pracas.getNextEntity();
                                                                                pracas_com_eventos = pracas_array.get('ids');
                                                                                //console.log(pracas_com_eventos);
                                                                            }                                                                                                                                  
                                                                        }
                                                                    }); 



        
        Ext.create("Ext.Container", {
                layout: 'card',
            fullscreen: true,           
                id: "cont",
            items: [
                    {
                        xtype: 'titlebar',
                        cls: 'title',
                        docked: 'top',
                            title: 'PeerSquare Recife',
                            items: [
                                {
                                   cls: 'back',
                                   hidden: true,
                                   ui: 'back',
                                   action: 'back',
                                   align: 'left',
                                   text: 'voltar',
                                    id: 'voltar',
                                    handler: function(){
                                        Ext.getCmp("cont").animateActiveItem(0, {type: 'slide', direction: 'right'});
                                        Ext.getCmp("voltar").hide();
                                        Ext.getCmp("add").hide();                                         
                                    }                     
                                },
                                {
                                   cls: 'back',
                                   hidden: true,
                                   ui: 'back',
                                   action: 'back',
                                   align: 'left',
                                   text: 'voltar',
                                   id: 'voltar_lista',
                                    handler: function(){
                                        Ext.getCmp("cont").animateActiveItem(1, {type: 'slide', direction: 'right'});
                                        Ext.getCmp("voltar").show(); 
                                        Ext.getCmp("add").show();   
                                        Ext.getCmp("voltar_lista").hide();
                                    }                     
                                },
                                {
                                    iconCls: 'info',
                                    action: 'settings',
                                    ui: 'plain',
                                    align: 'right',
                                    id: 'settings'
                                },
                                {
                                    iconCls: 'add',
                                    action: 'add', 
                                    iconMask: true,                               
                                    align: 'right',                                  
                                    hidden: true, 
                                    text: 'evento',                                                    
                                    id: 'add',
                                    handler: function(){
                                        Ext.getCmp("cont").animateActiveItem(2, {type: 'slide', direction: 'left'});
                                        Ext.getCmp("voltar").hide();
                                        Ext.getCmp("add").hide();
                                        Ext.getCmp("voltar_lista").show();
                                        Ext.getCmp("praca").setValue(nome_praca_global);
                                        //console.log("oi add");
                                    }
                                }
                        ]                   
                        
                        
                    },
                    
                    {
                        xtype: 'toolbar',                   
                        cls: 'footer',
                        ui: 'light',
                        docked: 'bottom',
                        html: '<span>Powered by &#169; PeerSquare Recife</span>'
                        
                    },
                {
                    title: 'Pracas',
                    xtype: 'map',
                    useCurrentLocation: false,
                    mapOptions:{ 
                        zoom: 13,
                        center: new google.maps.LatLng(-8.057445,-34.89139)                     
                    },
                    listeners:{
                        
                        maprender : function(component, googleMap, eOpts){                  

                            

            // Make a new "book" collection and read data
            var options = {
                type:'eventos',
                qs:{ql:'order by created DESC'}
            }

            var eventos;

            client.createCollection(options, function (err, eventos) {
                if (err) {
                    alert("Couldn't get the list of books.");
                } else {
                    //$('#booklist').empty();
                    while(eventos.hasNextEntity()) {
                        var evento = eventos.getNextEntity();
                        //console.log(evento.get('evento'));                        
                    }                   
                }
            });
                            
                            //now we create the Ajax request
                           Ext.Ajax.request({
                                    //first we give it the URL of the request. take not that this can only be local to the web server
                                    //you are on
                                    url: 'parquespracas.geojson',
                                        
                                    //then we define a success method, which is called once the ajax request is successful
                                    success: function(response) {
                                                //console.log("carregou");
                                                var pracas = Ext.decode(response.responseText);
                                                for(var i in pracas){
                                                    for (var j in pracas.features){                                                     
                                                                var pracaCoords = [];
                                                                //As coordenadas do  poligono de UMA praca
                                                                var array = pracas.features[j].geometry.coordinates[0];                 
                                                                for(var i = 0; i < array.length; i++){                  
                                                                    pracaCoords.push(new google.maps.LatLng(array[i][1], array[i][0]));
                                                                };
                                                                var id = pracas.features[j].id;
                                                                var nome = pracas.features[j].properties.NMNOME;                                                               
                                                                   /**
                                                                        Vendo se a praca tem eventos
                                                                   **/ 
                                                                   var cor_poligono = '#374140';                                                                   
                                                                    if (pracas_com_eventos.indexOf(" "+id+",") != -1){
                                                                        cor_poligono = '#8E00CB';
                                                                   }

                                                                praca = new google.maps.Polygon({
                                                                    paths: pracaCoords,
                                                                    strokeColor: cor_poligono,
                                                                    strokeOpacity: 0.8,
                                                                    strokeWeight: 2,
                                                                    fillColor: cor_poligono,
                                                                    fillOpacity: 0.35
                                                                });
                                                                mostrarId(praca, id, nome);                       
                                                                                                            
                                                                praca.setMap(googleMap);    
                                                    };                                                  
                                                };  
                                                function mostrarId (praca, id, nome) {
                                                    google.maps.event.addListener(praca, 'click', function() {
                                                       // alert(id);
                                                        var options = {
                                                            type:'eventos',
                                                            qs:{ql:'select * where id_praca = '+id}
                                                        }
                                                    id_praca_global = id;
                                                    nome_praca_global = nome;
                                                    var eventos; 
                                                    Ext.getCmp("titulo_praca").setTitle("<div class='title_praca'>"+nome_praca_global+"</div>");
                                                    //console.log(nome);
                                                    client.createCollection(options, function (err, eventos) {
                                                        if (err) {
                                                            //console.log("Couldn't get the list of books.");
                                                        } else {
                                                            var records = store.getRange();
                                                            store.remove(records);
                                                            if(! (eventos.hasNextEntity())){
                                                                //console.log("aiai");
                                                                store.add([{ evento: "Nenhum evento adicionado a essa praca",   hora: '',  date: ''   }]);
                                                            };
                                                            eventos.resetEntityPointer();
                                                            //console.log(id);
                                                            while(eventos.hasNextEntity()) {
                                                                var evento = eventos.getNextEntity();
                                                                //console.log("eita "+evento.get('evento'));
                                                                //console.log( Sencha.setActiveItem(1));                                                                
                                                                store.add([{ evento: evento.get('evento'),   hora: evento.get('hora'),  date: evento.get('data')   }]);
                                                            } 
                                                            /*
                                                                Lista eh 1
                                                                Formulario eh 2
                                                            */
                                                            Ext.getCmp("cont").animateActiveItem(1, {type: 'slide', direction: 'left'});
                                                            //Ext.getCmp("cont").setActiveItem(3);
                                                            Ext.getCmp("voltar").show();
                                                            Ext.getCmp("settings").hide();
                                                            Ext.getCmp("add").show();  

                                                        }
                                                    });
                                                    });
                                                };                          
                                    },
                                    failure: function() {
                                        //contentView.unmask();
                                        //console.log("deu merda");
                                    }
                                });   
                            
                    }
                        
                 }
                    
                    
             },
             { 
                xtype: 'list',
                id: 'lista',
                fullscreen: true,
                store: store,
                itemTpl: "<div class='evento'>{evento}</div> <div class='data'>{date}</div> <div class='hora'>{hora}</div>",
                items: [{
                        xtype: 'titlebar',
                        cls: 'title',
                        docked: 'top',
                        title: nome_praca_global,
                        id: 'titulo_praca'
                        }]                                  
            },{
                xtype: 'formpanel',
                
                    items:[{
                        xtype: 'fieldset',
                        title: 'Adicionar evento',
                        //instructions: '',
                        items: [    
                            {
                                name: 'praca',
                                xtype: 'textfield',
                                label: 'Praça',
                                id: 'praca',
                                disabled: true                              
                            },                       
                            {
                                name: 'evento',
                                xtype: 'textfield',
                                label: 'Evento',
                                id: 'evento'                               
                            },
                            {
                                name: 'data',
                                xtype: 'datepickerfield',
                                label: 'Data',
                                dateFormat: 'd, M, Y',
                                picker: {
                                    doneButton: 'Ok',
                                    slotOrder: ['day', 'month', 'year'],
                                    useClearIcon: true,
                                    hideOnMaskTap: true,
                                },
                                value: new Date() ,
                                id: 'data'                           
                            },
                            {
                                name: 'hora',
                                xtype: 'timepickerfield',
                                label: 'Hora',
                                id: 'hora'
                            },
                            {
                                xtype: 'button',
                                text: 'Enviar',
                                ui: 'confirm',
                                handler: function(){
                                    Ext.getCmp("cont").animateActiveItem(0, {type: 'slide', direction: 'right'});
                                    Ext.getCmp("voltar").hide();
                                    Ext.getCmp("voltar_lista").hide();
                                    Ext.getCmp("add").hide();
                                    //console.log("oi");
                                    var evento = {
                                        data: Ext.getCmp('data').getValue(),
                                        evento: Ext.getCmp('evento').getValue(),
                                        hora: Ext.getCmp('hora').getValue(),
                                        id_praca: id_praca_global
                                    };
                                    var eventos;
                                    var options = {
                                        type:'eventos'
                                    }

                                    client.createCollection(options, function (err, eventos) {
                                                        if (err) {
                                                            alert("Erro ao carregar lista de eventos.");                                                            
                                                        } else {                                                     
                                                        
                                                            eventos.addEntity(evento, function (error, response) {
                                                                        if (error) { 
                                                                            //console.log("Couldn't add the book.");
                                                                            alert("Erro ao adicionar evento.");
                                                                        } else { 
                                                                            //console.log("Evento adicionado"); 
                                                                            alert("Evento adicionado com sucesso!");
                                                                            pracas_array.set('ids', pracas_com_eventos+' '+id_praca_global+',');

                                                                            pracas_array.save(function(err){
                                                                                if (err){
                                                                                    //console.log("fu");
                                                                                    alert("Erro ao mudar a cor da praca");
                                                                                } else {
                                                                                    //console.log("id adicionada");
                                                                                }
                                                                            });
                                                                        } 
                                                            });
                                                        }                                            
                                                    });
                                    
                            
                                }
                            }
                        ]        
                    }]
                
            }
            ]
        });
    
        
        
        }
});
