Ext.define('PeerSquare.view.AddEventoView', {
	extend: 'Ext.form.Panel',
	xtype: 'addeventoview',
	requires: [
		'Ext.form.FieldSet',
		'Ext.field.DatePicker',
		'Ext.Map'
	],
	
	config: {
		items: [
			{
				xtype: 'fieldset',
                title: 'Adicionar evento',
                instructions: 'Preencha os campos acima.',
                items: [
						{						 
							name: 'nome_praca',
                            xtype: 'textfield',
                            label: 'Praça',                            
                            disabled: true                              
                         },                       
                         {
							name: 'nome_evento',
                            xtype: 'textfield',
                            label: 'Evento'                                                         
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
                                hideOnMaskTap: true
							 },
                             value: new Date()                          
                         },
                         {
                             name: 'hora',
                             xtype: 'timepickerfield',
                             label: 'Hora'
                         },
                         {
							 xtype: 'button',
							 text: 'Enviar',
							 ui: 'confirm',
							 action: 'enviar'
						 }
					]
				}
			]
		}
});
			
