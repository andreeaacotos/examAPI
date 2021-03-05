require([
    "esri/map",
    "esri/layers/FeatureLayer",
    "esri/geometry/Extent",
    "esri/tasks/ServiceAreaTask",
    "esri/tasks/ServiceAreaParameters",
    "esri/tasks/query",
    
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/Color",
    
    "dojo/ready",
    "dojo/parser",
    "dojo/on",
    "dojo/_base/array",
    "dojo/dom",
    "dojo/domReady!"],
    function(
        Map, FeatureLayer, Extent, ServiceAreaTask, ServiceAreaParameters, Query, SimpleLineSymbol, SimpleFillSymbol, Color, ready, parser, on, array, dom, ) {
    
    ready(function () {
    
    var map = new Map("divMap", {
        basemap: "topo",        
        extent: new Extent({
            xmin: -415811.796930644,
            ymin: 4919170.17081106,
            xmax: -400757.003653631,
            ymax: 4930449.88246117,
            spatialReference: {wkid:102100}}),
        sliderStyle: "small"
      });
    
    var centros = new FeatureLayer("https://services6.arcgis.com/dg19uZyAi5CA76BH/arcgis/rest/services/CENTROS_SALUD/FeatureServer/0", {outFields : ["*"]});
    map.addLayers([centros]);
    
    map.on("load", selectParams);
    
    var serviceAreaTask = new ServiceAreaTask("https://services6.arcgis.com/kfrk0j3WFDuQZpoa/arcgis/rest/services/1CENTROS_SALUD/FeatureServer");
    
    function selectParams(){
                      
        var salud = new Query(); 
        
        salud.where = "NOMBRE = NOMBRE"
        
        centros.selectFeatures(salud, FeatureLayer.SELECTION_NEW);
    
        centros.on("selection-complete", mapPolygons)            
       };
    
    function mapPolygons(parametros){          
    
    var serviceAreaParameters = new ServiceAreaParameters();
    
    serviceAreaParameters.defaultBreaks= [1];
    
    serviceAreaParameters.outSpatialReference = map.spatialReference;
    
    serviceAreaParameters.returnFacilities = false;
    
    array.forEach(parametros.features, function(elementos){
        serviceAreaParameters.facilities = {};
        serviceAreaParameters.facilities.features = [];
        serviceAreaParameters.facilities.features.push(elementos)
        console.log("parameter",serviceAreaParameters)
    
    serviceAreaTask.solve(serviceAreaParameters, function(solveResult){
        console.log(solveResult);
    
        var polygonSymbol = new SimpleFillSymbol(
            SimpleFillSymbol.STYLE_SOLID,  
          new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0,187,45]), 2),
          new Color([0,187,45,0.25])
        );
    
         });
    
        });
    
    };
    
    });
        
    });