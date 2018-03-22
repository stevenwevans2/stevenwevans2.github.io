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
        var gpUrl = "http://geoserver2.byu.edu/arcgis/rest/services/StorminMormons/SurfaceInfo2/GPServer/Add%20Surface%20Information";


        // create a new Geoprocessor
        var gp = new Geoprocessor(gpUrl);
        // define output spatial reference
        gp.outSpatialReference = { // autocasts as new SpatialReference()
              wkid: 26912 //EPSG3857
            };

        view.when(function() {
        // create a new sketch view model
        var sketchViewModel = new SketchViewModel({
          view: view,
          layer: tempGraphicsLayer,
          polylineSymbol: { // symbol used for polylines
            type: "simple-line", // autocasts as new SimpleMarkerSymbol()
            color: "#8A2BE2",
            width: "3",
            style: "solid"
          }
        });

        // ************************************************************
        // Get the completed graphic from the event and add it to view.
        // This event fires when user presses
        //  * "C" key to finish sketching point, polygon or polyline.
        //  * Double-clicks to finish sketching polyline or polygon.
        //  * Clicks to finish sketching a point geometry.
        // ***********************************************************
        sketchViewModel.on("draw-complete", function(evt) {
          tempGraphicsLayer.add(evt.graphic);
          setActiveButton();
          var inputGraphicContainer = [];
          inputGraphicContainer.push(evt.graphic);
          var featureSet = new FeatureSet();
          featureSet.features = inputGraphicContainer;
          // input parameters
          var params = {
            "Input_Feature_Class": featureSet,
          };

          gp.submitJob(params).then(completeCallback, errBack, statusCallback);

        });

        function completeCallback(result){

            gp.getResultData(result.jobId, "output_polyline").then(drawResult, drawResultErrBack);

        }

        function drawResult(data){
            console.log("test1");
            var polyline_feature = data.value.features[0];
                polyline_feature.symbol = polylineSymbol;
                tempGraphicsLayer.add(polyline_feature);

        }

        function drawResultErrBack(err) {
            console.log("draw result error: ", err);
        }

        function statusCallback(data) {
            console.log(data.jobStatus);
        }
        function errBack(err) {
            console.log("gp error: ", err);
        }

        var drawLineButton = document.getElementById("polylineButton");
        drawLineButton.onclick = function() {
          // set the sketch to create a polyline geometry
          sketchViewModel.create("polyline");
          setActiveButton(this);
        };


        document.getElementById("resetBtn").onclick = function() {
          tempGraphicsLayer.removeAll();
          sketchViewModel.reset();
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
    }

)};


$(function() {
    init_map_slope();
});
