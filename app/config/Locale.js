Ext.define('PeerSquare.config.Locale', {
 singleton: true,
 
 br: function() {
    // date localization borrowed from Ext JS 4 fr locale
 
   if (Ext.Date) {
    Ext.Date.shortMonthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
 
    Ext.Date.getShortMonthName = function(month) {
    return Ext.Date.shortMonthNames[month];
    };
 
    Ext.Date.monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
 
    Ext.Date.monthNumbers = {
     "Janeiro": 0,
     "Jan": 0,
     "Fevereiro": 1,
     "Fev": 1,
     "Março": 2,
     "Mar": 2,
     "Abril": 3,
     "Abr": 3,
     "Mai": 4,
     "Maio": 4,
     "Jun": 5,
     "Junh9o": 5,
     "Julho": 6,
     "Jul": 6,
     "Ago": 7,
     "Agosto": 7,
     "Setembro": 8, 
     "Set": 8,
     "Outuro": 9,
     "Out": 9,
     "Novembro": 10,
     "Nov": 10,
     "Dezembro": 11,
     "Dez": 11
    };
 
    Ext.Date.getMonthNumber = function(name) {
    return Ext.Date.monthNumbers[Ext.util.Format.capitalize(name)];
    };
 
   Ext.Date.dayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
 
   Ext.Date.getShortDayName = function(day) {
    return Ext.Date.dayNames[day].substring(0, 3);
   };
 
   Ext.Date.parseCodes.S.s = "(?:er)";
 
   Ext.override(Date, {
    getSuffix: function() {
     return (this.getDate() == 1) ? "er" : "";
    }
   });
 }
},
 
en: function() {
  // reset all dates to english here
},
 
 
localize: function(locale) {
  var translations = this.config[locale];
  for (var view in translations) {
    Ext.apply(PeerSquare.view[view].prototype, translations[view]);
  }
  this[locale]();
 }

});
