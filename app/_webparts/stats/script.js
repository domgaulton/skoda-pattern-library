function initDBSDSpecs(e){
    
    // Spec selector toggle
    
    var toggleButtons = document.getElementsByClassName('humanise-stats__spec-details__toggle-button');
    var itemHeightsArray = [];
    var item;
    var apiUrl = 'https://tools.skoda.co.uk/';
    
    function setUpHeight() {
        itemHeightsArray = [];
        for (var i = 0; i < toggleButtons.length; i++) {
            var toggleContent =  toggleButtons[i].parentNode.querySelector('.humanise-stats__spec-details__toggle-content');
            itemHeightsArray[i] = toggleContent.querySelector('table').offsetHeight;
            toggleContent.setAttribute("data-item", i);
            if (toggleButtons[i].parentNode.classList.contains('open')) {
                toggleContent.style.maxHeight = itemHeightsArray[i]  + 'px';
            } else {
                toggleContent.style.maxHeight = '0px';
            }
        }
    }
    
    function setUpToggle() {
        for (var i = 0; i < toggleButtons.length; i++) {
            toggleButtons[i].addEventListener('click', function() {
                item = this;
                toggleCopy(item);       
            });
        }
    }
    
    setUpToggle();
    
    window.addEventListener('resize', setUpHeight);
    
    function toggleCopy(item) {
        var itemParent = item.parentNode;
        var index = itemParent.querySelector('.humanise-stats__spec-details__toggle-content').getAttribute("data-item");
        if (itemParent.classList.contains('open')) {
            itemParent.classList.remove('open');
            itemParent.querySelector('.humanise-stats__spec-details__toggle-content').style.maxHeight = '0px';
        } else {
            itemParent.classList.add('open');
            itemParent.querySelector('.humanise-stats__spec-details__toggle-content').style.maxHeight = itemHeightsArray[index] + 'px';
        }       
    };    

    // get data and display
    
    var toggleSection = document.getElementsByClassName('humanise-stats__spec-details');
    var dropdownValues = null;
    
    // Headless API Client

    function getJson(url, callbackOk, callbackOther) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                callbackOk(xhr.status, JSON.parse(xhr.response));
            } else {
                callbackOther(xhr.status, xhr.response);
            }
        };
        xhr.send();
    };

    function getData(model, equipment, engine, callback, callbackOther) {
        //TODO make URL configurable
        getJson(apiUrl + "api/equipment" + formatParams({ body: model, equipment: equipment, engine: engine }),
            callback, callbackOther);
    }


    function formatParams(params) {
        return "?" +
            Object
                .keys(params)
                .map(function (key) {
                return key + "=" + encodeURIComponent(params[key]);
            })
                .join("&");
    }


    // Map JSON to Page
    
    function apply(data, elements) {
        elements.find("[data-contentpath]").each(function () {
            $(this).text(data[$(this).attr("data-contentpath")]);
        });
    }

    // Keep Feature tables / dropdowns up to date

    function getDataAndApply() {
        for (var i = 0; i < toggleSection.length; i++) {
            toggleSection[i].classList.remove('loaded');
        }
        var elements = $(".humanise-stats");
        getData(36,
            getSelectedTrimId(),
            getSelectedEngineId(),
            function (status, response) { 
                apply(response, elements);  
                setTimeout(function(){
                    setUpHeight();
                    for (var i = 0; i < toggleSection.length; i++) {
                        toggleSection[i].classList.add('loaded');
                    }
                }, 400);
            },
            function () { console.log("getDataAndApply fail"); });
    }

    function getSelectedTrimId() {
        return $($("#trim-selector").find(":selected")[0]).val();
    }

    function getSelectedEngineId() {
        return $($("#engine-selector").find(":selected")[0]).val();
    }

    function updateAvailableEngineSelections(callback) {
        var engineDropdownJRef = $("#engine-selector");
        engineDropdownJRef.empty();
        var engineDropdown = $("#engine-selector")[0];

        var selectedOptionVal = getSelectedTrimId();
        var selectedTrim = dropdownValues.trims.find(function (value) { return value.id == selectedOptionVal; });
        
        var trimImage = document.getElementById('trim-image');
        trimImage.classList.remove('loaded');
        trimImage.src = apiUrl + selectedTrim.imagePath;
        trimImage.classList.add('loaded');

        var engines = selectedTrim.motors;

        if (engines && engines.length){
            for (var i = 0; i < engines.length; i++) {
                var item = engines[i];
                var newOption = document.createElement("option");
                newOption.setAttribute("value", item.id);
                var node = document.createTextNode(item.name);
                newOption.appendChild(node);
                engineDropdown.appendChild(newOption);               
            }            
        }
        callback();
    }

    function updateAvailableEngineSelectionsAndUpdateData() {
        updateAvailableEngineSelections(getDataAndApply);
    }
    
    function mapTrimDropdown(trimsEngines) {
        var trimDropdown = $("#trim-selector")[0];
        if (trimsEngines && trimsEngines.trims && trimsEngines.trims.length){
            for (var i = 0; i < trimsEngines.trims.length; i++) {
                var item = trimsEngines.trims[i];
                var newOption = document.createElement("option");
                newOption.setAttribute("value", item.id);
                var node = document.createTextNode(item.name);
                newOption.appendChild(node);
                trimDropdown.appendChild(newOption);                
            }            
        }
    }
    
    function loadDropDownValues(callback) {
        getJson(apiUrl + "api/ModelLineTrimsEngines/" + 36,
            function(status, response) {
                dropdownValues = response;
                callback();
            },
            function () {
                console.log("get drop down options failed");
            });
        }

    // drop downs behaviour init and initial feature tables values
    loadDropDownValues(function(){
        mapTrimDropdown(dropdownValues);
        updateAvailableEngineSelectionsAndUpdateData(); // updates main feature tables data
        $("#trim-selector").change(updateAvailableEngineSelectionsAndUpdateData);
        $("#engine-selector").change(getDataAndApply); // TODO: may clash with updating options
    });
    

}

$(document).ready(function(){
    if ($('.humanise-stats').length) {
        initDBSDSpecs();
    }
})