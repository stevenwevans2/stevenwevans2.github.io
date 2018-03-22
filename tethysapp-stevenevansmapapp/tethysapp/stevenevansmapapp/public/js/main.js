var app;
var startpt;
var endpt;


function calculate(){
    alert("Calculating the ultimate bike route path!")
    }

init_map_slope = function(){

        require([
      "esri/Map",
      "esri/views/MapView",
      "esri/widgets/Sketch/SketchViewModel",
      "esri/Graphic",
      "esri/layers/GraphicsLayer",
      "esri/tasks/Geoprocessor",
      "esri/tasks/support/FeatureSet",
      "esri/geometry/Point",
      "dojo/domReady!"
    ], function(Map, MapView, SketchViewModel, Graphic, GraphicsLayer, Geoprocessor, FeatureSet, Point) {
        var tempGraphicsLayer = new GraphicsLayer();

        var map = new Map({
        basemap: "gray",
        layers: [tempGraphicsLayer],
        });

        var view = new MapView({
        container: "mapslope",
        map: map,
        center: [-111.7,40.25],
        zoom: 13
        });

        var markerSymbol = {
          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
          color: [255, 0, 0],
          outline: { // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: .001
          }
        };

        var polylineSymbol = {
            type: "simple-line",
            color: "#8B2AE2",
            width: "4",
            style: "solid"
        }
        var gpUrl = "http://geoserver2.byu.edu/arcgis/rest/services/StorminMormons/LeastCost/GPServer/LeastCostPath";


        // create a new Geoprocessor
        var gp = new Geoprocessor(gpUrl);
        // define output spatial reference
        gp.outSpatialReference = { // autocasts as new SpatialReference()
              wkid: 26912 //EPSG3857
            };

        startpt = new FeatureSet();
        endpt = new FeatureSet();

        function createstartpt(startpt) {
            tempGraphicsLayer.removeAll();
            var point = new Point({
                longitude: event.mapPoint.longitude,
                latitude: event.mapPoint.latitude
            });

            var inputGraphic = new Graphic({
                geometry: point,
                symbol: markerSymbol
            });

            tempGraphicsLayer.add(inputGraphic);

            var inputGraphicContainer = [];
            inputGraphicContainer.push(inputGraphic);
            startpt.features = inputGraphicContainer;
        }

        function createendpt(endpt) {
            tempGraphicsLayer.removeAll();
            var point = new Point({
                longitude: event.mapPoint.longitude,
                latitude: event.mapPoint.latitude
            });

            var inputGraphic = new Graphic({
                geometry: point,
                symbol: markerSymbol
            });

            tempGraphicsLayer.add(inputGraphic);

            var inputGraphicContainer = [];
            inputGraphicContainer.push(inputGraphic);
            endpt.features = inputGraphicContainer;
        }

        function callservice(startpt,endpt){
          var params = {
            "Start": startpt,
            "End": endpt
          };

          console.log(startpt)
          console.log(endpt)

          gp.submitJob(params).then(completeCallback, errBack, statusCallback);

        function completeCallback(result){

            gp.getResultData(result.jobId, "output_line").then(drawResult, drawResultErrBack);

        }

        function drawResult(data){
            console.log(data);
            var polyline_feature = data.value.features[0];
                polyline_feature.symbol = polylineSymbol;
                tempGraphicsLayer.add(polyline_feature);

        }

        function drawResultErrBack(err) {
            console.log("I'm here");
            console.log(data.value.features[0]);
            console.log("draw result error: ", err);
        }

        function statusCallback(data) {
            console.log(data.jobStatus);
        }
        function errBack(err) {
            console.log("gp error: ", err);
        }
        };

        view.when(function() {
        // create a new sketch view model
        var startsketchViewModel = new SketchViewModel({
          view: view,
          layer: tempGraphicsLayer,
          pointSymbol: { // symbol used for points
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            style: "square",
            color: "#8A2BE2",
            size: "16px",
            outline: { // autocasts as new SimpleLineSymbol()
              color: [255, 255, 255],
              width: 3 // points
            }
          }
        });

        var endsketchViewModel = new SketchViewModel({
          view: view,
          layer: tempGraphicsLayer,
          pointSymbol: { // symbol used for points
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            style: "square",
            color: "#8A2BE2",
            size: "16px",
            outline: { // autocasts as new SimpleLineSymbol()
              color: [255, 255, 255],
              width: 3 // points
            }
          }
        });

        // ************************************************************
        // Get the completed graphic from the event and add it to view.
        // This event fires when user presses
        //  * "C" key to finish sketching point, polygon or polyline.
        //  * Double-clicks to finish sketching polyline or polygon.
        //  * Clicks to finish sketching a point geometry.
        // ***********************************************************
        startsketchViewModel.on("draw-complete", function(evt) {
          // if multipoint geometry is created, then change the symbol
          // for the graphic
          if (evt.geometry.type === "multipoint") {
            evt.graphic.symbol = {
              type: "simple-marker",
              style: "square",
              color: "green",
              size: "16px",
              outline: {
                color: [255, 255, 255],
                width: 3
              }
            };
          }
          // add the graphic to the graphics layer
          tempGraphicsLayer.add(evt.graphic);
          setActiveButton();

          var inputGraphicContainer = [];
          inputGraphicContainer.push(evt.graphic);
          startpt.features = inputGraphicContainer;
        });

        endsketchViewModel.on("draw-complete", function(evt) {
          // if multipoint geometry is created, then change the symbol
          // for the graphic
          if (evt.geometry.type === "multipoint") {
            evt.graphic.symbol = {
              type: "simple-marker",
              style: "square",
              color: "green",
              size: "16px",
              outline: {
                color: [255, 255, 255],
                width: 3
              }
            };
          }
          // add the graphic to the graphics layer
          tempGraphicsLayer.add(evt.graphic);
          setActiveButton();

          var inputGraphicContainer = [];
          inputGraphicContainer.push(evt.graphic);
          endpt.features = inputGraphicContainer;
        });

        var drawStartPointButton = document.getElementById("startpointButton");
        drawStartPointButton.onclick = function() {
          // set the sketch to create a point geometry
          startsketchViewModel.create("point");
          setActiveButton(this);
        };

        var drawEndPointButton = document.getElementById("endpointButton");
        drawEndPointButton.onclick = function() {
          // set the sketch to create a point geometry
          endsketchViewModel.create("point");
          setActiveButton(this);
        };

        var drawLineButton = document.getElementById("polylineButton");
        drawLineButton.onclick = function() {
          // set the sketch to create a polyline geometry
          sketchViewModel.create("polyline");
          setActiveButton(this);
        };

        document.getElementById("resetBtn").onclick = function() {
          tempGraphicsLayer.removeAll();
          startsketchViewModel.reset();
          endsketchViewModel.reset();
          setActiveButton();
        };

        function setActiveButton(selectedButton) {
          // focus the view to activate keyboard shortcuts for sketching
          view.focus();
          var elements = document.getElementsByClassName("active");
          for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove("active");
          }
          if (selectedButton) {
            selectedButton.classList.add("active");
          }
        }


      });
      app = {
        createstartpt: createstartpt,
        createendpt: createendpt,
        callservice: callservice
      };
    }

)};


$(function() {
    init_map_slope();
});
